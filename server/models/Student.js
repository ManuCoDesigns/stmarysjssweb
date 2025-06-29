import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  grade: {
    type: String,
    required: true,
    enum: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  },
  section: {
    type: String,
    required: true
  },
  rollNumber: {
    type: Number,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  parentContact: {
    father: {
      name: String,
      phone: String,
      email: String,
      occupation: String
    },
    mother: {
      name: String,
      phone: String,
      email: String,
      occupation: String
    },
    guardian: {
      name: String,
      phone: String,
      email: String,
      relationship: String
    }
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
  medicalInfo: {
    allergies: [String],
    medications: [String],
    conditions: [String],
    doctorContact: {
      name: String,
      phone: String
    }
  },
  academicYear: {
    type: String,
    required: true
  },
  admissionDate: {
    type: Date,
    required: true
  },
  fees: {
    totalAmount: {
      type: Number,
      default: 0
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    dueAmount: {
      type: Number,
      default: 0
    },
    lastPaymentDate: Date
  },
  attendance: [{
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'excused'],
      required: true
    },
    remarks: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
studentSchema.index({ studentId: 1 });
studentSchema.index({ grade: 1, section: 1 });
studentSchema.index({ academicYear: 1 });

export default mongoose.model('Student', studentSchema);