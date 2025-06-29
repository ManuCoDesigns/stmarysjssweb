import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipients: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    readAt: Date,
    isRead: {
      type: Boolean,
      default: false
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  }],
  subject: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['personal', 'announcement', 'notification', 'system', 'broadcast'],
    default: 'personal'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['academic', 'administrative', 'disciplinary', 'health', 'transport', 'fees', 'general'],
    default: 'general'
  },
  attachments: [{
    filename: String,
    originalName: String,
    path: String,
    size: Number,
    mimetype: String
  }],
  parentMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  thread: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  scheduledFor: Date,
  isScheduled: {
    type: Boolean,
    default: false
  },
  isSent: {
    type: Boolean,
    default: true
  },
  deliveryStatus: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'failed'],
    default: 'sent'
  },
  readReceipts: {
    type: Boolean,
    default: false
  },
  expiryDate: Date,
  tags: [String],
  metadata: {
    studentId: String,
    classId: String,
    subjectId: String,
    eventId: String,
    examId: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
messageSchema.index({ sender: 1 });
messageSchema.index({ 'recipients.user': 1 });
messageSchema.index({ createdAt: -1 });
messageSchema.index({ type: 1 });
messageSchema.index({ priority: 1 });
messageSchema.index({ scheduledFor: 1 });

export default mongoose.model('Message', messageSchema);