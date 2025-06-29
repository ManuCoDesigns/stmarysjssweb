// server/models/Admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  adminId: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true,
    enum: ['academic', 'administration', 'finance', 'hr', 'it', 'maintenance', 'transport']
  },
  position: {
    type: String,
    required: true
  },
  permissions: {
    users: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    students: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    teachers: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    parents: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    classes: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    subjects: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    exams: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    announcements: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    events: {
      create: { type: Boolean, default: false },
      read: { type: Boolean, default: true },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false }
    },
    reports: {
      generate: { type: Boolean, default: false },
      view: { type: Boolean, default: true }
    },
    settings: {
      system: { type: Boolean, default: false },
      school: { type: Boolean, default: false }
    }
  },
  accessLevel: {
    type: String,
    enum: ['super', 'high', 'medium', 'low'],
    default: 'medium'
  },
  joiningDate: {
    type: Date,
    required: true
  },
  lastLogin: Date,
  loginHistory: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    ipAddress: String,
    userAgent: String,
    location: String
  }],
  activityLog: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    action: {
      type: String,
      required: true
    },
    resource: String,
    resourceId: String,
    details: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isSuperAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for faster search
adminSchema.index({ adminId: 1 });
adminSchema.index({ department: 1 });
adminSchema.index({ accessLevel: 1 });

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
