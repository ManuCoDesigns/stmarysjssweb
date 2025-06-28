import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
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
    enum: ['Academic', 'Achievement', 'Infrastructure', 'Sports', 'Community', 'Environment', 'Events'],
    required: true
  },
  image: {
    filename: String,
    originalName: String,
    path: String,
    url: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  tags: [{
    type: String
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    approved: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Set publishedAt when published is set to true
newsSchema.pre('save', function(next) {
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Indexes for better performance
newsSchema.index({ category: 1, published: 1 });
newsSchema.index({ featured: 1, published: 1 });
newsSchema.index({ publishedAt: -1 });

export default mongoose.model('News', newsSchema);