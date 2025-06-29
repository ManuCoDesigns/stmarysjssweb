import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['unit-test', 'mid-term', 'final', 'practical', 'project'],
    required: true
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
  grades: [{
    type: String,
    enum: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    required: true
  }],
  subjects: [{
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    maxMarks: {
      type: Number,
      required: true
    },
    passingMarks: {
      type: Number,
      required: true
    },
    room: String,
    invigilator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    }
  }],
  results: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    marks: [{
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
      },
      marksObtained: Number,
      maxMarks: Number,
      grade: String,
      remarks: String
    }],
    totalMarks: Number,
    percentage: Number,
    grade: String,
    rank: Number,
    status: {
      type: String,
      enum: ['pass', 'fail', 'absent'],
      default: 'pass'
    }
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  publishDate: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Exam', examSchema);