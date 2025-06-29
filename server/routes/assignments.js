import express from 'express';
import Assignment from '../models/Assignment.js';
import { authenticate, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get assignments
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, subject, teacher, grade, section, type, status, dueDate, search } = req.query;

    let query = { isActive: true };

    if (subject) query.subject = subject;
    if (teacher) query.teacher = teacher;
    if (type) query.type = type;
    if (status) query.status = status;

    if (grade || section) {
      query.$or = [];
      if (grade && section) {
        query.$or.push({ 'classes': { $elemMatch: { grade, section } } });
      } else if (grade) {
        query.$or.push({ 'classes.grade': grade });
      } else if (section) {
        query.$or.push({ 'classes.section': section });
      }
    }

    if (dueDate) {
      const date = new Date(dueDate);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      query.dueDate = { $gte: date, $lt: nextDay };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (req.user.role === 'teacher') {
      query.teacher = req.user.teacherId;
    } else if (req.user.role === 'student') {
      query.students = req.user.studentId;
    }

    const assignments = await Assignment.find(query)
      .populate('subject', 'name code')
      .populate('teacher', 'user employeeId')
      .populate('teacher.user', 'firstName lastName')
      .populate('submissions.student', 'user studentId')
      .populate('submissions.student.user', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ dueDate: 1 });

    const total = await Assignment.countDocuments(query);

    res.json({
      success: true,
      assignments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get assignment by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('subject', 'name code')
      .populate('teacher', 'user employeeId')
      .populate('teacher.user', 'firstName lastName')
      .populate('students', 'user studentId')
      .populate('students.user', 'firstName lastName')
      .populate('submissions.student', 'user studentId')
      .populate('submissions.student.user', 'firstName lastName')
      .populate('submissions.grade.gradedBy', 'user employeeId')
      .populate('submissions.grade.gradedBy.user', 'firstName lastName');

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    res.json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Create new assignment
router.post('/', authenticate, authorize('admin', 'teacher'), upload.array('attachments', 10), async (req, res) => {
  try {
    const {
      title, description, instructions, subject, classes, students, type,
      difficulty, maxMarks, passingMarks, dueDate, allowLateSubmission,
      latePenalty, resources, rubric, settings
    } = req.body;

    const assignmentData = {
      title,
      description,
      instructions,
      subject,
      teacher: req.user.teacherId,
      classes: JSON.parse(classes || '[]'),
      students: students ? JSON.parse(students) : [],
      type,
      difficulty,
      maxMarks: parseInt(maxMarks),
      passingMarks: parseInt(passingMarks),
      dueDate: new Date(dueDate),
      allowLateSubmission: allowLateSubmission === 'true',
      latePenalty: parseInt(latePenalty || 0),
      resources: resources ? JSON.parse(resources) : [],
      rubric: rubric ? JSON.parse(rubric) : [],
      settings: settings ? JSON.parse(settings) : {}
    };

    if (req.files && req.files.length > 0) {
      assignmentData.attachments = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      }));
    }

    const assignment = new Assignment(assignmentData);
    await assignment.save();

    const populatedAssignment = await Assignment.findById(assignment._id)
      .populate('subject', 'name code')
      .populate('teacher', 'user employeeId')
      .populate('teacher.user', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      assignment: populatedAssignment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Continue to part 2 (update, submit, grade, student view, stats)...
// Update assignment
router.put('/:id', authenticate, authorize('admin', 'teacher'), upload.array('attachments', 10), async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    if (assignment.teacher.toString() !== req.user.teacherId && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this assignment' });
    }

    const updateData = { ...req.body };

    if (updateData.classes) updateData.classes = JSON.parse(updateData.classes);
    if (updateData.students) updateData.students = JSON.parse(updateData.students);
    if (updateData.resources) updateData.resources = JSON.parse(updateData.resources);
    if (updateData.rubric) updateData.rubric = JSON.parse(updateData.rubric);
    if (updateData.settings) updateData.settings = JSON.parse(updateData.settings);

    if (req.files && req.files.length > 0) {
      const newAttachments = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      }));
      updateData.attachments = [...(assignment.attachments || []), ...newAttachments];
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
      .populate('subject', 'name code')
      .populate('teacher', 'user employeeId')
      .populate('teacher.user', 'firstName lastName');

    res.json({ success: true, message: 'Assignment updated successfully', assignment: updatedAssignment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Submit assignment
router.post('/:id/submit', authenticate, authorize('student'), upload.array('attachments', 5), async (req, res) => {
  try {
    const { content } = req.body;

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    if (assignment.status === 'closed') {
      return res.status(400).json({ success: false, message: 'Assignment is closed for submissions' });
    }

    if (!assignment.students.includes(req.user.studentId)) {
      return res.status(403).json({ success: false, message: 'You are not assigned to this assignment' });
    }

    const existingSubmission = assignment.submissions.find(sub => sub.student.toString() === req.user.studentId);

    if (existingSubmission && !assignment.settings.allowMultipleAttempts) {
      return res.status(400).json({ success: false, message: 'You have already submitted this assignment' });
    }

    if (existingSubmission && assignment.settings.allowMultipleAttempts && existingSubmission.attempts >= assignment.settings.maxAttempts) {
      return res.status(400).json({ success: false, message: 'Maximum attempts exceeded' });
    }

    const submissionData = {
      student: req.user.studentId,
      content,
      submittedAt: new Date(),
      isLate: new Date() > assignment.dueDate,
      attempts: existingSubmission ? existingSubmission.attempts + 1 : 1
    };

    if (req.files && req.files.length > 0) {
      submissionData.attachments = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      }));
    }

    if (existingSubmission) {
      Object.assign(existingSubmission, submissionData);
    } else {
      assignment.submissions.push(submissionData);
    }

    await assignment.save();

    res.json({ success: true, message: 'Assignment submitted successfully', submission: submissionData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Grade assignment submission
router.post('/:id/submissions/:submissionId/grade', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const { marksObtained, feedback, rubricScores } = req.body;

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    const submission = assignment.submissions.id(req.params.submissionId);

    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    const percentage = Math.round((marksObtained / assignment.maxMarks) * 100 * 100) / 100;

    let letterGrade = 'F';
    if (percentage >= 90) letterGrade = 'A+';
    else if (percentage >= 80) letterGrade = 'A';
    else if (percentage >= 70) letterGrade = 'B+';
    else if (percentage >= 60) letterGrade = 'B';
    else if (percentage >= 50) letterGrade = 'C+';
    else if (percentage >= 40) letterGrade = 'C';
    else if (percentage >= 35) letterGrade = 'D+';
    else if (percentage >= 33) letterGrade = 'D';

    submission.grade = {
      marksObtained: parseInt(marksObtained),
      maxMarks: assignment.maxMarks,
      percentage,
      letterGrade,
      feedback,
      rubricScores: rubricScores ? JSON.parse(rubricScores) : [],
      gradedBy: req.user.teacherId,
      gradedAt: new Date()
    };

    submission.status = 'graded';

    await assignment.save();

    res.json({ success: true, message: 'Assignment graded successfully', grade: submission.grade });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get student's assignments
router.get('/student/:studentId', authenticate, async (req, res) => {
  try {
    if (req.user.role === 'student' && req.user.studentId !== req.params.studentId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const { status, subject, dueDate } = req.query;

    let query = { students: req.params.studentId, isActive: true };

    if (status) query.status = status;
    if (subject) query.subject = subject;

    if (dueDate === 'overdue') {
      query.dueDate = { $lt: new Date() };
      query.status = { $ne: 'closed' };
    } else if (dueDate === 'upcoming') {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      query.dueDate = { $gte: new Date(), $lte: nextWeek };
    }

    const assignments = await Assignment.find(query)
      .populate('subject', 'name code')
      .populate('teacher', 'user employeeId')
      .populate('teacher.user', 'firstName lastName')
      .sort({ dueDate: 1 });

    const assignmentsWithStatus = assignments.map(assignment => {
      const submission = assignment.submissions.find(sub => sub.student.toString() === req.params.studentId);
      return {
        ...assignment.toObject(),
        submissionStatus: submission ? submission.status : 'not-submitted',
        submission: submission || null
      };
    });

    res.json({ success: true, assignments: assignmentsWithStatus });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get assignment statistics
router.get('/:id/stats', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    const totalStudents = assignment.students.length;
    const totalSubmissions = assignment.submissions.length;
    const gradedSubmissions = assignment.submissions.filter(sub => sub.status === 'graded').length;
    const lateSubmissions = assignment.submissions.filter(sub => sub.isLate).length;

    const grades = assignment.submissions
      .filter(sub => sub.grade)
      .map(sub => sub.grade.marksObtained);

    const stats = {
      totalStudents,
      totalSubmissions,
      submissionRate: totalStudents > 0 ? Math.round((totalSubmissions / totalStudents) * 100) : 0,
      gradedSubmissions,
      gradingProgress: totalSubmissions > 0 ? Math.round((gradedSubmissions / totalSubmissions) * 100) : 0,
      lateSubmissions,
      lateSubmissionRate: totalSubmissions > 0 ? Math.round((lateSubmissions / totalSubmissions) * 100) : 0,
      averageGrade: grades.length > 0 ? Math.round((grades.reduce((a, b) => a + b, 0) / grades.length) * 100) / 100 : 0,
      highestGrade: grades.length > 0 ? Math.max(...grades) : 0,
      lowestGrade: grades.length > 0 ? Math.min(...grades) : 0
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

export default router;
