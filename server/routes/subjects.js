const express = require('express');
const Subject = require('../models/Subject');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all subjects
router.get('/', auth, async (req, res) => {
  try {
    const { department, grade, type } = req.query;
    
    let query = { isActive: true };
    
    if (department) query.department = department;
    if (grade) query.grades = { $in: [grade] };
    if (type) query.type = type;
    
    const subjects = await Subject.find(query).sort({ name: 1 });

    res.json({
      success: true,
      subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get subject by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new subject
router.post('/', auth, authorize(['admin']), async (req, res) => {
  try {
    const {
      name, code, description, department, grades, type, credits,
      syllabus, books, assessmentPattern
    } = req.body;

    const subject = new Subject({
      name,
      code,
      description,
      department,
      grades,
      type,
      credits,
      syllabus,
      books,
      assessmentPattern
    });

    await subject.save();

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update subject
router.put('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject updated successfully',
      subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Delete subject
router.delete('/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject deleted successfully'
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