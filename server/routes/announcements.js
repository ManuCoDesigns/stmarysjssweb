// server/routes/announcementRoutes.js
import express from 'express';
import Announcement from '../models/Announcement.js';
import { authenticate as auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all announcements
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, priority, targetAudience } = req.query;

    let query = { isPublished: true };

    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (targetAudience) query.targetAudience = { $in: [targetAudience] };

    query.$or = [
      { expiryDate: { $exists: false } },
      { expiryDate: { $gte: new Date() } }
    ];

    const announcements = await Announcement.find(query)
      .populate('author', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ isPinned: -1, publishDate: -1 });

    const total = await Announcement.countDocuments(query);

    res.json({
      success: true,
      announcements,
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

// Get announcement by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('author', 'firstName lastName profileImage');

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    announcement.views += 1;

    const alreadyRead = announcement.readBy.some(
      read => read.user.toString() === req.user.userId
    );

    if (!alreadyRead) {
      announcement.readBy.push({
        user: req.user.userId,
        readAt: new Date()
      });
    }

    await announcement.save();

    res.json({
      success: true,
      announcement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new announcement
router.post('/', auth, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const {
      title, content, category, priority, targetAudience, specificGrades,
      publishDate, expiryDate, isPinned
    } = req.body;

    const announcement = new Announcement({
      title,
      content,
      author: req.user.userId,
      category,
      priority,
      targetAudience,
      specificGrades,
      publishDate,
      expiryDate,
      isPinned
    });

    await announcement.save();

    const populatedAnnouncement = await Announcement.findById(announcement._id)
      .populate('author', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      announcement: populatedAnnouncement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update announcement
router.put('/:id', auth, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    if (announcement.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this announcement'
      });
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName');

    res.json({
      success: true,
      message: 'Announcement updated successfully',
      announcement: updatedAnnouncement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Delete announcement
router.delete('/:id', auth, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    if (announcement.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this announcement'
      });
    }

    await Announcement.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Pin/Unpin announcement
router.patch('/:id/pin', auth, authorize('admin'), async (req, res) => {
  try {
    const { isPinned } = req.body;

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { isPinned },
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      message: `Announcement ${isPinned ? 'pinned' : 'unpinned'} successfully`,
      announcement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

export default router;
