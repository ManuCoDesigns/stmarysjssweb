import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  },
  grade: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  totalPoints: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  weight: {
    type: String,
    enum: ['major', 'minor', 'quiz', 'homework', 'project'],
    default: 'minor'
  },
  term: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    default: ''
  },
  gradedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate percentage before saving
gradeSchema.pre('save', function(next) {
  this.percentage = Math.round((this.points / this.totalPoints) * 100);
  next();
});

// Indexes for better performance
gradeSchema.index({ student: 1, subject: 1, term: 1 });
gradeSchema.index({ teacher: 1 });

export default mongoose.model('Grade', gradeSchema);