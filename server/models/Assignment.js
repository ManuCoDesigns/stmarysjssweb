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
  subject: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  totalPoints: {
    type: Number,
    default: 100
  },
  type: {
    type: String,
    enum: ['homework', 'quiz', 'test', 'project', 'lab'],
    default: 'homework'
  },
  instructions: {
    type: String,
    default: ''
  },
  attachments: [{
    filename: String,
    originalName: String,
    path: String,
    size: Number
  }],
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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
      size: Number
    }],
    grade: {
      type: Number,
      min: 0
    },
    feedback: String,
    gradedAt: Date,
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['submitted', 'graded', 'returned'],
      default: 'submitted'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
assignmentSchema.index({ teacher: 1, class: 1 });
assignmentSchema.index({ dueDate: 1 });
assignmentSchema.index({ subject: 1 });

export default mongoose.model('Assignment', assignmentSchema);