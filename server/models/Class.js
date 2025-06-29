import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true,
    enum: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  },
  section: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  subjects: [{
    name: {
      type: String,
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    },
    periodsPerWeek: {
      type: Number,
      required: true
    }
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  maxStrength: {
    type: Number,
    default: 40
  },
  currentStrength: {
    type: Number,
    default: 0
  },
  classroom: {
    roomNumber: String,
    building: String,
    floor: String
  },
  timetable: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      required: true
    },
    periods: [{
      periodNumber: Number,
      startTime: String,
      endTime: String,
      subject: String,
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
      }
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for unique class identification
classSchema.index({ grade: 1, section: 1, academicYear: 1 }, { unique: true });

export default mongoose.model('Class', classSchema);