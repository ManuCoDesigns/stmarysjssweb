import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  avatar?: string;
  studentId?: string;
  grade?: string;
  subjects?: string[];
  children?: string[];
  permissions?: string[];
  department?: string;
  employeeId?: string;
  phone?: string;
  address?: string;
  emergencyContact?: string;
  dateOfBirth?: string;
  hireDate?: string;
  qualification?: string;
  experience?: string;
  specializations?: string[];
  classesTeaching?: string[];
  officeHours?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  canAccess: (resource: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - In real implementation, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Enhanced demo users with comprehensive data
      const demoUsers: Record<string, User> = {
        'student@demo': {
          id: '1',
          name: 'John Doe',
          email: 'student@demo',
          role: 'student',
          studentId: 'STU001',
          grade: 'Grade 10',
          avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150',
          phone: '+254712345678',
          address: '123 Student Street, Nairobi',
          emergencyContact: 'Robert Doe - +254723456789',
          dateOfBirth: '2008-05-15',
          specializations: ['Mathematics', 'Physics', 'Chemistry'],
          bio: 'Aspiring engineer with strong analytical skills and passion for STEM subjects.'
        },
        'teacher@demo': {
          id: '2',
          name: 'Mrs. Sarah Johnson',
          email: 'teacher@demo',
          role: 'teacher',
          subjects: ['Mathematics', 'Physics'],
          avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
          employeeId: 'TCH001',
          department: 'Science Department',
          phone: '+254734567890',
          address: '456 Teacher Avenue, Nairobi',
          hireDate: '2020-08-15',
          qualification: 'MSc Mathematics Education',
          experience: '8 years',
          specializations: ['Advanced Mathematics', 'Physics', 'STEM Education'],
          classesTeaching: ['Grade 10A Mathematics', 'Grade 10B Mathematics', 'Grade 9A Physics'],
          officeHours: 'Monday-Friday 2:00-4:00 PM',
          bio: 'Dedicated mathematics and physics teacher with expertise in making complex concepts accessible to students.',
          permissions: ['grade_students', 'create_assignments', 'view_student_records', 'communicate_parents']
        },
        'parent@demo': {
          id: '3',
          name: 'Mr. David Smith',
          email: 'parent@demo',
          role: 'parent',
          children: ['John Doe - Grade 10', 'Jane Doe - Grade 7'],
          avatar: 'https://images.pexels.com/photos/3182743/pexels-photo-3182743.jpeg?auto=compress&cs=tinysrgb&w=150',
          phone: '+254745678901',
          address: '789 Parent Road, Nairobi',
          emergencyContact: 'Mary Smith - +254756789012',
          bio: 'Supportive parent actively involved in children\'s education and school community.',
          permissions: ['view_child_records', 'communicate_teachers', 'schedule_meetings', 'make_payments']
        },
        'admin@demo': {
          id: '4',
          name: 'Mrs. Catherine Wanjiku',
          email: 'admin@demo',
          role: 'admin',
          avatar: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=150',
          employeeId: 'ADM001',
          department: 'Administration',
          phone: '+254767890123',
          address: '321 Admin Street, Nairobi',
          hireDate: '2015-01-10',
          qualification: 'MEd Educational Leadership',
          experience: '15 years',
          specializations: ['Educational Leadership', 'Curriculum Development', 'School Management'],
          bio: 'Experienced educational leader committed to fostering academic excellence and character development.',
          permissions: ['all']
        }
      };

      const demoUser = demoUsers[email];
      
      if (demoUser && password === 'password123' && demoUser.role === userType) {
        // Store auth token and user data
        const token = `demo_token_${Date.now()}`;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(demoUser));
        
        setUser(demoUser);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions?.includes('all')) return true;
    return user.permissions?.includes(permission) || false;
  };

  const canAccess = (resource: string): boolean => {
    if (!user) return false;
    
    // Role-based access control
    const rolePermissions: Record<string, string[]> = {
      admin: ['all'],
      teacher: ['students', 'grades', 'assignments', 'classes', 'reports'],
      parent: ['children', 'messages', 'payments', 'meetings'],
      student: ['profile', 'grades', 'assignments', 'schedule', 'resources']
    };

    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes('all') || userPermissions.includes(resource);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    updateUser,
    isLoading,
    isAuthenticated: !!user,
    hasPermission,
    canAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};