import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Student from '../models/Student.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'server/uploads/students';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allow images and PDFs
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only image and PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Get all students with filtering and pagination
router.get('/', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      grade,
      class: className,
      status = 'Active',
      search,
      sortBy = 'lastName',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter = { status };
    
    if (grade) filter.grade = grade;
    if (className) filter.class = className;
    
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { admissionNumber: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort,
      populate: [
        { path: 'createdBy', select: 'name email' },
        { path: 'lastModifiedBy', select: 'name email' }
      ]
    };

    const students = await Student.paginate(filter, options);

    res.json({
      success: true,
      data: students.docs,
      pagination: {
        currentPage: students.page,
        totalPages: students.totalPages,
        totalStudents: students.totalDocs,
        hasNextPage: students.hasNextPage,
        hasPrevPage: students.hasPrevPage
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch students', 
      error: error.message 
    });
  }
});

// Get student by ID
router.get('/:id', authenticate, authorize('admin', 'teacher', 'parent'), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('lastModifiedBy', 'name email');

    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    // If user is a parent, check if they have access to this student
    if (req.user.role === 'parent') {
      const hasAccess = student.parents.some(parent => 
        parent.email === req.user.email || parent.phone === req.user.phone
      );
      
      if (!hasAccess) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied. You can only view your own child\'s information.' 
        });
      }
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch student', 
      error: error.message 
    });
  }
});

// Create new student
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const studentData = {
      ...req.body,
      createdBy: req.user._id
    };

    const student = new Student(studentData);
    await student.save();

    const populatedStudent = await Student.findById(student._id)
      .populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: populatedStudent
    });
  } catch (error) {
    console.error('Create student error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        success: false, 
        message: `Student with this ${field} already exists` 
      });
    }
    
    res.status(400).json({ 
      success: false, 
      message: 'Failed to create student', 
      error: error.message 
    });
  }
});

// Update student
router.put('/:id', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      lastModifiedBy: req.user._id
    };

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy lastModifiedBy', 'name email');

    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Failed to update student', 
      error: error.message 
    });
  }
});

// Delete student (soft delete)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'Inactive',
        isActive: false,
        lastModifiedBy: req.user._id
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    res.json({
      success: true,
      message: 'Student deactivated successfully',
      data: student
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to deactivate student', 
      error: error.message 
    });
  }
});

// Upload student document
router.post('/:id/documents', authenticate, authorize('admin', 'teacher'), upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    const { name, type } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    const document = {
      name: name || req.file.originalname,
      type: type || 'Other',
      filename: req.file.filename,
      path: req.file.path
    };

    student.documents.push(document);
    student.lastModifiedBy = req.user._id;
    await student.save();

    res.json({
      success: true,
      message: 'Document uploaded successfully',
      data: document
    });
  } catch (error) {
    console.error('Upload document error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to upload document', 
      error: error.message 
    });
  }
});

// Delete student document
router.delete('/:id/documents/:documentId', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    const document = student.documents.id(req.params.documentId);
    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: 'Document not found' 
      });
    }

    // Delete file from filesystem
    if (fs.existsSync(document.path)) {
      fs.unlinkSync(document.path);
    }

    student.documents.pull(req.params.documentId);
    student.lastModifiedBy = req.user._id;
    await student.save();

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete document', 
      error: error.message 
    });
  }
});

// Get students by grade/class
router.get('/grade/:grade', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const { grade } = req.params;
    const { class: className } = req.query;

    const filter = { grade, status: 'Active' };
    if (className) filter.class = className;

    const students = await Student.find(filter)
      .select('firstName lastName studentId email phone academicRecord.currentGPA academicRecord.attendanceRate')
      .sort({ lastName: 1, firstName: 1 });

    res.json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error('Get students by grade error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch students', 
      error: error.message 
    });
  }
});

// Get student statistics
router.get('/stats/overview', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const stats = await Student.aggregate([
      {
        $group: {
          _id: null,
          totalStudents: { $sum: 1 },
          activeStudents: {
            $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
          },
          averageGPA: { $avg: '$academicRecord.currentGPA' },
          averageAttendance: { $avg: '$academicRecord.attendanceRate' }
        }
      }
    ]);

    const gradeDistribution = await Student.aggregate([
      { $match: { status: 'Active' } },
      {
        $group: {
          _id: '$grade',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const genderDistribution = await Student.aggregate([
      { $match: { status: 'Active' } },
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {
          totalStudents: 0,
          activeStudents: 0,
          averageGPA: 0,
          averageAttendance: 0
        },
        gradeDistribution,
        genderDistribution
      }
    });
  } catch (error) {
    console.error('Get student stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch statistics', 
      error: error.message 
    });
  }
});

// Bulk operations
router.post('/bulk/update', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { studentIds, updateData } = req.body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student IDs array is required' 
      });
    }

    const result = await Student.updateMany(
      { _id: { $in: studentIds } },
      { 
        ...updateData,
        lastModifiedBy: req.user._id
      }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} students updated successfully`,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      }
    });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update students', 
      error: error.message 
    });
  }
});

// Promote students to next grade
router.post('/bulk/promote', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { studentIds, newGrade, newClass, newAcademicYear } = req.body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student IDs array is required' 
      });
    }

    const updateData = {
      lastModifiedBy: req.user._id
    };

    if (newGrade) updateData.grade = newGrade;
    if (newClass) updateData.class = newClass;
    if (newAcademicYear) updateData.academicYear = newAcademicYear;

    const result = await Student.updateMany(
      { _id: { $in: studentIds } },
      updateData
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} students promoted successfully`,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      }
    });
  } catch (error) {
    console.error('Bulk promote error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to promote students', 
      error: error.message 
    });
  }
});

// Search students
router.get('/search/:query', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 10 } = req.query;

    const students = await Student.find({
      $and: [
        { status: 'Active' },
        {
          $or: [
            { firstName: { $regex: query, $options: 'i' } },
            { lastName: { $regex: query, $options: 'i' } },
            { studentId: { $regex: query, $options: 'i' } },
            { admissionNumber: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    })
    .select('firstName lastName studentId grade class email phone')
    .limit(parseInt(limit))
    .sort({ lastName: 1, firstName: 1 });

    res.json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error('Search students error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to search students', 
      error: error.message 
    });
  }
});

export default router;