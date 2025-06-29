import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
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
  date: {
    type: Date,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  periods: [{
    periodNumber: {
      type: Number,
      required: true
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    startTime: String,
    endTime: String,
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'excused', 'sick', 'authorized'],
      required: true
    },
    arrivalTime: String,
    remarks: String,
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    markedAt: {
      type: Date,
      default: Date.now
    }
  }],
  overallStatus: {
    type: String,
    enum: ['present', 'absent', 'partial', 'late', 'excused'],
    required: true
  },
  totalPeriods: {
    type: Number,
    required: true
  },
  presentPeriods: {
    type: Number,
    default: 0
  },
  absentPeriods: {
    type: Number,
    default: 0
  },
  lateArrivals: {
    type: Number,
    default: 0
  },
  earlyDepartures: [{
    periodNumber: Number,
    departureTime: String,
    reason: String,
    authorizedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  excuseNote: {
    reason: String,
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    submittedAt: Date,
    attachments: [{
      filename: String,
      path: String,
      type: String
    }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date,
    reviewComments: String
  },
  notifications: {
    parentNotified: {
      type: Boolean,
      default: false
    },
    notificationSentAt: Date,
    notificationMethod: {
      type: String,
      enum: ['sms', 'email', 'app', 'call']
    }
  },
  location: {
    markedFrom: {
      type: String,
      enum: ['classroom', 'office', 'mobile', 'gate']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  biometricData: {
    fingerprintId: String,
    faceId: String,
    cardId: String
  }
}, {
  timestamps: true
});

// Calculate attendance statistics before saving
attendanceSchema.pre('save', function(next) {
  this.presentPeriods = this.periods.filter(p => p.status === 'present').length;
  this.absentPeriods = this.periods.filter(p => p.status === 'absent').length;
  this.lateArrivals = this.periods.filter(p => p.status === 'late').length;
  
  // Determine overall status
  if (this.presentPeriods === this.totalPeriods) {
    this.overallStatus = 'present';
  } else if (this.presentPeriods === 0) {
    this.overallStatus = 'absent';
  } else if (this.lateArrivals > 0) {
    this.overallStatus = 'late';
  } else {
    this.overallStatus = 'partial';
  }
  
  next();
});

// Index for efficient queries
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });
attendanceSchema.index({ 'class.grade': 1, 'class.section': 1, date: 1 });
attendanceSchema.index({ date: -1 });
attendanceSchema.index({ academicYear: 1 });
attendanceSchema.index({ overallStatus: 1 });

export default mongoose.model('Attendance', attendanceSchema);