// server/routes/adminRoutes.js
import express from 'express';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import { authenticate as auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all admins
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, department, accessLevel } = req.query;

    let query = { isActive: true };

    if (department) query.department = department;
    if (accessLevel) query.accessLevel = accessLevel;

    const admins = await Admin.find(query)
      .populate('user', 'firstName lastName email phone profileImage')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Admin.countDocuments(query);

    res.json({
      success: true,
      admins,
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

// Get admin by ID
router.get('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
      .populate('user', 'firstName lastName email phone profileImage address');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new admin
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const {
      username, email, password, firstName, lastName, phone, address,
      adminId, department, position, permissions, accessLevel, joiningDate, isSuperAdmin
    } = req.body;

    const currentAdmin = await Admin.findOne({ user: req.user.userId });
    if (isSuperAdmin && !currentAdmin?.isSuperAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only super admins can create super admin accounts'
      });
    }

    const user = new User({
      username,
      email,
      password,
      role: 'admin',
      firstName,
      lastName,
      phone,
      address
    });

    await user.save();

    const admin = new Admin({
      user: user._id,
      adminId,
      department,
      position,
      permissions,
      accessLevel,
      joiningDate,
      isSuperAdmin: isSuperAdmin || false
    });

    await admin.save();

    const populatedAdmin = await Admin.findById(admin._id)
      .populate('user', 'firstName lastName email phone profileImage');

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: populatedAdmin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update admin
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email phone profileImage');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: 'Admin updated successfully',
      admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Delete admin
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update permissions
router.patch('/:id/permissions', auth, authorize('admin'), async (req, res) => {
  try {
    const { permissions } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      message: 'Permissions updated successfully',
      permissions: admin.permissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Log admin activity
router.post('/:id/activity', auth, authorize('admin'), async (req, res) => {
  try {
    const { action, resource, resourceId, details } = req.body;

    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    admin.activityLog.push({
      action,
      resource,
      resourceId,
      details
    });

    if (admin.activityLog.length > 1000) {
      admin.activityLog = admin.activityLog.slice(-1000);
    }

    await admin.save();

    res.json({
      success: true,
      message: 'Activity logged successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get admin activity log
router.get('/:id/activity', auth, authorize('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;

    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    const activities = admin.activityLog
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice((page - 1) * limit, page * limit);

    res.json({
      success: true,
      activities,
      total: admin.activityLog.length,
      totalPages: Math.ceil(admin.activityLog.length / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get dashboard statistics
router.get('/dashboard/stats', auth, authorize('admin'), async (req, res) => {
  try {
    const { default: User } = await import('../models/User.js');
    const { default: Student } = await import('../models/Student.js');
    const { default: Teacher } = await import('../models/Teacher.js');
    const { default: Parent } = await import('../models/Parent.js');
    const { default: Class } = await import('../models/Class.js');
    const { default: Subject } = await import('../models/Subject.js');
    const { default: Announcement } = await import('../models/Announcement.js');
    const { default: Event } = await import('../models/Event.js');

    const stats = {
      users: {
        total: await User.countDocuments({ isActive: true }),
        students: await Student.countDocuments({ isActive: true }),
        teachers: await Teacher.countDocuments({ isActive: true }),
        parents: await Parent.countDocuments({ isActive: true }),
        admins: await Admin.countDocuments({ isActive: true })
      },
      academic: {
        classes: await Class.countDocuments({ isActive: true }),
        subjects: await Subject.countDocuments({ isActive: true })
      },
      content: {
        announcements: await Announcement.countDocuments({ isPublished: true }),
        events: await Event.countDocuments({ status: { $ne: 'cancelled' } })
      },
      recent: {
        newStudents: await Student.countDocuments({
          isActive: true,
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }),
        newTeachers: await Teacher.countDocuments({
          isActive: true,
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        })
      }
    };

    res.json({
      success: true,
      stats
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