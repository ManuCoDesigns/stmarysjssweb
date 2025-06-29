import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  description: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    required: true
  },
  grades: [{
    type: String,
    enum: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    required: true
  }],
  type: {
    type: String,
    enum: ['core', 'elective', 'optional'],
    default: 'core'
  },
  credits: {
    type: Number,
    default: 1
  },
  syllabus: [{
    chapter: String,
    topics: [String],
    duration: String
  }],
  books: [{
    title: String,
    author: String,
    publisher: String,
    isbn: String,
    type: {
      type: String,
      enum: ['textbook', 'reference', 'workbook']
    }
  }],
  assessmentPattern: {
    internal: {
      type: Number,
      default: 40
    },
    external: {
      type: Number,
      default: 60
    },
    practical: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Subject', subjectSchema);