import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create demo users
    const users = [
      {
        name: 'John Doe',
        email: 'student@demo',
        password: 'password123',
        role: 'student',
        studentId: 'STU001',
        grade: 'Grade 10',
        avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150',
        phone: '+254712345678',
        address: '123 Student Street, Nairobi',
        emergencyContact: 'Robert Doe - +254723456789',
        dateOfBirth: new Date('2008-05-15'),
        bio: 'Aspiring engineer with strong analytical skills and passion for STEM subjects.'
      },
      {
        name: 'Mrs. Sarah Johnson',
        email: 'teacher@demo',
        password: 'password123',
        role: 'teacher',
        subjects: ['Mathematics', 'Physics'],
        avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
        employeeId: 'TCH001',
        department: 'Science Department',
        phone: '+254734567890',
        address: '456 Teacher Avenue, Nairobi',
        hireDate: new Date('2020-08-15'),
        qualification: 'MSc Mathematics Education',
        experience: '8 years',
        bio: 'Dedicated mathematics and physics teacher with expertise in making complex concepts accessible to students.',
        permissions: ['grade_students', 'create_assignments', 'view_student_records', 'communicate_parents']
      },
      {
        name: 'Mr. David Smith',
        email: 'parent@demo',
        password: 'password123',
        role: 'parent',
        avatar: 'https://images.pexels.com/photos/3182743/pexels-photo-3182743.jpeg?auto=compress&cs=tinysrgb&w=150',
        phone: '+254745678901',
        address: '789 Parent Road, Nairobi',
        emergencyContact: 'Mary Smith - +254756789012',
        occupation: 'Engineer',
        bio: 'Supportive parent actively involved in children\'s education and school community.',
        permissions: ['view_child_records', 'communicate_teachers', 'schedule_meetings', 'make_payments']
      },
      {
        name: 'Mrs. Catherine Wanjiku',
        email: 'admin@demo',
        password: 'password123',
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=150',
        employeeId: 'ADM001',
        department: 'Administration',
        phone: '+254767890123',
        address: '321 Admin Street, Nairobi',
        hireDate: new Date('2015-01-10'),
        qualification: 'MEd Educational Leadership',
        experience: '15 years',
        bio: 'Experienced educational leader committed to fostering academic excellence and character development.',
        permissions: ['all']
      }
    ];

    // Hash passwords and create users
    for (const userData of users) {
      const salt = await bcrypt.genSalt(12);
      userData.password = await bcrypt.hash(userData.password, salt);
      
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.name} (${user.role})`);
    }

    console.log('✅ Seed data created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed data creation failed:', error);
    process.exit(1);
  }
};

seedUsers();