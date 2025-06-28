import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../../components/ConfirmDialog';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Award, 
  MessageSquare,
  AlertTriangle,
  Clock,
  Target,
  Star,
  Download,
  Bell,
  Eye,
  CheckCircle,
  Phone,
  Mail,
  Video,
  FileText,
  CreditCard,
  DollarSign,
  Send,
  X,
  Plus,
  Edit,
  Search,
  Filter,
  Printer,
  Share,
  RefreshCw,
  User,
  GraduationCap,
  Heart,
  Shield
} from 'lucide-react';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
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

  const [messageForm, setMessageForm] = useState({
    to: '',
    subject: '',
    message: '',
    child: ''
  });

  const [meetingForm, setMeetingForm] = useState({
    teacher: '',
    child: '',
    date: '',
    time: '',
    reason: '',
    type: 'in-person'
  });

  const stats = [
    { name: 'Children', value: '2', icon: Users, color: 'bg-blue-500', change: '0' },
    { name: 'Avg. Attendance', value: '95%', icon: Calendar, color: 'bg-green-500', change: '+2%' },
    { name: 'Unread Messages', value: '3', icon: MessageSquare, color: 'bg-yellow-500', change: '+1' },
    { name: 'Upcoming Events', value: '5', icon: BookOpen, color: 'bg-purple-500', change: '+2' },
  ];

  const [childrenProgress, setChildrenProgress] = useState([
    {
      id: 1,
      name: 'John Doe',
      grade: 'Grade 10',
      gpa: '3.8',
      attendance: '96%',
      behavior: 'Excellent',
      nextExam: '2024-03-25',
      photo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150',
      recentGrades: [
        { subject: 'Mathematics', grade: 'A', date: '2024-03-15', trend: 'up', points: '95/100' },
        { subject: 'Physics', grade: 'B+', date: '2024-03-12', trend: 'stable', points: '87/100' },
        { subject: 'English', grade: 'A-', date: '2024-03-10', trend: 'up', points: '92/100' },
        { subject: 'Chemistry', grade: 'A', date: '2024-03-08', trend: 'up', points: '96/100' },
      ],
      strengths: ['Mathematics', 'Science', 'Problem Solving'],
      improvements: ['Time Management', 'Study Habits'],
      teacherComments: 'John shows excellent progress in STEM subjects and is well-prepared for university applications. His analytical skills are outstanding.',
      upcomingAssignments: [
        { subject: 'Biology', title: 'Research Project', dueDate: '2024-03-25', status: 'in-progress' },
        { subject: 'History', title: 'Essay', dueDate: '2024-03-22', status: 'not-started' }
      ],
      extracurriculars: ['Math Club', 'Science Fair', 'Debate Team']
    },
    {
      id: 2,
      name: 'Jane Doe',
      grade: 'Grade 7',
      gpa: '3.9',
      attendance: '98%',
      behavior: 'Outstanding',
      nextExam: '2024-03-22',
      photo: 'https://images.pexels.com/photos/3184337/pexels-photo-3184337.jpeg?auto=compress&cs=tinysrgb&w=150',
      recentGrades: [
        { subject: 'Mathematics', grade: 'A', date: '2024-03-14', trend: 'stable', points: '94/100' },
        { subject: 'Science', grade: 'A', date: '2024-03-11', trend: 'up', points: '98/100' },
        { subject: 'English', grade: 'A-', date: '2024-03-09', trend: 'up', points: '91/100' },
        { subject: 'Social Studies', grade: 'A+', date: '2024-03-07', trend: 'up', points: '99/100' },
      ],
      strengths: ['Leadership', 'Communication', 'Academic Excellence', 'Creativity'],
      improvements: ['Sports Participation', 'Peer Collaboration'],
      teacherComments: 'Jane is an exceptional student with strong leadership qualities and consistent academic performance. She actively participates in class discussions.',
      upcomingAssignments: [
        { subject: 'Science', title: 'Lab Report', dueDate: '2024-03-20', status: 'completed' },
        { subject: 'English', title: 'Book Report', dueDate: '2024-03-24', status: 'in-progress' }
      ],
      extracurriculars: ['Student Council', 'Drama Club', 'Environmental Club']
    }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    { 
      id: 1,
      event: 'Parent-Teacher Conference', 
      date: '2024-03-25', 
      time: '14:00', 
      child: 'John Doe',
      type: 'meeting',
      location: 'Room 101',
      teacher: 'Mrs. Johnson',
      description: 'Discuss academic progress and university preparation'
    },
    { 
      id: 2,
      event: 'Science Fair', 
      date: '2024-03-28', 
      time: '10:00', 
      child: 'Jane Doe',
      type: 'event',
      location: 'School Hall',
      description: 'Jane presenting her environmental project'
    },
    { 
      id: 3,
      event: 'Sports Day', 
      date: '2024-04-02', 
      time: '09:00', 
      child: 'Both',
      type: 'event',
      location: 'Sports Field',
      description: 'Annual sports competition and family day'
    },
    { 
      id: 4,
      event: 'Grade 10 University Fair', 
      date: '2024-04-05', 
      time: '15:00', 
      child: 'John Doe',
      type: 'academic',
      location: 'School Hall',
      description: 'University representatives and application guidance'
    },
    { 
      id: 5,
      event: 'Mid-Term Exams Begin', 
      date: '2024-04-08', 
      time: '08:00', 
      child: 'Both',
      type: 'exam',
      location: 'Various Rooms',
      description: 'Exam schedule and preparation guidelines available'
    },
  ]);

  const [recentMessages, setRecentMessages] = useState([
    { 
      id: 1,
      from: 'Mrs. Johnson (Math Teacher)', 
      subject: 'John\'s Excellent Progress', 
      date: '2024-03-15', 
      read: false,
      priority: 'normal',
      preview: 'John has shown excellent improvement in calculus and is ready for advanced topics...',
      child: 'John Doe',
      type: 'teacher'
    },
    { 
      id: 2,
      from: 'School Administration', 
      subject: 'Upcoming Events Reminder', 
      date: '2024-03-14', 
      read: true,
      priority: 'low',
      preview: 'Don\'t forget about the upcoming parent-teacher conference and science fair...',
      child: 'Both',
      type: 'admin'
    },
    { 
      id: 3,
      from: 'Ms. Davis (Science Teacher)', 
      subject: 'Jane\'s Science Project Excellence', 
      date: '2024-03-13', 
      read: false,
      priority: 'high',
      preview: 'Jane\'s science fair project is exceptional and shows great environmental awareness...',
      child: 'Jane Doe',
      type: 'teacher'
    },
    { 
      id: 4,
      from: 'Principal\'s Office', 
      subject: 'Grade 10 University Preparation', 
      date: '2024-03-12', 
      read: true,
      priority: 'high',
      preview: 'Important information about university applications and preparation timeline...',
      child: 'John Doe',
      type: 'admin'
    },
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'academic',
      child: 'John Doe',
      message: 'Physics assignment due tomorrow',
      severity: 'medium',
      time: '2 hours ago',
      actionRequired: true
    },
    {
      id: 2,
      type: 'achievement',
      child: 'Jane Doe',
      message: 'Received Student of the Month award',
      severity: 'positive',
      time: '1 day ago',
      actionRequired: false
    },
    {
      id: 3,
      type: 'attendance',
      child: 'John Doe',
      message: 'Perfect attendance this month',
      severity: 'positive',
      time: '3 days ago',
      actionRequired: false
    },
    {
      id: 4,
      type: 'fee',
      child: 'Both',
      message: 'Term 2 fees due in 5 days',
      severity: 'high',
      time: '1 hour ago',
      actionRequired: true
    }
  ]);

  const [paymentInfo, setPaymentInfo] = useState([
    {
      id: 1,
      child: 'John Doe',
      term: 'Term 2, 2024',
      amount: 'KES 75,000',
      dueDate: '2024-04-01',
      status: 'pending',
      description: 'Grade 10 fees including university prep programs',
      breakdown: {
        tuition: 'KES 60,000',
        meals: 'KES 8,000',
        activities: 'KES 5,000',
        transport: 'KES 2,000'
      }
    },
    {
      id: 2,
      child: 'Jane Doe',
      term: 'Term 2, 2024',
      amount: 'KES 65,000',
      dueDate: '2024-04-01',
      status: 'paid',
      description: 'Grade 7 fees including extracurricular activities',
      breakdown: {
        tuition: 'KES 50,000',
        meals: 'KES 8,000',
        activities: 'KES 5,000',
        transport: 'KES 2,000'
      }
    }
  ]);

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      teacher: 'Mrs. Johnson',
      subject: 'Mathematics',
      child: 'John Doe',
      date: '2024-03-25',
      time: '14:00',
      type: 'scheduled',
      reason: 'Discuss university preparation',
      status: 'confirmed'
    },
    {
      id: 2,
      teacher: 'Ms. Davis',
      subject: 'Science',
      child: 'Jane Doe',
      date: '2024-03-20',
      time: '15:30',
      type: 'requested',
      reason: 'Science fair project discussion',
      status: 'pending'
    }
  ]);

  // Action handlers
  const handleSendMessage = () => {
    if (!messageForm.to || !messageForm.subject || !messageForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Sending message...');
    
    setTimeout(() => {
      setMessageForm({ to: '', subject: '', message: '', child: '' });
      setActiveModal(null);
      
      toast.dismiss(loadingToast);
      toast.success('Message sent successfully!', {
        duration: 4000,
        icon: '📧',
      });
    }, 1500);
  };

  const handleScheduleMeeting = () => {
    if (!meetingForm.teacher || !meetingForm.date || !meetingForm.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Scheduling meeting...');
    
    setTimeout(() => {
      const newMeeting = {
        id: meetings.length + 1,
        teacher: meetingForm.teacher,
        subject: 'General',
        child: meetingForm.child,
        date: meetingForm.date,
        time: meetingForm.time,
        type: meetingForm.type,
        reason: meetingForm.reason,
        status: 'pending'
      };
      
      setMeetings([...meetings, newMeeting]);
      setMeetingForm({ teacher: '', child: '', date: '', time: '', reason: '', type: 'in-person' });
      setActiveModal(null);
      
      toast.dismiss(loadingToast);
      toast.success('Meeting request sent successfully!', {
        duration: 4000,
        icon: '📅',
      });
    }, 1500);
  };

  const handlePayFees = (paymentId: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Process Payment',
      message: 'You will be redirected to the secure payment portal. Continue with payment?',
      type: 'info',
      onConfirm: () => {
        const loadingToast = toast.loading('Processing payment...');
        
        setTimeout(() => {
          setPaymentInfo(paymentInfo.map(payment => 
            payment.id === paymentId ? { ...payment, status: 'paid' } : payment
          ));
          
          toast.dismiss(loadingToast);
          toast.success('Payment processed successfully!', {
            duration: 4000,
            icon: '💳',
          });
        }, 2000);
      }
    });
  };

  const handleDownloadReport = (childName: string) => {
    const loadingToast = toast.loading(`Generating ${childName}'s academic report...`);
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success(`${childName}'s report downloaded successfully!`, {
        duration: 4000,
        icon: '📊',
      });
    }, 2000);
  };

  const handleResolveAlert = (alertId: number) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    toast.success('Alert resolved!');
  };

  const filteredMessages = recentMessages.filter(message => 
    selectedChild === 'all' || message.child === selectedChild || message.child === 'Both'
  );

  const filteredEvents = upcomingEvents.filter(event => 
    selectedChild === 'all' || event.child === selectedChild || event.child === 'Both'
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header with Quick Actions */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-purple-100 mt-2">
              Parent of: {user?.children?.join(', ')}
            </p>
            <p className="text-purple-100">Stay connected with your children's education journey.</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveModal('downloadReports')}
              className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="h-4 w-4 inline mr-2" />
              Download Reports
            </button>
            <button
              onClick={() => setActiveModal('scheduleMeeting')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Schedule Meeting
            </button>
            <button
              onClick={() => setActiveModal('messages')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative"
            >
              <Bell className="h-4 w-4 inline mr-2" />
              Notifications
              {alerts.filter(a => a.actionRequired).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {alerts.filter(a => a.actionRequired).length}
                </span>
              )}
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

      {/* Alerts Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'positive' ? 'bg-green-50 border-green-500' :
                alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{alert.child}</p>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                  <div className="flex space-x-2">
                    {alert.actionRequired && (
                      <button
                        onClick={() => {
                          if (alert.type === 'fee') {
                            setActiveModal('payments');
                          } else {
                            handleResolveAlert(alert.id);
                          }
                        }}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                          'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        {alert.type === 'fee' ? 'Pay Now' : 'Take Action'}
                      </button>
                    )}
                    <button
                      onClick={() => handleResolveAlert(alert.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Children Progress */}
      <div className="space-y-6">
        {childrenProgress.map((child) => (
          <div key={child.id} className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={child.photo}
                    alt={child.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{child.name} - {child.grade}</h3>
                    <p className="text-sm text-gray-600">Next Exam: {child.nextExam}</p>
                  </div>
                </div>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-600">GPA</p>
                    <p className="font-semibold text-lg">{child.gpa}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Attendance</p>
                    <p className="font-semibold text-lg">{child.attendance}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Behavior</p>
                    <p className="font-semibold text-lg text-green-600">{child.behavior}</p>
                  </div>
                  <button
                    onClick={() => handleDownloadReport(child.name)}
                    className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                  >
                    <Download className="h-4 w-4 inline mr-1" />
                    Report
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Grades */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Recent Grades</h4>
                  <div className="space-y-3">
                    {child.recentGrades.map((grade, gradeIndex) => (
                      <div key={gradeIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{grade.subject}</p>
                          <p className="text-xs text-gray-500">{grade.date} • {grade.points}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                            grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {grade.grade}
                          </div>
                          <TrendingUp className={`h-4 w-4 ${
                            grade.trend === 'up' ? 'text-green-500' :
                            grade.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths & Areas for Improvement */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Performance Insights</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-2">Strengths</p>
                      <div className="space-y-1">
                        {child.strengths.map((strength, strengthIndex) => (
                          <div key={strengthIndex} className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-700">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-yellow-700 mb-2">Areas for Improvement</p>
                      <div className="space-y-1">
                        {child.improvements.map((improvement, improvementIndex) => (
                          <div key={improvementIndex} className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-gray-700">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-700 mb-2">Extracurriculars</p>
                      <div className="flex flex-wrap gap-1">
                        {child.extracurriculars.map((activity, activityIndex) => (
                          <span key={activityIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teacher Comments & Assignments */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Teacher Comments</h4>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-700 italic">"{child.teacherComments}"</p>
                  </div>
                  
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Upcoming Assignments</h5>
                  <div className="space-y-2">
                    {child.upcomingAssignments.map((assignment, assignmentIndex) => (
                      <div key={assignmentIndex} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-medium text-gray-900">{assignment.title}</p>
                          <p className="text-gray-600">{assignment.subject} • Due: {assignment.dueDate}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          assignment.status === 'completed' ? 'bg-green-100 text-green-700' :
                          assignment.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {assignment.status.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1"
              >
                <option value="all">All Children</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Doe">Jane Doe</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-600">{event.child}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      event.type === 'exam' ? 'bg-red-100 text-red-700' :
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                      event.type === 'academic' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    {event.teacher && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {event.teacher}
                      </div>
                    )}
                    {event.description && (
                      <p className="text-xs text-gray-500 mt-2">{event.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fee Information */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Fee Information</h3>
              <button
                onClick={() => setActiveModal('payments')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {paymentInfo.map((payment) => (
                <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{payment.child} - {payment.term}</p>
                      <p className="text-sm text-gray-600">{payment.description}</p>
                      <p className="text-xs text-gray-500">Due: {payment.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{payment.amount}</p>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                  {payment.status === 'pending' && (
                    <button
                      onClick={() => handlePayFees(payment.id)}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Recent Messages</h3>
            <button
              onClick={() => setActiveModal('composeMessage')}
              className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
            >
              <Send className="h-4 w-4 inline mr-1" />
              Compose
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div key={message.id} className={`p-4 rounded-lg border ${
                !message.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className={`font-medium ${!message.read ? 'text-blue-900' : 'text-gray-900'}`}>
                        {message.subject}
                      </p>
                      {message.priority === 'high' && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{message.from}</p>
                    <p className="text-sm text-gray-500 mt-1">{message.preview}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{message.date}</span>
                      <span>Child: {message.child}</span>
                    </div>
                  </div>
                  {!message.read && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full ml-4"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'composeMessage' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Compose Message</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <select
                value={messageForm.to}
                onChange={(e) => setMessageForm({...messageForm, to: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Recipient</option>
                <option value="teacher">Child's Teachers</option>
                <option value="admin">School Administration</option>
                <option value="principal">Principal</option>
                <option value="counselor">School Counselor</option>
              </select>
              <select
                value={messageForm.child}
                onChange={(e) => setMessageForm({...messageForm, child: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Regarding Child</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Doe">Jane Doe</option>
                <option value="Both">Both Children</option>
              </select>
              <input
                type="text"
                placeholder="Subject"
                value={messageForm.subject}
                onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Message"
                value={messageForm.message}
                onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleSendMessage}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Send Message
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

      {activeModal === 'scheduleMeeting' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Schedule Meeting</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <select
                value={meetingForm.teacher}
                onChange={(e) => setMeetingForm({...meetingForm, teacher: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Teacher</option>
                <option value="Mrs. Johnson">Mrs. Johnson (Mathematics)</option>
                <option value="Dr. Smith">Dr. Smith (Physics)</option>
                <option value="Ms. Davis">Ms. Davis (Science)</option>
                <option value="Mrs. Brown">Mrs. Brown (English)</option>
                <option value="Principal">Principal</option>
              </select>
              <select
                value={meetingForm.child}
                onChange={(e) => setMeetingForm({...meetingForm, child: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Regarding Child</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Doe">Jane Doe</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={meetingForm.date}
                  onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="time"
                  value={meetingForm.time}
                  onChange={(e) => setMeetingForm({...meetingForm, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <select
                value={meetingForm.type}
                onChange={(e) => setMeetingForm({...meetingForm, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="in-person">In-Person Meeting</option>
                <option value="virtual">Virtual Meeting</option>
                <option value="phone">Phone Call</option>
              </select>
              <textarea
                placeholder="Reason for meeting"
                value={meetingForm.reason}
                onChange={(e) => setMeetingForm({...meetingForm, reason: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleScheduleMeeting}
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Schedule Meeting
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

export default ParentDashboard;