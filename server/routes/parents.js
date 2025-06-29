const express = require('express');
const Parent = require('../models/Parent');
const User = require('../models/User');
const Student = require('../models/Student');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all parents
router.get('/', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const { page = 1, limit = 10, search, relationship } = req.query;
    
    let query = { isActive: true };
    
    if (relationship) query.relationship = relationship;
    
    const parents = await Parent.find(query)
      .populate('user', 'firstName lastName email phone profileImage')
      .populate('children.student', 'studentId user')
      .populate('children.student.user', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Parent.countDocuments(query);

    res.json({
      success: true,
      parents,
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

// Get parent by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id)
      .populate('user', 'firstName lastName email phone profileImage address')
      .populate('children.student', 'studentId user grade section')
      .populate('children.student.user', 'firstName lastName')
      .populate('meetings.teacher', 'user employeeId')
      .populate('meetings.teacher.user', 'firstName lastName')
      .populate('meetings.student', 'studentId user')
      .populate('meetings.student.user', 'firstName lastName')
      .populate('feedback.response.respondedBy', 'firstName lastName');
    
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    // Check if current user is the parent or has admin/teacher privileges
    if (req.user.role === 'parent' && parent.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      parent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new parent
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const {
      // User data
      username, email, password, firstName, lastName, phone, address,
      // Parent data
      parentId, relationship, occupation, workAddress, workPhone, emergencyContact,
      children, preferences
    } = req.body;

    // Create user first
    const user = new User({
      username,
      email,
      password,
      role: 'parent',
      firstName,
      lastName,
      phone,
      address
    });

    await user.save();

    // Create parent
    const parent = new Parent({
      user: user._id,
      parentId,
      relationship,
      occupation,
      workAddress,
      workPhone,
      emergencyContact,
      children,
      preferences
    });

    await parent.save();

    const populatedParent = await Parent.findById(parent._id)
      .populate('user', 'firstName lastName email phone profileImage')
      .populate('children.student', 'studentId user')
      .populate('children.student.user', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Parent created successfully',
      parent: populatedParent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update parent
router.put('/:id', auth, async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    // Check permissions
    if (req.user.role === 'parent' && parent.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const updatedParent = await Parent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email phone profileImage')
     .populate('children.student', 'studentId user')
     .populate('children.student.user', 'firstName lastName');

    res.json({
      success: true,
      message: 'Parent updated successfully',
      parent: updatedParent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Delete parent
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const parent = await Parent.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    res.json({
      success: true,
      message: 'Parent deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Add child to parent
router.post('/:id/children', auth, authorize(['admin']), async (req, res) => {
  try {
    const { studentId, relationship, isPrimaryContact } = req.body;
    
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check if child is already linked
    const existingChild = parent.children.find(
      child => child.student.toString() === studentId
    );

    if (existingChild) {
      return res.status(400).json({
        success: false,
        message: 'Student is already linked to this parent'
      });
    }

    parent.children.push({
      student: studentId,
      relationship,
      isPrimaryContact
    });

    await parent.save();

    const populatedParent = await Parent.findById(parent._id)
      .populate('children.student', 'studentId user')
      .populate('children.student.user', 'firstName lastName');

    res.json({
      success: true,
      message: 'Child added successfully',
      parent: populatedParent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Remove child from parent
router.delete('/:id/children/:studentId', auth, authorize(['admin']), async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    parent.children = parent.children.filter(
      child => child.student.toString() !== req.params.studentId
    );

    await parent.save();

    res.json({
      success: true,
      message: 'Child removed successfully',
      parent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Schedule meeting
router.post('/:id/meetings', auth, async (req, res) => {
  try {
    const { date, type, teacher, student, purpose } = req.body;
    
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    // Check permissions
    if (req.user.role === 'parent' && parent.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    parent.meetings.push({
      date,
      type,
      teacher,
      student,
      purpose,
      status: 'scheduled'
    });

    await parent.save();

    const populatedParent = await Parent.findById(parent._id)
      .populate('meetings.teacher', 'user employeeId')
      .populate('meetings.teacher.user', 'firstName lastName')
      .populate('meetings.student', 'studentId user')
      .populate('meetings.student.user', 'firstName lastName');

    res.json({
      success: true,
      message: 'Meeting scheduled successfully',
      meetings: populatedParent.meetings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update meeting status
router.patch('/:id/meetings/:meetingId', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    const meeting = parent.meetings.id(req.params.meetingId);
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: 'Meeting not found'
      });
    }

    meeting.status = status;
    if (notes) meeting.notes = notes;

    await parent.save();

    res.json({
      success: true,
      message: 'Meeting updated successfully',
      meeting
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Submit feedback
router.post('/:id/feedback', auth, async (req, res) => {
  try {
    const { category, subject, message, priority } = req.body;
    
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    // Check permissions
    if (req.user.role === 'parent' && parent.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    parent.feedback.push({
      category,
      subject,
      message,
      priority,
      status: 'submitted'
    });

    await parent.save();

    res.json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback: parent.feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Respond to feedback
router.patch('/:id/feedback/:feedbackId/respond', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const { message, status } = req.body;
    
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    const feedback = parent.feedback.id(req.params.feedbackId);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    feedback.response = {
      message,
      respondedBy: req.user.userId,
      respondedAt: new Date()
    };

    if (status) feedback.status = status;

    await parent.save();

    const populatedParent = await Parent.findById(parent._id)
      .populate('feedback.response.respondedBy', 'firstName lastName');

    res.json({
      success: true,
      message: 'Response added successfully',
      feedback: populatedParent.feedback.id(req.params.feedbackId)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get children's information for parent
router.get('/:id/children-info', auth, async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id)
      .populate({
        path: 'children.student',
        populate: [
          { path: 'user', select: 'firstName lastName email' },
          { path: 'attendance' }
        ]
      });
    
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    // Check permissions
    if (req.user.role === 'parent' && parent.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const childrenInfo = parent.children.map(child => ({
      student: child.student,
      relationship: child.relationship,
      isPrimaryContact: child.isPrimaryContact
    }));

    res.json({
      success: true,
      children: childrenInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update notification preferences
router.patch('/:id/preferences', auth, async (req, res) => {
  try {
    const { preferences } = req.body;
    
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    // Check permissions
    if (req.user.role === 'parent' && parent.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    parent.preferences = { ...parent.preferences, ...preferences };
    await parent.save();

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      preferences: parent.preferences
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