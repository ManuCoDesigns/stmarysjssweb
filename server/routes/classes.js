const express = require('express');
const Class = require('../models/Class');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all classes
router.get('/', auth, async (req, res) => {
  try {
    const { academicYear, grade } = req.query;
    
    let query = { isActive: true };
    
    if (academicYear) query.academicYear = academicYear;
    if (grade) query.grade = grade;
    
    const classes = await Class.find(query)
      .populate('classTeacher', 'user employeeId')
      .populate('classTeacher.user', 'firstName lastName')
      .populate('subjects.teacher', 'user employeeId')
      .populate('subjects.teacher.user', 'firstName lastName')
      .sort({ grade: 1, section: 1 });

    res.json({
      success: true,
      classes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get class by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate('classTeacher', 'user employeeId department')
      .populate('classTeacher.user', 'firstName lastName email phone')
      .populate('subjects.teacher', 'user employeeId')
      .populate('subjects.teacher.user', 'firstName lastName')
      .populate('students', 'user studentId rollNumber')
      .populate('students.user', 'firstName lastName');
    
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.json({
      success: true,
      class: classData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new class
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const {
      grade, section, academicYear, classTeacher, subjects, maxStrength, classroom
    } = req.body;

    const classData = new Class({
      grade,
      section,
      academicYear,
      classTeacher,
      subjects,
      maxStrength,
      classroom
    });

    await classData.save();

    const populatedClass = await Class.findById(classData._id)
      .populate('classTeacher', 'user employeeId')
      .populate('classTeacher.user', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      class: populatedClass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update class
router.put('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('classTeacher', 'user employeeId')
     .populate('classTeacher.user', 'firstName lastName');

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.json({
      success: true,
      message: 'Class updated successfully',
      class: classData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Add student to class
router.post('/:id/students', auth, authorize(['admin']), async (req, res) => {
  try {
    const { studentId } = req.body;
    
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Check if class is full
    if (classData.currentStrength >= classData.maxStrength) {
      return res.status(400).json({
        success: false,
        message: 'Class is full'
      });
    }

    // Check if student is already in class
    if (classData.students.includes(studentId)) {
      return res.status(400).json({
        success: false,
        message: 'Student is already in this class'
      });
    }

    classData.students.push(studentId);
    classData.currentStrength = classData.students.length;
    await classData.save();

    res.json({
      success: true,
      message: 'Student added to class successfully',
      class: classData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Remove student from class
router.delete('/:id/students/:studentId', auth, authorize(['admin']), async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    classData.students = classData.students.filter(
      student => student.toString() !== req.params.studentId
    );
    classData.currentStrength = classData.students.length;
    await classData.save();

    res.json({
      success: true,
      message: 'Student removed from class successfully',
      class: classData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get class timetable
router.get('/:id/timetable', auth, async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate('timetable.periods.teacher', 'user employeeId')
      .populate('timetable.periods.teacher.user', 'firstName lastName');
    
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.json({
      success: true,
      timetable: classData.timetable
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update class timetable
router.put('/:id/timetable', auth, authorize(['admin']), async (req, res) => {
  try {
    const { timetable } = req.body;
    
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      { timetable },
      { new: true, runValidators: true }
    );

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    res.json({
      success: true,
      message: 'Timetable updated successfully',
      timetable: classData.timetable
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