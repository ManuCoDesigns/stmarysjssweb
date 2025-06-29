import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  class: {
    grade: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true
    }
  },
  academicYear: {
    type: String,
    required: true
  },
  term: {
    type: String,
    enum: ['1st', '2nd', '3rd'],
    required: true
  },
  assessmentType: {
    type: String,
    enum: ['assignment', 'quiz', 'test', 'exam', 'project', 'participation', 'homework'],
    required: true
  },
  assessmentName: {
    type: String,
    required: true
  },
  assessmentDate: {
    type: Date,
    required: true
  },
  marksObtained: {
    type: Number,
    required: true,
    min: 0
  },
  maxMarks: {
    type: Number,
    required: true,
    min: 1
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100
  },
  letterGrade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F']
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4
  },
  weightage: {
    type: Number,
    default: 1,
    min: 0
  },
  feedback: {
    type: String,
    trim: true
  },
  remarks: {
    type: String,
    trim: true
  },
  skills: [{
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['excellent', 'good', 'satisfactory', 'needs-improvement'],
      required: true
    },
    comments: String
  }],
  behavioralAssessment: {
    attendance: {
      type: String,
      enum: ['excellent', 'good', 'satisfactory', 'poor']
    },
    participation: {
      type: String,
      enum: ['excellent', 'good', 'satisfactory', 'poor']
    },
    homework: {
      type: String,
      enum: ['excellent', 'good', 'satisfactory', 'poor']
    },
    behavior: {
      type: String,
      enum: ['excellent', 'good', 'satisfactory', 'poor']
    }
  },
  parentViewed: {
    type: Boolean,
    default: false
  },
  parentViewedAt: Date,
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  publishedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  modificationHistory: [{
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    modifiedAt: {
      type: Date,
      default: Date.now
    },
    changes: {
      field: String,
      oldValue: mongoose.Schema.Types.Mixed,
      newValue: mongoose.Schema.Types.Mixed
    },
    reason: String
  }]
}, {
  timestamps: true
});

// Calculate percentage and letter grade before saving
gradeSchema.pre('save', function(next) {
  // Calculate percentage
  this.percentage = Math.round((this.marksObtained / this.maxMarks) * 100 * 100) / 100;
  
  // Calculate letter grade
  if (this.percentage >= 90) {
    this.letterGrade = 'A+';
    this.gradePoints = 4.0;
  } else if (this.percentage >= 80) {
    this.letterGrade = 'A';
    this.gradePoints = 3.7;
  } else if (this.percentage >= 70) {
    this.letterGrade = 'B+';
    this.gradePoints = 3.3;
  } else if (this.percentage >= 60) {
    this.letterGrade = 'B';
    this.gradePoints = 3.0;
  } else if (this.percentage >= 50) {
    this.letterGrade = 'C+';
    this.gradePoints = 2.7;
  } else if (this.percentage >= 40) {
    this.letterGrade = 'C';
    this.gradePoints = 2.0;
  } else if (this.percentage >= 35) {
    this.letterGrade = 'D+';
    this.gradePoints = 1.7;
  } else if (this.percentage >= 33) {
    this.letterGrade = 'D';
    this.gradePoints = 1.0;
  } else {
    this.letterGrade = 'F';
    this.gradePoints = 0.0;
  }
  
  next();
});

// Index for efficient queries
gradeSchema.index({ student: 1, subject: 1, academicYear: 1, term: 1 });
gradeSchema.index({ teacher: 1 });
gradeSchema.index({ assessmentDate: -1 });
gradeSchema.index({ 'class.grade': 1, 'class.section': 1 });
gradeSchema.index({ isPublished: 1 });

export default mongoose.model('Grade', gradeSchema);