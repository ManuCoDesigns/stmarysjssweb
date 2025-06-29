const express = require('express');
const Teacher = require('../models/Teacher');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all teachers
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, department, subject } = req.query;
    
    let query = { isActive: true };
    
    if (department) query.department = department;
    if (subject) query.subjects = { $in: [subject] };
    
    const teachers = await Teacher.find(query)
      .populate('user', 'firstName lastName email phone profileImage')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Teacher.countDocuments(query);

    res.json({
      success: true,
      teachers,
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

// Get teacher by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('user', 'firstName lastName email phone profileImage address');
    
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new teacher
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const {
      // User data
      username, email, password, firstName, lastName, phone, address,
      // Teacher data
      employeeId, department, subjects, qualifications, experience, joiningDate,
      salary, classesAssigned, schedule, isClassTeacher, classTeacherOf
    } = req.body;

    // Create user first
    const user = new User({
      username,
      email,
      password,
      role: 'teacher',
      firstName,
      lastName,
      phone,
      address
    });

    await user.save();

    // Create teacher
    const teacher = new Teacher({
      user: user._id,
      employeeId,
      department,
      subjects,
      qualifications,
      experience,
      joiningDate,
      salary,
      classesAssigned,
      schedule,
      isClassTeacher,
      classTeacherOf
    });

    await teacher.save();

    const populatedTeacher = await Teacher.findById(teacher._id)
      .populate('user', 'firstName lastName email phone profileImage');

    res.status(201).json({
      success: true,
      message: 'Teacher created successfully',
      teacher: populatedTeacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update teacher
router.put('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email phone profileImage');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      message: 'Teacher updated successfully',
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Delete teacher
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      message: 'Teacher deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get teacher schedule
router.get('/:id/schedule', auth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      schedule: teacher.schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update teacher schedule
router.put('/:id/schedule', auth, authorize(['admin']), async (req, res) => {
  try {
    const { schedule } = req.body;
    
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { schedule },
      { new: true, runValidators: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      message: 'Schedule updated successfully',
      schedule: teacher.schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Add performance review
router.post('/:id/review', auth, authorize(['admin']), async (req, res) => {
  try {
    const { reviewer, comments, rating } = req.body;
    
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    teacher.performance.reviews.push({
      date: new Date(),
      reviewer,
      comments,
      rating
    });

    // Update overall rating (average of all reviews)
    const totalRating = teacher.performance.reviews.reduce((sum, review) => sum + review.rating, 0);
    teacher.performance.rating = totalRating / teacher.performance.reviews.length;

    await teacher.save();

    res.json({
      success: true,
      message: 'Review added successfully',
      teacher
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