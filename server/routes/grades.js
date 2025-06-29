const express = require('express');
const Grade = require('../models/Grade');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get grades
router.get('/', auth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      student, 
      subject, 
      teacher,
      academicYear,
      term,
      grade,
      section,
      assessmentType,
      isPublished
    } = req.query;
    
    let query = {};
    
    if (student) query.student = student;
    if (subject) query.subject = subject;
    if (teacher) query.teacher = teacher;
    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;
    if (grade) query['class.grade'] = grade;
    if (section) query['class.section'] = section;
    if (assessmentType) query.assessmentType = assessmentType;
    if (isPublished !== undefined) query.isPublished = isPublished === 'true';

    // Filter based on user role
    if (req.user.role === 'teacher') {
      query.teacher = req.user.teacherId;
    } else if (req.user.role === 'student') {
      query.student = req.user.studentId;
      query.isPublished = true; // Students can only see published grades
    } else if (req.user.role === 'parent') {
      // Parents can only see their children's grades
      const Parent = require('../models/Parent');
      const parent = await Parent.findOne({ user: req.user.userId });
      if (parent) {
        const childrenIds = parent.children.map(child => child.student);
        query.student = { $in: childrenIds };
        query.isPublished = true;
      }
    }
    
    const grades = await Grade.find(query)
      .populate('student', 'user studentId')
      .populate('student.user', 'firstName lastName')
      .populate('subject', 'name code')
      .populate('teacher', 'user employeeId')
      .populate('teacher.user', 'firstName lastName')
      .populate('publishedBy', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ assessmentDate: -1 });

    const total = await Grade.countDocuments(query);

    res.json({
      success: true,
      grades,
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

// Get grade by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id)
      .populate('student', 'user studentId')
      .populate('student.user', 'firstName lastName')
      .populate('subject', 'name code')
      .populate('teacher', 'user employeeId')
      .populate('teacher.user', 'firstName lastName')
      .populate('publishedBy', 'firstName lastName')
      .populate('modificationHistory.modifiedBy', 'firstName lastName');
    
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    // Check permissions
    if (req.user.role === 'student' && grade.student.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (req.user.role === 'parent') {
      const Parent = require('../models/Parent');
      const parent = await Parent.findOne({ user: req.user.userId });
      const hasAccess = parent && parent.children.some(
        child => child.student.toString() === grade.student._id.toString()
      );
      
      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    res.json({
      success: true,
      grade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new grade
router.post('/', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const {
      student, subject, class: classInfo, academicYear, term, assessmentType,
      assessmentName, assessmentDate, marksObtained, maxMarks, weightage,
      feedback, remarks, skills, behavioralAssessment
    } = req.body;

    const grade = new Grade({
      student,
      subject,
      teacher: req.user.teacherId,
      class: classInfo,
      academicYear,
      term,
      assessmentType,
      assessmentName,
      assessmentDate: new Date(assessmentDate),
      marksObtained: parseInt(marksObtained),
      maxMarks: parseInt(maxMarks),
      weightage: parseFloat(weightage || 1),
      feedback,
      remarks,
      skills: skills ? JSON.parse(skills) : [],
      behavioralAssessment: behavioralAssessment ? JSON.parse(behavioralAssessment) : {}
    });

    await grade.save();

    const populatedGrade = await Grade.findById(grade._id)
      .populate('student', 'user studentId')
      .populate('student.user', 'firstName lastName')
      .populate('subject', 'name code')
      .populate('teacher', 'user employeeId')
      .populate('teacher.user', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Grade created successfully',
      grade: populatedGrade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update grade
router.put('/:id', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const existingGrade = await Grade.findById(req.params.id);
    
    if (!existingGrade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    // Check if user is the teacher who created the grade or admin
    if (existingGrade.teacher.toString() !== req.user.teacherId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this grade'
      });
    }

    // Track modifications
    const modifications = [];
    const updateData = { ...req.body };

    // Compare changes and log them
    Object.keys(updateData).forEach(key => {
      if (existingGrade[key] !== updateData[key]) {
        modifications.push({
          field: key,
          oldValue: existingGrade[key],
          newValue: updateData[key]
        });
      }
    });

    if (modifications.length > 0) {
      updateData.$push = {
        modificationHistory: {
          modifiedBy: req.user.userId,
          changes: modifications,
          reason: req.body.modificationReason || 'Grade updated'
        }
      };
    }

    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('student', 'user studentId')
     .populate('student.user', 'firstName lastName')
     .populate('subject', 'name code')
     .populate('teacher', 'user employeeId')
     .populate('teacher.user', 'firstName lastName');

    res.json({
      success: true,
      message: 'Grade updated successfully',
      grade: updatedGrade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Delete grade
router.delete('/:id', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    // Check if user is the teacher who created the grade or admin
    if (grade.teacher.toString() !== req.user.teacherId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this grade'
      });
    }

    await Grade.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Grade deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Publish grades
router.patch('/publish', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const { gradeIds } = req.body;
    
    const result = await Grade.updateMany(
      { 
        _id: { $in: gradeIds },
        teacher: req.user.teacherId // Ensure teacher can only publish their own grades
      },
      {
        isPublished: true,
        publishedAt: new Date(),
        publishedBy: req.user.userId
      }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} grades published successfully`,
      publishedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get student grade summary
router.get('/student/:studentId/summary', auth, async (req, res) => {
  try {
    const { academicYear, term } = req.query;
    
    // Check permissions
    if (req.user.role === 'student' && req.user.studentId !== req.params.studentId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (req.user.role === 'parent') {
      const Parent = require('../models/Parent');
      const parent = await Parent.findOne({ user: req.user.userId });
      const hasAccess = parent && parent.children.some(
        child => child.student.toString() === req.params.studentId
      );
      
      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    let query = {
      student: req.params.studentId,
      isPublished: true
    };

    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;

    const grades = await Grade.find(query)
      .populate('subject', 'name code')
      .populate('teacher', 'user employeeId')
      .populate('teacher.user', 'firstName lastName')
      .sort({ assessmentDate: -1 });

    // Group grades by subject
    const subjectGrades = {};
    let totalMarks = 0;
    let totalMaxMarks = 0;
    let totalWeightedMarks = 0;
    let totalWeightage = 0;

    grades.forEach(grade => {
      const subjectId = grade.subject._id.toString();
      
      if (!subjectGrades[subjectId]) {
        subjectGrades[subjectId] = {
          subject: grade.subject,
          grades: [],
          totalMarks: 0,
          totalMaxMarks: 0,
          weightedAverage: 0,
          letterGrade: 'F'
        };
      }

      subjectGrades[subjectId].grades.push(grade);
      subjectGrades[subjectId].totalMarks += grade.marksObtained * grade.weightage;
      subjectGrades[subjectId].totalMaxMarks += grade.maxMarks * grade.weightage;

      totalMarks += grade.marksObtained;
      totalMaxMarks += grade.maxMarks;
      totalWeightedMarks += grade.marksObtained * grade.weightage;
      totalWeightage += grade.weightage;
    });

    // Calculate subject averages
    Object.keys(subjectGrades).forEach(subjectId => {
      const subject = subjectGrades[subjectId];
      subject.weightedAverage = subject.totalMaxMarks > 0 ? 
        Math.round((subject.totalMarks / subject.totalMaxMarks) * 100 * 100) / 100 : 0;
      
      // Calculate letter grade
      if (subject.weightedAverage >= 90) subject.letterGrade = 'A+';
      else if (subject.weightedAverage >= 80) subject.letterGrade = 'A';
      else if (subject.weightedAverage >= 70) subject.letterGrade = 'B+';
      else if (subject.weightedAverage >= 60) subject.letterGrade = 'B';
      else if (subject.weightedAverage >= 50) subject.letterGrade = 'C+';
      else if (subject.weightedAverage >= 40) subject.letterGrade = 'C';
      else if (subject.weightedAverage >= 35) subject.letterGrade = 'D+';
      else if (subject.weightedAverage >= 33) subject.letterGrade = 'D';
    });

    const overallAverage = totalMaxMarks > 0 ? 
      Math.round((totalMarks / totalMaxMarks) * 100 * 100) / 100 : 0;
    
    const weightedAverage = totalWeightage > 0 ? 
      Math.round((totalWeightedMarks / totalWeightage) * 100) / 100 : 0;

    let overallGrade = 'F';
    if (overallAverage >= 90) overallGrade = 'A+';
    else if (overallAverage >= 80) overallGrade = 'A';
    else if (overallAverage >= 70) overallGrade = 'B+';
    else if (overallAverage >= 60) overallGrade = 'B';
    else if (overallAverage >= 50) overallGrade = 'C+';
    else if (overallAverage >= 40) overallGrade = 'C';
    else if (overallAverage >= 35) overallGrade = 'D+';
    else if (overallAverage >= 33) overallGrade = 'D';

    const summary = {
      student: req.params.studentId,
      academicYear,
      term,
      subjectGrades: Object.values(subjectGrades),
      overallStats: {
        totalAssessments: grades.length,
        overallAverage,
        weightedAverage,
        overallGrade,
        totalMarks,
        totalMaxMarks
      }
    };

    res.json({
      success: true,
      summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Mark grade as viewed by parent
router.patch('/:id/parent-viewed', auth, authorize(['parent']), async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    // Check if parent has access to this grade
    const Parent = require('../models/Parent');
    const parent = await Parent.findOne({ user: req.user.userId });
    const hasAccess = parent && parent.children.some(
      child => child.student.toString() === grade.student.toString()
    );
    
    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    grade.parentViewed = true;
    grade.parentViewedAt = new Date();
    await grade.save();

    res.json({
      success: true,
      message: 'Grade marked as viewed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get grade statistics for teacher
router.get('/teacher/:teacherId/stats', auth, authorize(['admin', 'teacher']), async (req, res) => {
  try {
    const { academicYear, term, subject } = req.query;
    
    let query = {
      teacher: req.params.teacherId,
      isPublished: true
    };

    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;
    if (subject) query.subject = subject;

    const grades = await Grade.find(query);

    const stats = {
      totalGrades: grades.length,
      averageMarks: 0,
      gradeDistribution: {
        'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C+': 0, 'C': 0, 'D+': 0, 'D': 0, 'F': 0
      },
      assessmentTypeStats: {}
    };

    if (grades.length > 0) {
      const totalPercentage = grades.reduce((sum, grade) => sum + grade.percentage, 0);
      stats.averageMarks = Math.round((totalPercentage / grades.length) * 100) / 100;

      // Grade distribution
      grades.forEach(grade => {
        stats.gradeDistribution[grade.letterGrade]++;
        
        if (!stats.assessmentTypeStats[grade.assessmentType]) {
          stats.assessmentTypeStats[grade.assessmentType] = {
            count: 0,
            averageMarks: 0,
            totalPercentage: 0
          };
        }
        
        stats.assessmentTypeStats[grade.assessmentType].count++;
        stats.assessmentTypeStats[grade.assessmentType].totalPercentage += grade.percentage;
      });

      // Calculate averages for assessment types
      Object.keys(stats.assessmentTypeStats).forEach(type => {
        const typeStats = stats.assessmentTypeStats[type];
        typeStats.averageMarks = Math.round((typeStats.totalPercentage / typeStats.count) * 100) / 100;
        delete typeStats.totalPercentage;
      });
    }

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

module.exports = router;