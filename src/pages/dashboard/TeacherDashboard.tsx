import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../../components/ConfirmDialog';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  BarChart3,
  FileText,
  Award,
  Target,
  Plus,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Send,
  Upload,
  Save,
  X,
  Search,
  Star,
  Bell,
  Settings,
  Printer,
  Share,
  RefreshCw,
  GraduationCap,
  ClipboardList,
  PieChart,
  TrendingDown
} from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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
    type: 'info'
  });

  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    dueDate: '',
    points: '',
    type: 'homework'
  });

  const [gradeForm, setGradeForm] = useState({
    student: '',
    assignment: '',
    grade: '',
    points: '',
    feedback: ''
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    classes: [],
    priority: 'normal'
  });

  const stats = [
    { name: 'Total Students', value: '156', icon: Users, color: 'bg-blue-500', change: '+3' },
    { name: 'Classes Today', value: '6', icon: BookOpen, color: 'bg-green-500', change: '0' },
    { name: 'Pending Grades', value: '23', icon: TrendingUp, color: 'bg-yellow-500', change: '-5' },
    { name: 'Messages', value: '8', icon: MessageSquare, color: 'bg-purple-500', change: '+2' },
  ];

  const [classPerformance, setClassPerformance] = useState([
    { 
      class: 'Grade 10A - Mathematics', 
      students: 28, 
      avgGrade: 'B+', 
      attendance: 94,
      assignments: { completed: 25, pending: 3 },
      trend: 'up',
      nextClass: '2024-03-21 08:00',
      recentTopic: 'Calculus - Derivatives'
    },
    { 
      class: 'Grade 10B - Mathematics', 
      students: 26, 
      avgGrade: 'B', 
      attendance: 91,
      assignments: { completed: 22, pending: 4 },
      trend: 'stable',
      nextClass: '2024-03-21 09:30',
      recentTopic: 'Algebra Review'
    },
    { 
      class: 'Grade 9A - Physics', 
      students: 24, 
      avgGrade: 'A-', 
      attendance: 96,
      assignments: { completed: 23, pending: 1 },
      trend: 'up',
      nextClass: '2024-03-21 11:00',
      recentTopic: 'Electromagnetic Induction'
    },
    { 
      class: 'Grade 9B - Physics', 
      students: 25, 
      avgGrade: 'B+', 
      attendance: 89,
      assignments: { completed: 20, pending: 5 },
      trend: 'down',
      nextClass: '2024-03-21 13:00',
      recentTopic: 'Motion and Forces'
    },
  ]);

  const [todayClasses, setTodayClasses] = useState([
    { 
      time: '08:00', 
      subject: 'Mathematics', 
      grade: 'Grade 10A', 
      room: 'Room 101', 
      students: 28,
      type: 'Lesson',
      topic: 'Calculus - Derivatives',
      status: 'upcoming',
      materials: ['Textbook Ch. 12', 'Graphing Calculator', 'Worksheet'],
      objectives: ['Understand derivative concepts', 'Apply derivative rules']
    },
    { 
      time: '09:30', 
      subject: 'Mathematics', 
      grade: 'Grade 10B', 
      room: 'Room 101', 
      students: 26,
      type: 'Review',
      topic: 'Algebra Review',
      status: 'current',
      materials: ['Review Sheets', 'Calculator'],
      objectives: ['Review algebraic concepts', 'Prepare for test']
    },
    { 
      time: '11:00', 
      subject: 'Physics', 
      grade: 'Grade 9A', 
      room: 'Lab 2', 
      students: 24,
      type: 'Lab',
      topic: 'Motion Experiments',
      status: 'upcoming',
      materials: ['Lab Equipment', 'Safety Goggles', 'Lab Manual'],
      objectives: ['Measure motion', 'Analyze data', 'Draw conclusions']
    },
    { 
      time: '13:00', 
      subject: 'Physics', 
      grade: 'Grade 9B', 
      room: 'Lab 2', 
      students: 25,
      type: 'Lab',
      topic: 'Motion Experiments',
      status: 'upcoming',
      materials: ['Lab Equipment', 'Safety Goggles', 'Lab Manual'],
      objectives: ['Measure motion', 'Analyze data', 'Draw conclusions']
    },
    { 
      time: '14:30', 
      subject: 'Mathematics', 
      grade: 'Grade 8A', 
      room: 'Room 101', 
      students: 30,
      type: 'Lesson',
      topic: 'Quadratic Equations',
      status: 'upcoming',
      materials: ['Textbook', 'Graphing Paper'],
      objectives: ['Solve quadratic equations', 'Graph parabolas']
    },
  ]);

  const [recentSubmissions, setRecentSubmissions] = useState([
    { 
      id: 1,
      student: 'John Doe', 
      assignment: 'Calculus Test', 
      subject: 'Mathematics', 
      submitted: '2024-03-15',
      score: null,
      status: 'pending',
      grade: null,
      class: 'Grade 10A',
      submissionTime: '14:30'
    },
    { 
      id: 2,
      student: 'Jane Smith', 
      assignment: 'Physics Lab Report', 
      subject: 'Physics', 
      submitted: '2024-03-14',
      score: '87/100',
      status: 'graded',
      grade: 'B+',
      class: 'Grade 9A',
      submissionTime: '16:45'
    },
    { 
      id: 3,
      student: 'Mike Johnson', 
      assignment: 'Problem Set 7', 
      subject: 'Mathematics', 
      submitted: '2024-03-13',
      score: null,
      status: 'pending',
      grade: null,
      class: 'Grade 10B',
      submissionTime: '23:59'
    },
    { 
      id: 4,
      student: 'Sarah Wilson', 
      assignment: 'Mechanics Quiz', 
      subject: 'Physics', 
      submitted: '2024-03-12',
      score: '88/100',
      status: 'graded',
      grade: 'B+',
      class: 'Grade 9B',
      submissionTime: '15:20'
    },
  ]);

  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    { 
      id: 1,
      task: 'Grade Midterm Exams', 
      subject: 'Mathematics', 
      deadline: '2024-03-25', 
      priority: 'high',
      progress: 60,
      description: '45 exams remaining',
      class: 'All Classes'
    },
    { 
      id: 2,
      task: 'Submit Lesson Plans', 
      subject: 'Physics', 
      deadline: '2024-03-22', 
      priority: 'medium',
      progress: 80,
      description: 'Week 12-14 plans',
      class: 'Grade 9A, 9B'
    },
    { 
      id: 3,
      task: 'Parent Conference Prep', 
      subject: 'General', 
      deadline: '2024-03-20', 
      priority: 'low',
      progress: 30,
      description: 'Prepare student reports',
      class: 'All Classes'
    },
  ]);

  const [studentAlerts, setStudentAlerts] = useState([
    { 
      id: 1,
      student: 'Alex Thompson', 
      class: 'Grade 10A', 
      issue: 'Declining performance', 
      severity: 'high',
      lastGrade: 'D+',
      action: 'Schedule meeting',
      details: 'Math grades dropped from B+ to D+ over 3 weeks'
    },
    { 
      id: 2,
      student: 'Emma Davis', 
      class: 'Grade 9B', 
      issue: 'Frequent absences', 
      severity: 'medium',
      attendance: '78%',
      action: 'Contact parent',
      details: 'Missed 6 out of last 10 physics classes'
    },
    { 
      id: 3,
      student: 'Ryan Miller', 
      class: 'Grade 10B', 
      issue: 'Missing assignments', 
      severity: 'medium',
      missing: '3 assignments',
      action: 'Send reminder',
      details: 'Has not submitted last 3 homework assignments'
    },
  ]);

  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Calculus Test', class: 'Grade 10A', dueDate: '2024-03-25', submissions: 28, total: 28 },
    { id: 2, title: 'Physics Lab Report', class: 'Grade 9A', dueDate: '2024-03-22', submissions: 22, total: 24 },
    { id: 3, title: 'Problem Set 8', class: 'Grade 10B', dueDate: '2024-03-20', submissions: 20, total: 26 },
  ]);

  // Action handlers
  const handleCreateAssignment = () => {
    if (!assignmentForm.title || !assignmentForm.class || !assignmentForm.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Creating assignment...');
    
    setTimeout(() => {
      const newAssignment = {
        id: assignments.length + 1,
        title: assignmentForm.title,
        class: assignmentForm.class,
        dueDate: assignmentForm.dueDate,
        submissions: 0,
        total: 25 // Default class size
      };
      
      setAssignments([...assignments, newAssignment]);
      setAssignmentForm({
        title: '', description: '', subject: '', class: '', dueDate: '', points: '', type: 'homework'
      });
      setActiveModal(null);
      
      toast.dismiss(loadingToast);
      toast.success('Assignment created successfully!', {
        duration: 4000,
        icon: '📝',
      });
    }, 1500);
  };

  const handleGradeSubmission = () => {
    if (!gradeForm.student || !gradeForm.grade) {
      toast.error('Please fill in required fields');
      return;
    }

    const loadingToast = toast.loading('Saving grade...');
    
    setTimeout(() => {
      setRecentSubmissions(recentSubmissions.map(submission => 
        submission.id === parseInt(gradeForm.assignment) 
          ? { ...submission, score: gradeForm.points, grade: gradeForm.grade, status: 'graded' }
          : submission
      ));
      
      setGradeForm({ student: '', assignment: '', grade: '', points: '', feedback: '' });
      setActiveModal(null);
      
      toast.dismiss(loadingToast);
      toast.success('Grade saved successfully!', {
        duration: 4000,
        icon: '✅',
      });
    }, 1500);
  };

  const handleSendAnnouncement = () => {
    if (!announcementForm.title || !announcementForm.message) {
      toast.error('Please fill in title and message');
      return;
    }

    const loadingToast = toast.loading('Sending announcement...');
    
    setTimeout(() => {
      setAnnouncementForm({ title: '', message: '', classes: [], priority: 'normal' });
      setActiveModal(null);
      
      toast.dismiss(loadingToast);
      toast.success('Announcement sent successfully!', {
        duration: 4000,
        icon: '📢',
      });
    }, 1500);
  };

  const handleResolveAlert = (alertId: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Resolve Student Alert',
      message: 'Mark this alert as resolved? This will remove it from your dashboard.',
      type: 'info',
      onConfirm: () => {
        setStudentAlerts(studentAlerts.filter(alert => alert.id !== alertId));
        toast.success('Alert resolved successfully!');
      }
    });
  };

  const handleExportGrades = () => {
    const loadingToast = toast.loading('Exporting gradebook...');
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Gradebook exported successfully!', {
        duration: 4000,
        icon: '📊',
      });
    }, 2000);
  };

  const handlePrintSchedule = () => {
    toast.success('Schedule sent to printer!', {
      duration: 3000,
      icon: '🖨️',
    });
  };

  const filteredSubmissions = recentSubmissions.filter(submission => 
    submission.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.assignment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header with Quick Actions */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-green-100 mt-2">
              Teaching: {user?.subjects?.join(', ')}
            </p>
            <p className="text-green-100">Ready to inspire young minds today?</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setActiveModal('createAssignment')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </button>
            <button 
              onClick={() => setActiveModal('gradeSubmissions')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Grade Work
            </button>
            <button 
              onClick={() => setActiveModal('sendAnnouncement')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </button>
            <button 
              onClick={handleExportGrades}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export Grades
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-md p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
              {stat.change !== '0' && (
                <div className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Class Performance Overview */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Class Performance Overview</h3>
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
                onClick={handleExportGrades}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <Download className="h-4 w-4 inline mr-1" />
                Export
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {classPerformance.map((classData, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{classData.class}</h4>
                    <p className="text-sm text-gray-600">{classData.students} students</p>
                    <p className="text-xs text-gray-500 mt-1">Next: {classData.nextClass}</p>
                    <p className="text-xs text-gray-500">Topic: {classData.recentTopic}</p>
                  </div>
                  <div className={`flex items-center text-sm ${
                    classData.trend === 'up' ? 'text-green-600' : 
                    classData.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {classData.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> :
                     classData.trend === 'down' ? <TrendingDown className="h-4 w-4 mr-1" /> :
                     <div className="w-4 h-4 mr-1" />}
                    {classData.avgGrade}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Attendance</p>
                    <p className="text-lg font-semibold text-gray-900">{classData.attendance}%</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-lg font-semibold text-gray-900">{classData.assignments.completed}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-lg font-semibold text-gray-900">{classData.assignments.pending}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Today's Classes</h3>
              <button
                onClick={handlePrintSchedule}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <Printer className="h-4 w-4 inline mr-1" />
                Print
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {todayClasses.map((class_, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  class_.status === 'current' ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{class_.subject} - {class_.grade}</p>
                      <p className="text-sm text-gray-600">{class_.topic}</p>
                      <p className="text-xs text-gray-500 mt-1">Room: {class_.room} • {class_.students} students</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{class_.time}</div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        class_.type === 'Lab' ? 'bg-blue-100 text-blue-700' :
                        class_.type === 'Review' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {class_.type}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-600 mb-1">Materials: {class_.materials.join(', ')}</p>
                    <p className="text-xs text-gray-600">Objectives: {class_.objectives.join(', ')}</p>
                  </div>
                  {class_.status === 'current' && (
                    <div className="mt-3 flex space-x-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                        Take Attendance
                      </button>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                        Start Lesson
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Recent Submissions</h3>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={() => setActiveModal('gradeSubmissions')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Grade All
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-gray-900">{submission.student}</p>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        submission.status === 'graded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {submission.status === 'graded' ? submission.grade : 'Pending'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{submission.assignment}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{submission.class} • {submission.submitted}</span>
                      <span className="text-sm text-gray-600">{submission.score || 'Not graded'}</span>
                    </div>
                  </div>
                  {submission.status === 'pending' && (
                    <button
                      onClick={() => {
                        setGradeForm({
                          ...gradeForm,
                          student: submission.student,
                          assignment: submission.id.toString()
                        });
                        setActiveModal('gradeSubmission');
                      }}
                      className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Grade
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Student Alerts */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Student Alerts</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {studentAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{alert.student} - {alert.class}</p>
                    <p className="text-sm text-gray-600">{alert.issue}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.details}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {alert.lastGrade && `Last Grade: ${alert.lastGrade}`}
                      {alert.attendance && `Attendance: ${alert.attendance}`}
                      {alert.missing && `Missing: ${alert.missing}`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleResolveAlert(alert.id)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                        'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                    >
                      {alert.action}
                    </button>
                    <button 
                      onClick={() => handleResolveAlert(alert.id)}
                      className="px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      deadline.priority === 'high' ? 'bg-red-500' :
                      deadline.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{deadline.task}</p>
                      <p className="text-sm text-gray-600">{deadline.subject} • {deadline.description}</p>
                      <p className="text-xs text-gray-500">{deadline.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Due: {deadline.deadline}</div>
                    <div className="text-xs text-gray-500">{deadline.progress}% complete</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      deadline.priority === 'high' ? 'bg-red-500' :
                      deadline.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${deadline.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'createAssignment' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Create Assignment</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Assignment Title *"
                value={assignmentForm.title}
                onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                placeholder="Description"
                value={assignmentForm.description}
                onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={assignmentForm.class}
                onChange={(e) => setAssignmentForm({...assignmentForm, class: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Class *</option>
                <option value="Grade 10A">Grade 10A - Mathematics</option>
                <option value="Grade 10B">Grade 10B - Mathematics</option>
                <option value="Grade 9A">Grade 9A - Physics</option>
                <option value="Grade 9B">Grade 9B - Physics</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={assignmentForm.dueDate}
                  onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  placeholder="Points"
                  value={assignmentForm.points}
                  onChange={(e) => setAssignmentForm({...assignmentForm, points: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <select
                value={assignmentForm.type}
                onChange={(e) => setAssignmentForm({...assignmentForm, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="homework">Homework</option>
                <option value="quiz">Quiz</option>
                <option value="test">Test</option>
                <option value="project">Project</option>
                <option value="lab">Lab Report</option>
              </select>
              <div className="flex space-x-3">
                <button
                  onClick={handleCreateAssignment}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Create Assignment
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

      {activeModal === 'gradeSubmission' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Grade Submission</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Student Name"
                value={gradeForm.student}
                onChange={(e) => setGradeForm({...gradeForm, student: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={gradeForm.grade}
                  onChange={(e) => setGradeForm({...gradeForm, grade: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Grade *</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
                <input
                  type="text"
                  placeholder="Points (e.g., 85/100)"
                  value={gradeForm.points}
                  onChange={(e) => setGradeForm({...gradeForm, points: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <textarea
                placeholder="Feedback (optional)"
                value={gradeForm.feedback}
                onChange={(e) => setGradeForm({...gradeForm, feedback: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleGradeSubmission}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Save Grade
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

      {activeModal === 'sendAnnouncement' && (
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                placeholder="Message *"
                rows={4}
                value={announcementForm.message}
                onChange={(e) => setAnnouncementForm({...announcementForm, message: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={announcementForm.priority}
                onChange={(e) => setAnnouncementForm({...announcementForm, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
              <div className="flex space-x-3">
                <button
                  onClick={handleSendAnnouncement}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
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

export default TeacherDashboard;