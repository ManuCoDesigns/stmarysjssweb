import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['general', 'academic', 'sports', 'events', 'holidays', 'emergency', 'fees'],
    default: 'general'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  targetAudience: {
    type: [String],
    enum: ['all', 'students', 'teachers', 'parents', 'staff'],
    default: ['all']
  },
  specificGrades: [{
    type: String,
    enum: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  }],
  attachments: [{
    filename: String,
    originalName: String,
    path: String,
    size: Number,
    mimetype: String
  }],
  publishDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for efficient queries
announcementSchema.index({ publishDate: -1 });
announcementSchema.index({ category: 1 });
announcementSchema.index({ priority: 1 });
announcementSchema.index({ isPublished: 1 });

export default mongoose.model('Announcement', announcementSchema);