const express = require('express');
const Message = require('../models/Message');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get messages for current user
router.get('/', auth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      type, 
      category, 
      priority,
      folder = 'inbox',
      search 
    } = req.query;
    
    let query = {};
    
    // Filter based on folder
    if (folder === 'inbox') {
      query['recipients.user'] = req.user.userId;
      query['recipients.isDeleted'] = { $ne: true };
    } else if (folder === 'sent') {
      query.sender = req.user.userId;
    } else if (folder === 'archived') {
      query['recipients.user'] = req.user.userId;
      query['recipients.isArchived'] = true;
    } else if (folder === 'trash') {
      query['recipients.user'] = req.user.userId;
      query['recipients.isDeleted'] = true;
    }
    
    if (type) query.type = type;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const messages = await Message.find(query)
      .populate('sender', 'firstName lastName profileImage role')
      .populate('recipients.user', 'firstName lastName profileImage role')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Message.countDocuments(query);

    res.json({
      success: true,
      messages,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get message by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('sender', 'firstName lastName profileImage role')
      .populate('recipients.user', 'firstName lastName profileImage role')
      .populate('parentMessage', 'subject sender')
      .populate('thread', 'subject sender createdAt');
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check if user has access to this message
    const hasAccess = message.sender.toString() === req.user.userId ||
                     message.recipients.some(r => r.user.toString() === req.user.userId);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Mark as read if user is recipient
    const recipient = message.recipients.find(r => r.user.toString() === req.user.userId);
    if (recipient && !recipient.isRead) {
      recipient.isRead = true;
      recipient.readAt = new Date();
      await message.save();
    }

    res.json({
      success: true,
      message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Send new message
router.post('/', auth, upload.array('attachments', 5), async (req, res) => {
  try {
    const {
      recipients, subject, content, type, priority, category,
      scheduledFor, parentMessage, metadata
    } = req.body;

    const recipientList = JSON.parse(recipients).map(userId => ({
      user: userId,
      isRead: false,
      isArchived: false,
      isDeleted: false
    }));

    const messageData = {
      sender: req.user.userId,
      recipients: recipientList,
      subject,
      content,
      type: type || 'personal',
      priority: priority || 'medium',
      category: category || 'general',
      metadata: metadata ? JSON.parse(metadata) : {}
    };

    // Handle scheduled messages
    if (scheduledFor) {
      messageData.scheduledFor = new Date(scheduledFor);
      messageData.isScheduled = true;
      messageData.isSent = false;
    }

    // Handle thread/reply
    if (parentMessage) {
      messageData.parentMessage = parentMessage;
      
      // Add to parent's thread
      const parent = await Message.findById(parentMessage);
      if (parent) {
        parent.thread.push(messageData._id);
        await parent.save();
      }
    }

    // Handle file attachments
    if (req.files && req.files.length > 0) {
      messageData.attachments = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      }));
    }

    const message = new Message(messageData);
    await message.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'firstName lastName profileImage')
      .populate('recipients.user', 'firstName lastName profileImage');

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: populatedMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Reply to message
router.post('/:id/reply', auth, upload.array('attachments', 5), async (req, res) => {
  try {
    const { content, priority } = req.body;
    
    const originalMessage = await Message.findById(req.params.id)
      .populate('sender', 'firstName lastName');
    
    if (!originalMessage) {
      return res.status(404).json({
        success: false,
        message: 'Original message not found'
      });
    }

    // Create reply
    const replyData = {
      sender: req.user.userId,
      recipients: [{ 
        user: originalMessage.sender._id,
        isRead: false,
        isArchived: false,
        isDeleted: false
      }],
      subject: `Re: ${originalMessage.subject}`,
      content,
      type: originalMessage.type,
      priority: priority || originalMessage.priority,
      category: originalMessage.category,
      parentMessage: originalMessage._id
    };

    // Handle file attachments
    if (req.files && req.files.length > 0) {
      replyData.attachments = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      }));
    }

    const reply = new Message(replyData);
    await reply.save();

    // Add to original message's thread
    originalMessage.thread.push(reply._id);
    await originalMessage.save();

    const populatedReply = await Message.findById(reply._id)
      .populate('sender', 'firstName lastName profileImage')
      .populate('recipients.user', 'firstName lastName profileImage');

    res.status(201).json({
      success: true,
      message: 'Reply sent successfully',
      data: populatedReply
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Mark message as read/unread
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const { isRead } = req.body;
    
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    const recipient = message.recipients.find(r => r.user.toString() === req.user.userId);
    
    if (!recipient) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    recipient.isRead = isRead;
    if (isRead) {
      recipient.readAt = new Date();
    } else {
      recipient.readAt = undefined;
    }

    await message.save();

    res.json({
      success: true,
      message: `Message marked as ${isRead ? 'read' : 'unread'}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Archive/Unarchive message
router.patch('/:id/archive', auth, async (req, res) => {
  try {
    const { isArchived } = req.body;
    
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    const recipient = message.recipients.find(r => r.user.toString() === req.user.userId);
    
    if (!recipient) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    recipient.isArchived = isArchived;
    await message.save();

    res.json({
      success: true,
      message: `Message ${isArchived ? 'archived' : 'unarchived'} successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Delete message
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // If user is sender, delete the entire message
    if (message.sender.toString() === req.user.userId) {
      await Message.findByIdAndDelete(req.params.id);
      return res.json({
        success: true,
        message: 'Message deleted successfully'
      });
    }

    // If user is recipient, mark as deleted for them
    const recipient = message.recipients.find(r => r.user.toString() === req.user.userId);
    
    if (!recipient) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    recipient.isDeleted = true;
    await message.save();

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get unread message count
router.get('/unread/count', auth, async (req, res) => {
  try {
    const count = await Message.countDocuments({
      'recipients.user': req.user.userId,
      'recipients.isRead': false,
      'recipients.isDeleted': { $ne: true }
    });

    res.json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Broadcast message to multiple users
router.post('/broadcast', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const {
      subject, content, targetAudience, specificGrades, specificSections,
      priority, category, scheduledFor
    } = req.body;

    // Get recipients based on target audience
    const User = require('../models/User');
    const Student = require('../models/Student');
    const Teacher = require('../models/Teacher');
    const Parent = require('../models/Parent');

    let recipients = [];

    if (targetAudience.includes('all')) {
      const allUsers = await User.find({ isActive: true }, '_id');
      recipients = allUsers.map(user => ({
        user: user._id,
        isRead: false,
        isArchived: false,
        isDeleted: false
      }));
    } else {
      if (targetAudience.includes('students')) {
        let studentQuery = { isActive: true };
        if (specificGrades && specificGrades.length > 0) {
          studentQuery.grade = { $in: specificGrades };
        }
        if (specificSections && specificSections.length > 0) {
          studentQuery.section = { $in: specificSections };
        }
        
        const students = await Student.find(studentQuery).populate('user');
        recipients.push(...students.map(student => ({
          user: student.user._id,
          isRead: false,
          isArchived: false,
          isDeleted: false
        })));
      }

      if (targetAudience.includes('teachers')) {
        const teachers = await Teacher.find({ isActive: true }).populate('user');
        recipients.push(...teachers.map(teacher => ({
          user: teacher.user._id,
          isRead: false,
          isArchived: false,
          isDeleted: false
        })));
      }

      if (targetAudience.includes('parents')) {
        const parents = await Parent.find({ isActive: true }).populate('user');
        recipients.push(...parents.map(parent => ({
          user: parent.user._id,
          isRead: false,
          isArchived: false,
          isDeleted: false
        })));
      }
    }

    const messageData = {
      sender: req.user.userId,
      recipients,
      subject,
      content,
      type: 'broadcast',
      priority: priority || 'medium',
      category: category || 'general'
    };

    if (scheduledFor) {
      messageData.scheduledFor = new Date(scheduledFor);
      messageData.isScheduled = true;
      messageData.isSent = false;
    }

    const message = new Message(messageData);
    await message.save();

    res.status(201).json({
      success: true,
      message: 'Broadcast message sent successfully',
      recipientCount: recipients.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;