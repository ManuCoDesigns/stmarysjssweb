import express from 'express';
import Attendance from '../models/Attendance.js';
import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get attendance records
router.get('/', auth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      student,
      grade,
      section,
      date,
      dateFrom,
      dateTo,
      academicYear,
      status
    } = req.query;

    let query = {};

    if (student) query.student = student;
    if (grade) query['class.grade'] = grade;
    if (section) query['class.section'] = section;
    if (academicYear) query.academicYear = academicYear;
    if (status) query.overallStatus = status;

    if (date) {
      const targetDate = new Date(date);
      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);
      query.date = { $gte: targetDate, $lt: nextDay };
    } else if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = new Date(dateFrom);
      if (dateTo) query.date.$lte = new Date(dateTo);
    }

    if (req.user.role === 'student') {
      query.student = req.user.studentId;
    } else if (req.user.role === 'parent') {
      const { default: Parent } = await import('../models/Parent.js');
      const parent = await Parent.findOne({ user: req.user.userId });
      if (parent) {
        const childrenIds = parent.children.map(child => child.student);
        query.student = { $in: childrenIds };
      }
    }

    const attendance = await Attendance.find(query)
      .populate('student', 'user studentId')
      .populate('student.user', 'firstName lastName')
      .populate('periods.subject', 'name code')
      .populate('periods.teacher', 'user employeeId')
      .populate('periods.teacher.user', 'firstName lastName')
      .populate('periods.markedBy', 'firstName lastName')
      .populate('excuseNote.submittedBy', 'firstName lastName')
      .populate('excuseNote.reviewedBy', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: -1 });

    const total = await Attendance.countDocuments(query);

    res.json({
      success: true,
      attendance,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Continue from here...
// I can convert the rest (all the other routes) fully for you if you want.

// Get attendance by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate('student', 'user studentId')
      .populate('student.user', 'firstName lastName')
      .populate('periods.subject', 'name code')
      .populate('periods.teacher', 'user employeeId')
      .populate('periods.teacher.user', 'firstName lastName')
      .populate('periods.markedBy', 'firstName lastName')
      .populate('excuseNote.submittedBy', 'firstName lastName')
      .populate('excuseNote.reviewedBy', 'firstName lastName');

    if (!attendance) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }

    res.json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Create attendance record
router.post('/', auth, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { student, class: classInfo, date, periods } = req.body;

    if (!student || !classInfo || !date || !periods || periods.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const attendance = new Attendance({
      student,
      class: classInfo,
      date: new Date(date),
      periods,
      overallStatus: 'present'
    });

    await attendance.save();

    res.status(201).json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Update attendance record
router.put('/:id', auth, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { periods, overallStatus } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { periods, overallStatus },
      { new: true, runValidators: true }
    )
      .populate('student', 'user studentId')
      .populate('student.user', 'firstName lastName')
      .populate('periods.subject', 'name code')
      .populate('periods.teacher', 'user employeeId')
      .populate('periods.teacher.user', 'firstName lastName')
      .populate('periods.markedBy', 'firstName lastName')
      .populate('excuseNote.submittedBy', 'firstName lastName')
      .populate('excuseNote.reviewedBy', 'firstName lastName');

    if (!attendance) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }

    res.json({ success: true, attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Delete attendance record
router.delete('/:id', auth, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({ success: false, message: 'Attendance record not found' });
    }

    res.json({ success: true, message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Export the router
export default router;