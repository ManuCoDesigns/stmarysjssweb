import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentId: {
    type: String,
    required: true,
    unique: true
  },
  relationship: {
    type: String,
    enum: ['father', 'mother', 'guardian', 'stepfather', 'stepmother', 'grandparent', 'other'],
    required: true
  },
  occupation: {
    type: String,
    trim: true
  },
  workAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  workPhone: {
    type: String,
    trim: true
  },
  emergencyContact: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    relationship: {
      type: String,
      required: true
    }
  },
  children: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    relationship: {
      type: String,
      enum: ['son', 'daughter', 'stepson', 'stepdaughter', 'ward', 'other'],
      required: true
    },
    isPrimaryContact: {
      type: Boolean,
      default: false
    }
  }],
  preferences: {
    communicationMethod: {
      type: String,
      enum: ['email', 'sms', 'phone', 'app'],
      default: 'email'
    },
    notifications: {
      announcements: {
        type: Boolean,
        default: true
      },
      grades: {
        type: Boolean,
        default: true
      },
      attendance: {
        type: Boolean,
        default: true
      },
      events: {
        type: Boolean,
        default: true
      },
      fees: {
        type: Boolean,
        default: true
      },
      disciplinary: {
        type: Boolean,
        default: true
      }
    },
    language: {
      type: String,
      default: 'english'
    }
  },
  meetings: [{
    date: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      enum: ['parent-teacher', 'disciplinary', 'academic', 'counseling', 'other'],
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    purpose: {
      type: String,
      required: true
    },
    notes: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
      default: 'scheduled'
    }
  }],
  volunteerActivities: [{
    activity: {
      type: String,
      required: true
    },
    date: Date,
    hours: Number,
    description: String
  }],
  feedback: [{
    date: {
      type: Date,
      default: Date.now
    },
    category: {
      type: String,
      enum: ['academic', 'facilities', 'staff', 'communication', 'events', 'general'],
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['submitted', 'acknowledged', 'in-progress', 'resolved', 'closed'],
      default: 'submitted'
    },
    response: {
      message: String,
      respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      respondedAt: Date
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
parentSchema.index({ parentId: 1 });
parentSchema.index({ 'children.student': 1 });
parentSchema.index({ relationship: 1 });

export default mongoose.model('Parent', parentSchema);