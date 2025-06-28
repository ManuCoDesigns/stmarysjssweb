import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'parent', 'admin'],
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  // Student specific fields
  studentId: {
    type: String,
    sparse: true
  },
  grade: {
    type: String,
    default: ''
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Teacher specific fields
  employeeId: {
    type: String,
    sparse: true
  },
  subjects: [{
    type: String
  }],
  qualification: {
    type: String,
    default: ''
  },
  experience: {
    type: String,
    default: ''
  },
  department: {
    type: String,
    default: ''
  },
  hireDate: {
    type: Date
  },
  // Parent specific fields
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  occupation: {
    type: String,
    default: ''
  },
  // Admin specific fields
  permissions: [{
    type: String
  }],
  // Common fields
  emergencyContact: {
    type: String,
    default: ''
  },
  dateOfBirth: {
    type: Date
  },
  bio: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ studentId: 1 });
userSchema.index({ employeeId: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model('User', userSchema);