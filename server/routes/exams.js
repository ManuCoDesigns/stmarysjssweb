const express = require('express');
const Exam = require('../models/Exam');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all exams
router.get('/', auth, async (req, res) => {
  try {
    const { academicYear, term, grade, type } = req.query;
    
    let query = {};
    
    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;
    if (grade) query.grades = { $in: [grade] };
    if (type) query.type = type;
    
    const exams = await Exam.find(query)
      .populate('subjects.subject', 'name code')
      .populate('subjects.invigilator', 'user employeeId')
      .populate('subjects.invigilator.user', 'firstName lastName')
      .populate('createdBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      exams
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get exam by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate('subjects.subject', 'name code')
      .populate('subjects.invigilator', 'user employeeId')
      .populate('subjects.invigilator.user', 'firstName lastName')
      .populate('results.student', 'user studentId')
      .populate('results.student.user', 'firstName lastName')
      .populate('createdBy', 'firstName lastName');
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    res.json({
      success: true,
      exam
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new exam
router.post('/', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const {
      name, type, academicYear, term, grades, subjects
    } = req.body;

    const exam = new Exam({
      name,
      type,
      academicYear,
      term,
      grades,
      subjects,
      createdBy: req.user.userId
    });

    await exam.save();

    const populatedExam = await Exam.findById(exam._id)
      .populate('subjects.subject', 'name code')
      .populate('createdBy', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      exam: populatedExam
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update exam
router.put('/:id', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('subjects.subject', 'name code')
     .populate('createdBy', 'firstName lastName');

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    res.json({
      success: true,
      message: 'Exam updated successfully',
      exam
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Add exam results
router.post('/:id/results', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const { results } = req.body;
    
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    // Process and calculate results
    const processedResults = results.map(result => {
      const totalMarks = result.marks.reduce((sum, mark) => sum + mark.marksObtained, 0);
      const maxTotalMarks = result.marks.reduce((sum, mark) => sum + mark.maxMarks, 0);
      const percentage = (totalMarks / maxTotalMarks) * 100;
      
      let grade = 'F';
      if (percentage >= 90) grade = 'A+';
      else if (percentage >= 80) grade = 'A';
      else if (percentage >= 70) grade = 'B+';
      else if (percentage >= 60) grade = 'B';
      else if (percentage >= 50) grade = 'C+';
      else if (percentage >= 40) grade = 'C';
      else if (percentage >= 33) grade = 'D';

      const status = percentage >= 33 ? 'pass' : 'fail';

      return {
        ...result,
        totalMarks,
        percentage: Math.round(percentage * 100) / 100,
        grade,
        status
      };
    });

    // Calculate ranks
    processedResults.sort((a, b) => b.percentage - a.percentage);
    processedResults.forEach((result, index) => {
      result.rank = index + 1;
    });

    exam.results = processedResults;
    await exam.save();

    res.json({
      success: true,
      message: 'Results added successfully',
      exam
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Publish exam results
router.patch('/:id/publish', auth, authorize(['admin']), async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { 
        isPublished: true,
        publishDate: new Date()
      },
      { new: true }
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    res.json({
      success: true,
      message: 'Exam results published successfully',
      exam
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get student results
router.get('/student/:studentId', auth, async (req, res) => {
  try {
    const { academicYear, term } = req.query;
    
    let query = { 
      'results.student': req.params.studentId,
      isPublished: true
    };
    
    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;
    
    const exams = await Exam.find(query)
      .populate('subjects.subject', 'name code')
      .select('name type academicYear term results');

    // Filter results to only include the specific student
    const studentResults = exams.map(exam => ({
      ...exam.toObject(),
      results: exam.results.filter(result => 
        result.student.toString() === req.params.studentId
      )
    }));

    res.json({
      success: true,
      results: studentResults
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