import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
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
  classes: [{
    grade: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true
    }
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  type: {
    type: String,
    enum: ['homework', 'project', 'essay', 'presentation', 'lab', 'research', 'quiz'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  maxMarks: {
    type: Number,
    required: true,
    min: 1
  },
  passingMarks: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  assignedDate: {
    type: Date,
    default: Date.now
  },
  allowLateSubmission: {
    type: Boolean,
    default: false
  },
  latePenalty: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  attachments: [{
    filename: String,
    originalName: String,
    path: String,
    size: Number,
    mimetype: String
  }],
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['link', 'video', 'document', 'image']
    }
  }],
  rubric: [{
    criteria: {
      type: String,
      required: true
    },
    description: String,
    maxPoints: {
      type: Number,
      required: true
    },
    levels: [{
      name: String,
      description: String,
      points: Number
    }]
  }],
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    content: String,
    attachments: [{
      filename: String,
      originalName: String,
      path: String,
      size: Number,
      mimetype: String
    }],
    status: {
      type: String,
      enum: ['submitted', 'late', 'graded', 'returned'],
      default: 'submitted'
    },
    isLate: {
      type: Boolean,
      default: false
    },
    grade: {
      marksObtained: Number,
      maxMarks: Number,
      percentage: Number,
      letterGrade: String,
      feedback: String,
      rubricScores: [{
        criteria: String,
        points: Number,
        feedback: String
      }],
      gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
      },
      gradedAt: Date
    },
    attempts: {
      type: Number,
      default: 1
    },
    plagiarismCheck: {
      score: Number,
      report: String,
      checkedAt: Date
    }
  }],
  settings: {
    allowMultipleAttempts: {
      type: Boolean,
      default: false
    },
    maxAttempts: {
      type: Number,
      default: 1
    },
    showGradeImmediately: {
      type: Boolean,
      default: false
    },
    allowPeerReview: {
      type: Boolean,
      default: false
    },
    requireOriginalityCheck: {
      type: Boolean,
      default: false
    }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'closed', 'graded'],
    default: 'draft'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
assignmentSchema.index({ teacher: 1 });
assignmentSchema.index({ subject: 1 });
assignmentSchema.index({ dueDate: 1 });
assignmentSchema.index({ status: 1 });
assignmentSchema.index({ 'classes.grade': 1, 'classes.section': 1 });
assignmentSchema.index({ 'submissions.student': 1 });

export default mongoose.model('Assignment', assignmentSchema);