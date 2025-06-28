import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../../components/ConfirmDialog';
import { 
  BookOpen, 
  Award, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Users, 
  Target,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Download,
  Eye,
  Star,
  ArrowUp,
  ArrowDown,
  Send,
  Upload,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  User,
  Edit,
  Save,
  X,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Printer,
  Share,
  Video,
  Headphones,
  Book,
  Calculator,
  Globe,
  Microscope
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('current');
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
    type: 'info'
  });

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    emergencyContact: '',
    interests: '',
    goals: ''
  });

  const [messageForm, setMessageForm] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const stats = [
    { 
      name: 'Current GPA', 
      value: '3.8', 
      icon: Award, 
      color: 'bg-green-500',
      change: '+0.2',
      trend: 'up',
      target: '4.0'
    },
    { 
      name: 'Assignments Due', 
      value: '3', 
      icon: BookOpen, 
      color: 'bg-yellow-500',
      change: '-2',
      trend: 'down',
      target: '0'
    },
    { 
      name: 'Upcoming Exams', 
      value: '2', 
      icon: Calendar, 
      color: 'bg-blue-500',
      change: '+1',
      trend: 'up',
      target: 'Ready'
    },
    { 
      name: 'Attendance Rate', 
      value: '96%', 
      icon: TrendingUp, 
      color: 'bg-purple-500',
      change: '+2%',
      trend: 'up',
      target: '98%'
    },
  ];

  const [subjectPerformance, setSubjectPerformance] = useState([
    { subject: 'Mathematics', currentGrade: 'A', previousGrade: 'B+', progress: 85, trend: 'up', teacher: 'Mr. Johnson', nextTest: '2024-03-25' },
    { subject: 'Physics', currentGrade: 'B+', previousGrade: 'B', progress: 78, trend: 'up', teacher: 'Dr. Smith', nextTest: '2024-03-28' },
    { subject: 'Chemistry', currentGrade: 'A-', previousGrade: 'A-', progress: 82, trend: 'stable', teacher: 'Prof. Wilson', nextTest: '2024-03-30' },
    { subject: 'English', currentGrade: 'A', previousGrade: 'A-', progress: 88, trend: 'up', teacher: 'Mrs. Brown', nextTest: '2024-04-02' },
    { subject: 'Biology', currentGrade: 'B+', previousGrade: 'A-', progress: 76, trend: 'down', teacher: 'Ms. Davis', nextTest: '2024-04-05' },
    { subject: 'History', currentGrade: 'A-', previousGrade: 'B+', progress: 84, trend: 'up', teacher: 'Mr. Thompson', nextTest: '2024-04-08' },
  ]);

  const [assignments, setAssignments] = useState([
    { 
      id: 1,
      subject: 'Biology', 
      title: 'Research Project on Genetics', 
      dueDate: '2024-03-25', 
      priority: 'high',
      type: 'Project',
      estimatedTime: '6 hours',
      progress: 60,
      status: 'in-progress',
      description: 'Comprehensive research on genetic inheritance patterns',
      submissionType: 'online'
    },
    { 
      id: 2,
      subject: 'History', 
      title: 'Essay on World War II Impact', 
      dueDate: '2024-03-22', 
      priority: 'medium',
      type: 'Essay',
      estimatedTime: '4 hours',
      progress: 30,
      status: 'not-started',
      description: 'Analyze the social and economic impact of WWII',
      submissionType: 'online'
    },
    { 
      id: 3,
      subject: 'Mathematics', 
      title: 'Calculus Problem Set 8', 
      dueDate: '2024-03-20', 
      priority: 'low',
      type: 'Homework',
      estimatedTime: '2 hours',
      progress: 80,
      status: 'in-progress',
      description: 'Advanced calculus problems on derivatives',
      submissionType: 'physical'
    },
  ]);

  const [grades, setGrades] = useState([
    { 
      id: 1,
      subject: 'Mathematics', 
      grade: 'A', 
      date: '2024-03-15', 
      assignment: 'Calculus Test',
      points: '95/100',
      weight: 'Major',
      feedback: 'Excellent work on complex problems. Keep up the great effort!',
      teacher: 'Mr. Johnson'
    },
    { 
      id: 2,
      subject: 'Physics', 
      grade: 'B+', 
      date: '2024-03-12', 
      assignment: 'Lab Report - Motion',
      points: '87/100',
      weight: 'Minor',
      feedback: 'Good analysis, but could improve on conclusion section.',
      teacher: 'Dr. Smith'
    },
    { 
      id: 3,
      subject: 'English', 
      grade: 'A-', 
      date: '2024-03-10', 
      assignment: 'Literary Analysis Essay',
      points: '92/100',
      weight: 'Major',
      feedback: 'Strong thesis and supporting arguments. Well written.',
      teacher: 'Mrs. Brown'
    },
    { 
      id: 4,
      subject: 'Chemistry', 
      grade: 'A', 
      date: '2024-03-08', 
      assignment: 'Midterm Exam',
      points: '96/100',
      weight: 'Major',
      feedback: 'Outstanding performance across all topics.',
      teacher: 'Prof. Wilson'
    },
  ]);

  const [schedule, setSchedule] = useState([
    { 
      time: '08:00', 
      subject: 'Mathematics', 
      teacher: 'Mr. Johnson', 
      room: 'Room 101',
      type: 'Lecture',
      status: 'upcoming',
      topic: 'Advanced Calculus - Integration',
      materials: ['Textbook Ch. 12', 'Calculator', 'Notebook']
    },
    { 
      time: '09:30', 
      subject: 'Physics', 
      teacher: 'Dr. Smith', 
      room: 'Lab 2',
      type: 'Lab',
      status: 'current',
      topic: 'Electromagnetic Induction',
      materials: ['Lab Manual', 'Safety Goggles', 'Multimeter']
    },
    { 
      time: '11:00', 
      subject: 'English', 
      teacher: 'Mrs. Brown', 
      room: 'Room 205',
      type: 'Discussion',
      status: 'upcoming',
      topic: 'Shakespeare - Hamlet Analysis',
      materials: ['Hamlet Text', 'Analysis Notes']
    },
    { 
      time: '13:00', 
      subject: 'Chemistry', 
      teacher: 'Prof. Wilson', 
      room: 'Lab 1',
      type: 'Lab',
      status: 'upcoming',
      topic: 'Organic Synthesis',
      materials: ['Lab Coat', 'Safety Equipment', 'Lab Manual']
    },
    { 
      time: '14:30', 
      subject: 'Biology', 
      teacher: 'Ms. Davis', 
      room: 'Room 301',
      type: 'Lecture',
      status: 'upcoming',
      topic: 'Genetics and Heredity',
      materials: ['Biology Textbook', 'Genetic Charts']
    },
  ]);

  const [studyGoals, setStudyGoals] = useState([
    { id: 1, goal: 'Improve Math Grade to A+', progress: 75, target: 'End of Term', priority: 'high' },
    { id: 2, goal: 'Complete University Applications', progress: 40, target: 'April 15', priority: 'high' },
    { id: 3, goal: 'Finish Science Fair Project', progress: 90, target: 'March 28', priority: 'medium' },
    { id: 4, goal: 'Read 5 Additional Books', progress: 60, target: 'End of Year', priority: 'low' },
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Honor Roll', description: 'Achieved 3.5+ GPA for 3 consecutive terms', date: '2024-03-01', category: 'academic' },
    { id: 2, title: 'Science Fair Winner', description: 'First place in Regional Science Fair', date: '2024-02-15', category: 'competition' },
    { id: 3, title: 'Perfect Attendance', description: 'No absences for the entire term', date: '2024-01-30', category: 'attendance' },
    { id: 4, title: 'Math Olympiad Qualifier', description: 'Qualified for National Mathematics Olympiad', date: '2024-01-15', category: 'competition' },
  ]);

  const [messages, setMessages] = useState([
    { 
      id: 1,
      from: 'Mr. Johnson (Math Teacher)', 
      subject: 'Great work on recent test!', 
      date: '2024-03-15', 
      read: false,
      priority: 'normal',
      preview: 'Your performance on the calculus test was excellent...',
      type: 'teacher'
    },
    { 
      id: 2,
      from: 'School Administration', 
      subject: 'University Fair Next Week', 
      date: '2024-03-14', 
      read: true,
      priority: 'high',
      preview: 'Don\'t miss the university representatives visiting...',
      type: 'admin'
    },
    { 
      id: 3,
      from: 'Ms. Davis (Science Teacher)', 
      subject: 'Science Project Feedback', 
      date: '2024-03-13', 
      read: false,
      priority: 'normal',
      preview: 'Your genetics project shows great understanding...',
      type: 'teacher'
    },
  ]);

  const [resources, setResources] = useState([
    { id: 1, title: 'Khan Academy - Calculus', type: 'video', subject: 'Mathematics', url: '#', icon: Video },
    { id: 2, title: 'Physics Simulation Lab', type: 'interactive', subject: 'Physics', url: '#', icon: Microscope },
    { id: 3, title: 'Chemistry Reference Guide', type: 'document', subject: 'Chemistry', url: '#', icon: FileText },
    { id: 4, title: 'English Literature Audiobooks', type: 'audio', subject: 'English', url: '#', icon: Headphones },
    { id: 5, title: 'Biology Virtual Dissection', type: 'interactive', subject: 'Biology', url: '#', icon: Globe },
    { id: 6, title: 'History Timeline Tool', type: 'tool', subject: 'History', url: '#', icon: Calendar },
  ]);

  // Action handlers
  const handleSubmitAssignment = (assignmentId: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Submit Assignment',
      message: 'Are you sure you want to submit this assignment? You won\'t be able to make changes after submission.',
      type: 'info',
      onConfirm: () => {
        const loadingToast = toast.loading('Submitting assignment...');
        
        setTimeout(() => {
          setAssignments(assignments.map(a => 
            a.id === assignmentId ? { ...a, status: 'submitted', progress: 100 } : a
          ));
          
          toast.dismiss(loadingToast);
          toast.success('Assignment submitted successfully!', {
            duration: 4000,
            icon: '📝',
          });
        }, 1500);
      }
    });
  };

  const handleUpdateProfile = () => {
    const loadingToast = toast.loading('Updating profile...');
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Profile updated successfully!', {
        duration: 4000,
        icon: '✅',
      });
      setActiveModal(null);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!messageForm.to || !messageForm.subject || !messageForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Sending message...');
    
    setTimeout(() => {
      setMessageForm({ to: '', subject: '', message: '' });
      setActiveModal(null);
      
      toast.dismiss(loadingToast);
      toast.success('Message sent successfully!', {
        duration: 4000,
        icon: '📧',
      });
    }, 1500);
  };

  const handleAddGoal = () => {
    const newGoal = {
      id: studyGoals.length + 1,
      goal: 'New Study Goal',
      progress: 0,
      target: 'Set Target Date',
      priority: 'medium'
    };
    
    setStudyGoals([...studyGoals, newGoal]);
    toast.success('New study goal added!');
  };

  const handleUpdateGoalProgress = (goalId: number, newProgress: number) => {
    setStudyGoals(studyGoals.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    ));
    toast.success('Goal progress updated!');
  };

  const handleDownloadReport = () => {
    const loadingToast = toast.loading('Generating academic report...');
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Academic report downloaded successfully!', {
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

  const filteredAssignments = assignments.filter(assignment => 
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGrades = grades.filter(grade => 
    selectedFilter === 'all' || grade.subject.toLowerCase() === selectedFilter.toLowerCase()
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header with Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100 mt-2">
              {user?.grade} • Student ID: {user?.studentId}
            </p>
            <p className="text-blue-100">Ready to continue your learning journey?</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleDownloadReport}
              className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="h-4 w-4 inline mr-2" />
              Download Report
            </button>
            <button
              onClick={() => setActiveModal('schedule')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              View Schedule
            </button>
            <button
              onClick={() => setActiveModal('messages')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative"
            >
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Messages
              {messages.filter(m => !m.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {messages.filter(m => !m.read).length}
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
              <div className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 
                stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : 
                 stat.trend === 'down' ? <ArrowDown className="h-4 w-4 mr-1" /> : null}
                {stat.change}
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Target: {stat.target}
            </div>
          </div>
        ))}
      </div>

      {/* Subject Performance Overview */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Subject Performance</h3>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="current">Current Term</option>
              <option value="previous">Previous Term</option>
              <option value="year">Full Year</option>
            </select>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectPerformance.map((subject, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                  <div className={`flex items-center text-sm ${
                    subject.trend === 'up' ? 'text-green-600' : 
                    subject.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {subject.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : 
                     subject.trend === 'down' ? <ArrowDown className="h-4 w-4 mr-1" /> : 
                     <div className="w-4 h-4 mr-1" />}
                    {subject.currentGrade}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        subject.progress >= 85 ? 'bg-green-500' :
                        subject.progress >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Teacher: {subject.teacher}</span>
                    <span>Next Test: {subject.nextTest}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Assignments */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Assignments</h3>
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
                  onClick={() => setActiveModal('assignments')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredAssignments.slice(0, 3).map((assignment) => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        assignment.priority === 'high' ? 'bg-red-500' :
                        assignment.priority === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{assignment.title}</p>
                        <p className="text-sm text-gray-600">{assignment.subject} • {assignment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Due: {assignment.dueDate}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        assignment.status === 'submitted' ? 'bg-green-100 text-green-700' :
                        assignment.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {assignment.status.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{assignment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${assignment.progress}%` }}
                      ></div>
                    </div>
                    {assignment.status !== 'submitted' && (
                      <div className="flex justify-end mt-3">
                        <button
                          onClick={() => handleSubmitAssignment(assignment.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                          disabled={assignment.progress < 100}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Today's Schedule</h3>
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
              {schedule.map((class_, index) => (
                <div key={index} className={`flex items-center space-x-4 p-3 rounded-lg ${
                  class_.status === 'current' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}>
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                    class_.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Clock className={`h-6 w-6 ${
                      class_.status === 'current' ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{class_.subject}</p>
                        <p className="text-sm text-gray-600">{class_.teacher} • {class_.room}</p>
                        <p className="text-xs text-gray-500 mt-1">{class_.topic}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{class_.time}</div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          class_.type === 'Lab' ? 'bg-green-100 text-green-700' :
                          class_.type === 'Discussion' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {class_.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Study Goals */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Study Goals</h3>
            <button
              onClick={handleAddGoal}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 inline mr-1" />
              Add Goal
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studyGoals.map((goal) => (
              <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <p className="font-medium text-gray-900">{goal.goal}</p>
                  <div className={`px-2 py-1 rounded text-xs ${
                    goal.priority === 'high' ? 'bg-red-100 text-red-700' :
                    goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {goal.priority}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">Target: {goal.target}</p>
                    <button
                      onClick={() => handleUpdateGoalProgress(goal.id, Math.min(goal.progress + 10, 100))}
                      className="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      Update +10%
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Resources */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Learning Resources</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <resource.icon className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{resource.title}</p>
                    <p className="text-sm text-gray-600">{resource.subject}</p>
                    <span className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                      resource.type === 'video' ? 'bg-red-100 text-red-700' :
                      resource.type === 'interactive' ? 'bg-green-100 text-green-700' :
                      resource.type === 'audio' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {resource.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'profile' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Update Profile</h3>
              <button onClick={() => setActiveModal(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Address"
                value={profileForm.address}
                onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleUpdateProfile}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update Profile
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

      {activeModal === 'messages' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Messages</h3>
                <button onClick={() => setActiveModal(null)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {messages.map((message) => (
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
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{message.from}</p>
                        <p className="text-sm text-gray-500 mt-1">{message.preview}</p>
                        <p className="text-xs text-gray-500 mt-2">{message.date}</p>
                      </div>
                      {!message.read && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full ml-4"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setActiveModal('compose');
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Compose New Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'compose' && (
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Recipient</option>
                <option value="teacher">My Teachers</option>
                <option value="admin">School Administration</option>
                <option value="counselor">School Counselor</option>
              </select>
              <input
                type="text"
                placeholder="Subject"
                value={messageForm.subject}
                onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Message"
                value={messageForm.message}
                onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleSendMessage}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
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

export default StudentDashboard;