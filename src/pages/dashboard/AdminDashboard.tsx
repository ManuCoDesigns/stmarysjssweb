import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../../components/ConfirmDialog';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  UserCheck, 
  AlertTriangle,
  BarChart3,
  PieChart,
  Calendar,
  FileText,
  Settings,
  Download,
  Filter,
  Plus,
  Eye,
  Target,
  Award,
  Clock,
  Edit,
  Trash2,
  Search,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  RefreshCw,
  Upload,
  Save,
  X
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'danger'
  });

  // Form states for modals
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    email: '',
    grade: '',
    parentName: '',
    parentEmail: '',
    phone: ''
  });

  const [newTeacherForm, setNewTeacherForm] = useState({
    name: '',
    email: '',
    subjects: '',
    qualification: '',
    experience: '',
    phone: ''
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    priority: 'normal',
    audience: 'all'
  });

  const stats = [
    { 
      name: 'Total Students', 
      value: '512', 
      icon: Users, 
      color: 'bg-blue-500', 
      change: '+12',
      trend: 'up',
      target: '550',
      action: () => setActiveModal('students')
    },
    { 
      name: 'Total Teachers', 
      value: '28', 
      icon: UserCheck, 
      color: 'bg-green-500', 
      change: '+2',
      trend: 'up',
      target: '30',
      action: () => setActiveModal('teachers')
    },
    { 
      name: 'Active Classes', 
      value: '45', 
      icon: BookOpen, 
      color: 'bg-purple-500', 
      change: '+3',
      trend: 'up',
      target: '48',
      action: () => setActiveModal('classes')
    },
    { 
      name: 'Monthly Revenue', 
      value: 'KES 2.8M', 
      icon: DollarSign, 
      color: 'bg-yellow-500', 
      change: '+8%',
      trend: 'up',
      target: 'KES 3.2M',
      action: () => setActiveModal('finance')
    },
  ];

  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', grade: 'Grade 10', email: 'john@example.com', status: 'active', fees: 'paid' },
    { id: 2, name: 'Jane Smith', grade: 'Grade 9', email: 'jane@example.com', status: 'active', fees: 'pending' },
    { id: 3, name: 'Mike Johnson', grade: 'Grade 8', email: 'mike@example.com', status: 'active', fees: 'paid' },
    { id: 4, name: 'Sarah Wilson', grade: 'Grade 7', email: 'sarah@example.com', status: 'inactive', fees: 'overdue' },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Mrs. Johnson', subjects: 'Mathematics, Physics', email: 'johnson@school.com', status: 'active' },
    { id: 2, name: 'Mr. Smith', subjects: 'English, Literature', email: 'smith@school.com', status: 'active' },
    { id: 3, name: 'Dr. Brown', subjects: 'Chemistry, Biology', email: 'brown@school.com', status: 'active' },
    { id: 4, name: 'Ms. Davis', subjects: 'History, Geography', email: 'davis@school.com', status: 'leave' },
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Term 2 Begins', message: 'Welcome back students!', priority: 'high', date: '2024-03-20' },
    { id: 2, title: 'Parent Meeting', message: 'Monthly parent meeting scheduled', priority: 'normal', date: '2024-03-18' },
  ]);

  const gradeDistribution = [
    { 
      grade: 'Pre-Primary', 
      students: 45, 
      teachers: 3, 
      capacity: 50,
      avgGrade: 'N/A',
      attendance: 92,
      revenue: 'KES 202,500'
    },
    { 
      grade: 'Grade 1-3', 
      students: 120, 
      teachers: 6, 
      capacity: 135,
      avgGrade: 'B+',
      attendance: 94,
      revenue: 'KES 540,000'
    },
    { 
      grade: 'Grade 4-6', 
      students: 135, 
      teachers: 8, 
      capacity: 150,
      avgGrade: 'B+',
      attendance: 95,
      revenue: 'KES 668,250'
    },
    { 
      grade: 'Grade 7-9', 
      students: 156, 
      teachers: 9, 
      capacity: 165,
      avgGrade: 'B',
      attendance: 93,
      revenue: 'KES 913,200'
    },
    { 
      grade: 'Grade 10', 
      students: 56, 
      teachers: 2, 
      capacity: 60,
      avgGrade: 'B+',
      attendance: 97,
      revenue: 'KES 504,000'
    },
  ];

  const recentActivities = [
    { 
      action: 'New student enrolled', 
      details: 'John Smith - Grade 10', 
      time: '2 hours ago', 
      type: 'enrollment',
      user: 'Admissions Office',
      impact: 'positive'
    },
    { 
      action: 'Teacher added', 
      details: 'Dr. Mary Johnson - Science', 
      time: '1 day ago', 
      type: 'staff',
      user: 'HR Department',
      impact: 'positive'
    },
    { 
      action: 'Fee payment received', 
      details: 'KES 45,000 from Parent Portal', 
      time: '3 hours ago', 
      type: 'payment',
      user: 'Finance System',
      impact: 'positive'
    },
    { 
      action: 'Grade 10 exam scheduled', 
      details: 'Mathematics - March 25, 2024', 
      time: '5 hours ago', 
      type: 'academic',
      user: 'Academic Office',
      impact: 'neutral'
    },
  ];

  const [alerts, setAlerts] = useState([
    { 
      id: 1,
      message: 'Grade 10 university application deadline approaching', 
      priority: 'high', 
      time: '1 hour ago',
      category: 'academic',
      actionRequired: true,
      assignedTo: 'Academic Office'
    },
    { 
      id: 2,
      message: 'Low attendance in Grade 8B this week (78%)', 
      priority: 'medium', 
      time: '3 hours ago',
      category: 'attendance',
      actionRequired: true,
      assignedTo: 'Class Teacher'
    },
    { 
      id: 3,
      message: 'Outstanding fee payments: KES 450,000', 
      priority: 'high', 
      time: '2 hours ago',
      category: 'finance',
      actionRequired: true,
      assignedTo: 'Finance Office'
    },
  ]);

  const quickActions = [
    { 
      name: 'Add Student', 
      icon: Plus, 
      color: 'bg-blue-500',
      action: () => setActiveModal('addStudent')
    },
    { 
      name: 'Add Teacher', 
      icon: UserCheck, 
      color: 'bg-green-500',
      action: () => setActiveModal('addTeacher')
    },
    { 
      name: 'Send Announcement', 
      icon: Mail, 
      color: 'bg-purple-500',
      action: () => setActiveModal('announcement')
    },
    { 
      name: 'Generate Report', 
      icon: FileText, 
      color: 'bg-yellow-500',
      action: () => handleGenerateReport()
    },
    { 
      name: 'System Settings', 
      icon: Settings, 
      color: 'bg-gray-500',
      action: () => setActiveModal('settings')
    },
    { 
      name: 'Backup Data', 
      icon: Upload, 
      color: 'bg-indigo-500',
      action: () => handleBackupData()
    },
  ];

  // Action handlers with toast notifications
  const handleAddStudent = () => {
    if (!newStudentForm.name || !newStudentForm.email || !newStudentForm.grade) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Adding student...');
    
    setTimeout(() => {
      const newStudent = {
        id: students.length + 1,
        name: newStudentForm.name,
        grade: newStudentForm.grade,
        email: newStudentForm.email,
        status: 'active',
        fees: 'pending'
      };
      
      setStudents([...students, newStudent]);
      setNewStudentForm({ name: '', email: '', grade: '', parentName: '', parentEmail: '', phone: '' });
      setActiveModal(null);
      
      toast.dismiss(loadingToast);
      toast.success(`${newStudentForm.name} has been successfully added to ${newStudentForm.grade}!`, {
        duration: 4000,
        icon: '🎓',
      });
    }, 1000);
  };

  const handleAddTeacher = () => {
    if (!newTeacherForm.name || !newTeacherForm.email || !newTeacherForm.subjects) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Adding teacher...');
    
    setTimeout(() => {
      const newTeacher = {
        id: teachers.length + 1,
        name: newTeacherForm.name,
        subjects: newTeacherForm.subjects,
        email: newTeacherForm.email,
        status: 'active'
      };
      
      setTeachers([...teachers, newTeacher]);
      setNewTeacherForm({ name: '', email: '', subjects: '', qualification: '', experience: '', phone: '' });
      setActiveModal(null);
      
      toast.dismiss(loadingToast);
      toast.success(`${newTeacherForm.name} has been successfully added as a teacher!`, {
        duration: 4000,
        icon: '👨‍🏫',
      });
    }, 1000);
  };

  const handleSendAnnouncement = () => {
    if (!announcementForm.title || !announcementForm.message) {
      toast.error('Please fill in the title and message');
      return;
    }

    const loadingToast = toast.loading('Sending announcement...');
    
    setTimeout(() => {
      const newAnnouncement = {
        id: announcements.length + 1,
        title: announcementForm.title,
        message: announcementForm.message,
        priority: announcementForm.priority,
        date: new Date().toISOString().split('T')[0]
      };
      
      setAnnouncements([...announcements, newAnnouncement]);
      setAnnouncementForm({ title: '', message: '', priority: 'normal', audience: 'all' });
      setActiveModal(null);
      
      toast.dismiss(loadingToast);
      toast.success(`Announcement "${announcementForm.title}" sent successfully to ${announcementForm.audience}!`, {
        duration: 4000,
        icon: '📢',
      });
    }, 1500);
  };

  const handleGenerateReport = () => {
    const loadingToast = toast.loading('Generating comprehensive school report...');
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Report generated successfully! Check your downloads folder.', {
        duration: 5000,
        icon: '📊',
      });
    }, 2000);
  };

  const handleBackupData = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Backup School Data',
      message: 'This will create a complete backup of all school data. This process may take several minutes. Do you want to continue?',
      type: 'info',
      onConfirm: () => {
        const loadingToast = toast.loading('Creating data backup...');
        
        setTimeout(() => {
          toast.dismiss(loadingToast);
          toast.success('Data backup completed successfully! Backup saved to secure storage.', {
            duration: 5000,
            icon: '💾',
          });
        }, 3000);
      }
    });
  };

  const handleDeleteStudent = (student: any) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Student',
      message: `Are you sure you want to delete ${student.name}? This action cannot be undone and will remove all associated records.`,
      type: 'danger',
      onConfirm: () => {
        const loadingToast = toast.loading('Deleting student...');
        
        setTimeout(() => {
          setStudents(students.filter(s => s.id !== student.id));
          toast.dismiss(loadingToast);
          toast.success(`${student.name} has been successfully removed from the system.`, {
            duration: 4000,
            icon: '🗑️',
          });
        }, 1000);
      }
    });
  };

  const handleDeleteTeacher = (teacher: any) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Teacher',
      message: `Are you sure you want to delete ${teacher.name}? This will affect all classes and students assigned to this teacher.`,
      type: 'danger',
      onConfirm: () => {
        const loadingToast = toast.loading('Removing teacher...');
        
        setTimeout(() => {
          setTeachers(teachers.filter(t => t.id !== teacher.id));
          toast.dismiss(loadingToast);
          toast.success(`${teacher.name} has been successfully removed from the system.`, {
            duration: 4000,
            icon: '🗑️',
          });
        }, 1000);
      }
    });
  };

  const handleResolveAlert = (alert: any) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Resolve Alert',
      message: `Mark this alert as resolved: "${alert.message}"?`,
      type: 'info',
      onConfirm: () => {
        const loadingToast = toast.loading('Resolving alert...');
        
        setTimeout(() => {
          setAlerts(alerts.filter(a => a.id !== alert.id));
          toast.dismiss(loadingToast);
          toast.success('Alert has been successfully resolved!', {
            duration: 3000,
            icon: '✅',
          });
        }, 800);
      }
    });
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subjects.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header with Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-indigo-100 mt-2">School Administrator</p>
            <p className="text-indigo-100">Manage your school efficiently with comprehensive tools.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                onClick={action.action}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <action.icon className="h-4 w-4 mr-2" />
                {action.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={stat.action}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-md p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="text-sm text-green-600 font-medium">{stat.change}</div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Target: {stat.target}</span>
              <TrendingUp className={`h-4 w-4 ${
                stat.trend === 'up' ? 'text-green-500' : 'text-gray-400'
              }`} />
            </div>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Priority Alerts</h3>
            <button 
              onClick={() => setActiveModal('alerts')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Manage All Alerts
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.priority === 'high' ? 'bg-red-50 border-red-500' :
                alert.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      alert.priority === 'high' ? 'text-red-500' :
                      alert.priority === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{alert.time}</span>
                        <span>Assigned to: {alert.assignedTo}</span>
                        <span className={`px-2 py-1 rounded ${
                          alert.category === 'academic' ? 'bg-blue-100 text-blue-700' :
                          alert.category === 'finance' ? 'bg-green-100 text-green-700' :
                          alert.category === 'attendance' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {alert.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleResolveAlert(alert)}
                      className="px-3 py-1 rounded text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                    >
                      Resolve
                    </button>
                    <button 
                      onClick={() => toast.success('Alert assigned successfully!')}
                      className="px-3 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Grade Distribution & Performance</h3>
            <div className="flex space-x-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="term">This Term</option>
              </select>
              <button 
                onClick={handleGenerateReport}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <Download className="h-4 w-4 inline mr-1" />
                Export
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {gradeDistribution.map((grade, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg">{grade.grade}</h4>
                    <p className="text-sm text-gray-600">{grade.teachers} teachers assigned</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-gray-900">{grade.students}/{grade.capacity}</p>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${(grade.students / grade.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Avg Grade</p>
                    <p className="text-lg font-semibold text-gray-900">{grade.avgGrade}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Attendance</p>
                    <p className="text-lg font-semibold text-gray-900">{grade.attendance}%</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-lg font-semibold text-gray-900">{grade.revenue}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="text-lg font-semibold text-gray-900">{Math.round((grade.students / grade.capacity) * 100)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  activity.type === 'enrollment' ? 'bg-blue-500' :
                  activity.type === 'staff' ? 'bg-green-500' :
                  activity.type === 'payment' ? 'bg-yellow-500' :
                  activity.type === 'academic' ? 'bg-purple-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time} • by {activity.user}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      activity.impact === 'positive' ? 'bg-green-100 text-green-700' :
                      activity.impact === 'negative' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {activity.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'addStudent' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Student</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Student Name *"
                value={newStudentForm.name}
                onChange={(e) => setNewStudentForm({...newStudentForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email *"
                value={newStudentForm.email}
                onChange={(e) => setNewStudentForm({...newStudentForm, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newStudentForm.grade}
                onChange={(e) => setNewStudentForm({...newStudentForm, grade: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Grade *</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
              <input
                type="text"
                placeholder="Parent Name"
                value={newStudentForm.parentName}
                onChange={(e) => setNewStudentForm({...newStudentForm, parentName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Parent Email"
                value={newStudentForm.parentEmail}
                onChange={(e) => setNewStudentForm({...newStudentForm, parentEmail: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newStudentForm.phone}
                onChange={(e) => setNewStudentForm({...newStudentForm, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleAddStudent}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Student
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'addTeacher' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Teacher</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Teacher Name *"
                value={newTeacherForm.name}
                onChange={(e) => setNewTeacherForm({...newTeacherForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Email *"
                value={newTeacherForm.email}
                onChange={(e) => setNewTeacherForm({...newTeacherForm, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Subjects (comma separated) *"
                value={newTeacherForm.subjects}
                onChange={(e) => setNewTeacherForm({...newTeacherForm, subjects: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Qualification"
                value={newTeacherForm.qualification}
                onChange={(e) => setNewTeacherForm({...newTeacherForm, qualification: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Years of Experience"
                value={newTeacherForm.experience}
                onChange={(e) => setNewTeacherForm({...newTeacherForm, experience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newTeacherForm.phone}
                onChange={(e) => setNewTeacherForm({...newTeacherForm, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleAddTeacher}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Teacher
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'announcement' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Send Announcement</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Announcement Title *"
                value={announcementForm.title}
                onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Message *"
                rows={4}
                value={announcementForm.message}
                onChange={(e) => setAnnouncementForm({...announcementForm, message: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={announcementForm.priority}
                onChange={(e) => setAnnouncementForm({...announcementForm, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <select
                value={announcementForm.audience}
                onChange={(e) => setAnnouncementForm({...announcementForm, audience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Users</option>
                <option value="students">Students Only</option>
                <option value="teachers">Teachers Only</option>
                <option value="parents">Parents Only</option>
              </select>
              <div className="flex space-x-3">
                <button
                  onClick={handleSendAnnouncement}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Send Announcement
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'students' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Manage Students</h3>
                <button onClick={() => setActiveModal(null)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={() => setActiveModal('addStudent')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  Add Student
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Grade</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Fees</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">{student.name}</td>
                        <td className="py-3 px-4">{student.grade}</td>
                        <td className="py-3 px-4">{student.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            student.fees === 'paid' ? 'bg-green-100 text-green-700' :
                            student.fees === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {student.fees}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => toast.success('Edit functionality coming soon!')}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteStudent(student)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'teachers' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Manage Teachers</h3>
                <button onClick={() => setActiveModal(null)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search teachers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={() => setActiveModal('addTeacher')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  Add Teacher
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Subjects</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">{teacher.name}</td>
                        <td className="py-3 px-4">{teacher.subjects}</td>
                        <td className="py-3 px-4">{teacher.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            teacher.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {teacher.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => toast.success('Edit functionality coming soon!')}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteTeacher(teacher)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
      />
    </div>
  );
};

export default AdminDashboard;