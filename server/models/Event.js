import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['academic', 'sports', 'cultural', 'holiday', 'meeting', 'workshop', 'competition'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
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
  venue: {
    type: String,
    required: true
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: {
    targetAudience: {
      type: [String],
      enum: ['all', 'students', 'teachers', 'parents', 'staff'],
      default: ['all']
    },
    specificGrades: [{
      type: String,
      enum: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }],
    maxParticipants: Number,
    registeredParticipants: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      registrationDate: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['registered', 'confirmed', 'cancelled'],
        default: 'registered'
      }
    }]
  },
  requirements: {
    materials: [String],
    permissions: [String],
    budget: Number
  },
  images: [{
    filename: String,
    path: String,
    caption: String
  }],
  status: {
    type: String,
    enum: ['planned', 'ongoing', 'completed', 'cancelled'],
    default: 'planned'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  registrationRequired: {
    type: Boolean,
    default: false
  },
  registrationDeadline: Date
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);