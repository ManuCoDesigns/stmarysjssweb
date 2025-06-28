import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../../components/ConfirmDialog';
import { MessageSquare, Send, Inbox, Send as Sent, Archive, Trash2, Search, Filter, Star, StarOff, Reply, Forward, MoreVertical, Paperclip, Users, User, Calendar, Clock, CheckCircle, AlertCircle, Plus, Edit, Eye, Download, Upload, Bell, Megaphone, Mail, Phone, Video } from 'lucide-react';

const AdminMessages: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCompose, setShowCompose] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
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

  const [composeForm, setComposeForm] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    message: '',
    priority: 'normal',
    attachments: []
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    message: '',
    audience: 'all',
    priority: 'normal',
    scheduleDate: '',
    scheduleTime: '',
    sendEmail: true,
    sendSMS: false,
    sendPush: true
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Mrs. Johnson',
      fromEmail: 'johnson@school.com',
      to: 'Principal',
      subject: 'Grade 10 Mathematics Progress Report',
      message: 'I wanted to update you on the progress of our Grade 10 mathematics students. Overall performance has improved significantly this term...',
      timestamp: '2024-03-20 14:30',
      read: false,
      starred: true,
      priority: 'high',
      type: 'teacher',
      attachments: ['math_report.pdf'],
      folder: 'inbox'
    },
    {
      id: 2,
      from: 'David Johnson',
      fromEmail: 'david.johnson@email.com',
      to: 'Principal',
      subject: 'Request for Parent-Teacher Meeting',
      message: 'I would like to schedule a meeting to discuss my son Mike\'s academic progress and any areas where he might need additional support...',
      timestamp: '2024-03-20 11:15',
      read: true,
      starred: false,
      priority: 'normal',
      type: 'parent',
      attachments: [],
      folder: 'inbox'
    },
    {
      id: 3,
      from: 'Finance Department',
      fromEmail: 'finance@school.com',
      to: 'Principal',
      subject: 'Monthly Financial Summary - March 2024',
      message: 'Please find attached the monthly financial summary for March 2024. Revenue targets have been exceeded by 8%...',
      timestamp: '2024-03-19 16:45',
      read: true,
      starred: false,
      priority: 'normal',
      type: 'staff',
      attachments: ['financial_summary_march.pdf', 'budget_analysis.xlsx'],
      folder: 'inbox'
    },
    {
      id: 4,
      from: 'John Doe',
      fromEmail: 'john.doe@student.com',
      to: 'Principal',
      subject: 'University Application Support Request',
      message: 'I am applying for universities and would appreciate a recommendation letter and guidance on the application process...',
      timestamp: '2024-03-19 09:20',
      read: false,
      starred: false,
      priority: 'normal',
      type: 'student',
      attachments: [],
      folder: 'inbox'
    },
    {
      id: 5,
      from: 'Principal',
      fromEmail: 'principal@school.com',
      to: 'All Teachers',
      subject: 'Staff Meeting - Curriculum Updates',
      message: 'Please join us for an important staff meeting this Friday to discuss upcoming curriculum changes and implementation strategies...',
      timestamp: '2024-03-18 13:00',
      read: true,
      starred: false,
      priority: 'high',
      type: 'announcement',
      attachments: ['meeting_agenda.pdf'],
      folder: 'sent'
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Term 2 Examination Schedule',
      message: 'The Term 2 examinations will begin on April 15th, 2024. Please ensure all students are prepared.',
      audience: 'students_parents',
      priority: 'high',
      sentDate: '2024-03-20',
      sentBy: 'Academic Office',
      recipients: 450,
      readCount: 380,
      status: 'sent'
    },
    {
      id: 2,
      title: 'Parent-Teacher Conference',
      message: 'Monthly parent-teacher conferences are scheduled for March 25th. Please book your slots.',
      audience: 'parents',
      priority: 'normal',
      sentDate: '2024-03-18',
      sentBy: 'Administration',
      recipients: 200,
      readCount: 165,
      status: 'sent'
    },
    {
      id: 3,
      title: 'New Library Resources Available',
      message: 'We have added new digital resources to our library. Students can now access online databases.',
      audience: 'students_teachers',
      priority: 'normal',
      sentDate: '2024-03-15',
      sentBy: 'Library',
      recipients: 540,
      readCount: 420,
      status: 'sent'
    }
  ]);

  const tabs = [
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: messages.filter(m => m.folder === 'inbox' && !m.read).length },
    { id: 'sent', name: 'Sent', icon: Sent, count: messages.filter(m => m.folder === 'sent').length },
    { id: 'starred', name: 'Starred', icon: Star, count: messages.filter(m => m.starred).length },
    { id: 'announcements', name: 'Announcements', icon: Megaphone, count: announcements.length },
    { id: 'archive', name: 'Archive', icon: Archive, count: 0 },
    { id: 'trash', name: 'Trash', icon: Trash2, count: 0 },
  ];

  const getFilteredMessages = () => {
    let filtered = messages;
    
    // Filter by tab
    if (activeTab === 'inbox') {
      filtered = filtered.filter(m => m.folder === 'inbox');
    } else if (activeTab === 'sent') {
      filtered = filtered.filter(m => m.folder === 'sent');
    } else if (activeTab === 'starred') {
      filtered = filtered.filter(m => m.starred);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(m => m.type === filterType);
    }
    
    return filtered;
  };

  const handleSendMessage = () => {
    if (!composeForm.to || !composeForm.subject || !composeForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Sending message...');
    
    setTimeout(() => {
      const newMessage = {
        id: messages.length + 1,
        from: 'Principal',
        fromEmail: 'principal@school.com',
        to: composeForm.to,
        subject: composeForm.subject,
        message: composeForm.message,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        read: true,
        starred: false,
        priority: composeForm.priority,
        type: 'sent',
        attachments: composeForm.attachments,
        folder: 'sent'
      };
      
      setMessages([newMessage, ...messages]);
      setComposeForm({
        to: '', cc: '', bcc: '', subject: '', message: '', priority: 'normal', attachments: []
      });
      setShowCompose(false);
      
      toast.dismiss(loadingToast);
      toast.success('Message sent successfully!', {
        duration: 4000,
        icon: '📧',
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
      const audienceMap: { [key: string]: number } = {
        'all': 750,
        'students': 512,
        'teachers': 28,
        'parents': 200,
        'students_parents': 712,
        'students_teachers': 540
      };

      const newAnnouncement = {
        id: announcements.length + 1,
        title: announcementForm.title,
        message: announcementForm.message,
        audience: announcementForm.audience,
        priority: announcementForm.priority,
        sentDate: new Date().toISOString().split('T')[0],
        sentBy: 'Principal',
        recipients: audienceMap[announcementForm.audience] || 0,
        readCount: 0,
        status: 'sent'
      };
      
      setAnnouncements([newAnnouncement, ...announcements]);
      setAnnouncementForm({
        title: '', message: '', audience: 'all', priority: 'normal',
        scheduleDate: '', scheduleTime: '', sendEmail: true, sendSMS: false, sendPush: true
      });
      setShowAnnouncement(false);
      
      toast.dismiss(loadingToast);
      toast.success(`Announcement sent to ${newAnnouncement.recipients} recipients!`, {
        duration: 4000,
        icon: '📢',
      });
    }, 2000);
  };

  const handleDeleteMessages = () => {
    if (selectedMessages.length === 0) {
      toast.error('Please select messages to delete');
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Messages',
      message: `Are you sure you want to delete ${selectedMessages.length} selected messages? This action cannot be undone.`,
      type: 'danger',
      onConfirm: () => {
        const loadingToast = toast.loading('Deleting messages...');
        
        setTimeout(() => {
          setMessages(messages.filter(m => !selectedMessages.includes(m.id)));
          setSelectedMessages([]);
          
          toast.dismiss(loadingToast);
          toast.success(`${selectedMessages.length} messages deleted successfully!`, {
            duration: 3000,
            icon: '🗑️',
          });
        }, 1000);
      }
    });
  };

  const handleMarkAsRead = () => {
    if (selectedMessages.length === 0) {
      toast.error('Please select messages first');
      return;
    }

    setMessages(messages.map(m => 
      selectedMessages.includes(m.id) ? { ...m, read: true } : m
    ));
    setSelectedMessages([]);
    toast.success('Messages marked as read!');
  };

  const handleStarMessages = () => {
    if (selectedMessages.length === 0) {
      toast.error('Please select messages first');
      return;
    }

    setMessages(messages.map(m => 
      selectedMessages.includes(m.id) ? { ...m, starred: !m.starred } : m
    ));
    setSelectedMessages([]);
    toast.success('Messages starred/unstarred!');
  };

  const renderMessageList = () => {
    const filteredMessages = getFilteredMessages();
    
    return (
      <div className="space-y-2">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedMessages.includes(message.id)
                ? 'bg-blue-50 border-blue-200'
                : message.read
                ? 'bg-white border-gray-200 hover:bg-gray-50'
                : 'bg-blue-50 border-blue-100 hover:bg-blue-100'
            }`}
            onClick={() => setSelectedMessage(message)}
          >
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedMessages.includes(message.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  if (e.target.checked) {
                    setSelectedMessages([...selectedMessages, message.id]);
                  } else {
                    setSelectedMessages(selectedMessages.filter(id => id !== message.id));
                  }
                }}
                className="mt-1 rounded border-gray-300"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                      {message.from}
                    </span>
                    {message.priority === 'high' && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    {message.attachments.length > 0 && (
                      <Paperclip className="h-4 w-4 text-gray-400" />
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      message.type === 'teacher' ? 'bg-blue-100 text-blue-700' :
                      message.type === 'parent' ? 'bg-green-100 text-green-700' :
                      message.type === 'student' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {message.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMessages(messages.map(m => 
                          m.id === message.id ? { ...m, starred: !m.starred } : m
                        ));
                      }}
                    >
                      {message.starred ? (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      ) : (
                        <StarOff className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <h3 className={`text-sm mt-1 ${!message.read ? 'font-semibold' : 'font-normal'}`}>
                  {message.subject}
                </h3>
                <p className="text-sm text-gray-600 mt-1 truncate">
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No messages found.</p>
          </div>
        )}
      </div>
    );
  };

  const renderAnnouncementsList = () => (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span>Sent by: {announcement.sentBy}</span>
                <span>Date: {announcement.sentDate}</span>
                <span className={`px-2 py-1 rounded-full ${
                  announcement.priority === 'high' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {announcement.priority} priority
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                <div>Recipients: {announcement.recipients}</div>
                <div>Read: {announcement.readCount} ({Math.round((announcement.readCount / announcement.recipients) * 100)}%)</div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{announcement.message}</p>
          
          <div className="flex justify-between items-center">
            <span className={`px-3 py-1 rounded-full text-sm ${
              announcement.audience === 'all' ? 'bg-purple-100 text-purple-700' :
              announcement.audience === 'students' ? 'bg-blue-100 text-blue-700' :
              announcement.audience === 'teachers' ? 'bg-green-100 text-green-700' :
              announcement.audience === 'parents' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {announcement.audience.replace('_', ' & ')}
            </span>
            
            <div className="flex space-x-2">
              <button
                onClick={() => toast.success('Analytics view coming soon!')}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="View Analytics"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => toast.success('Resend functionality coming soon!')}
                className="text-green-600 hover:text-green-800 p-1"
                title="Resend"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages & Communications</h1>
            <p className="text-gray-600 mt-1">Manage all school communications and announcements</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAnnouncement(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center"
            >
              <Megaphone className="h-4 w-4 mr-2" />
              Send Announcement
            </button>
            <button
              onClick={() => setShowCompose(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Compose Message
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedMessages([]);
                  setSearchTerm('');
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
                {tab.count > 0 && (
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters and Actions */}
        {activeTab !== 'announcements' && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="teacher">Teachers</option>
                  <option value="parent">Parents</option>
                  <option value="student">Students</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              
              {selectedMessages.length > 0 && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleMarkAsRead}
                    className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    Mark Read ({selectedMessages.length})
                  </button>
                  <button
                    onClick={handleStarMessages}
                    className="bg-yellow-600 text-white px-3 py-2 rounded-md hover:bg-yellow-700 transition-colors text-sm"
                  >
                    Star ({selectedMessages.length})
                  </button>
                  <button
                    onClick={handleDeleteMessages}
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
                  >
                    Delete ({selectedMessages.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {activeTab === 'announcements' ? renderAnnouncementsList() : renderMessageList()}
        </div>
      </div>

      {/* Compose Message Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Compose Message</h3>
                <button onClick={() => setShowCompose(false)}>
                  <Trash2 className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To *</label>
                <input
                  type="text"
                  value={composeForm.to}
                  onChange={(e) => setComposeForm({...composeForm, to: e.target.value})}
                  placeholder="Enter email addresses separated by commas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CC</label>
                  <input
                    type="text"
                    value={composeForm.cc}
                    onChange={(e) => setComposeForm({...composeForm, cc: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={composeForm.priority}
                    onChange={(e) => setComposeForm({...composeForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input
                  type="text"
                  value={composeForm.subject}
                  onChange={(e) => setComposeForm({...composeForm, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  value={composeForm.message}
                  onChange={(e) => setComposeForm({...composeForm, message: e.target.value})}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => toast.success('Attachment feature coming soon!')}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Paperclip className="h-4 w-4 mr-1" />
                  Attach Files
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCompose(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Announcement Modal */}
      {showAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Send Announcement</h3>
                <button onClick={() => setShowAnnouncement(false)}>
                  <Trash2 className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audience *</label>
                  <select
                    value={announcementForm.audience}
                    onChange={(e) => setAnnouncementForm({...announcementForm, audience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">Everyone</option>
                    <option value="students">Students Only</option>
                    <option value="teachers">Teachers Only</option>
                    <option value="parents">Parents Only</option>
                    <option value="students_parents">Students & Parents</option>
                    <option value="students_teachers">Students & Teachers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={announcementForm.priority}
                    onChange={(e) => setAnnouncementForm({...announcementForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  value={announcementForm.message}
                  onChange={(e) => setAnnouncementForm({...announcementForm, message: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Delivery Methods</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sendEmail"
                      checked={announcementForm.sendEmail}
                      onChange={(e) => setAnnouncementForm({...announcementForm, sendEmail: e.target.checked})}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sendEmail" className="ml-2 block text-sm text-gray-900">
                      Send via Email
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sendSMS"
                      checked={announcementForm.sendSMS}
                      onChange={(e) => setAnnouncementForm({...announcementForm, sendSMS: e.target.checked})}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sendSMS" className="ml-2 block text-sm text-gray-900">
                      Send via SMS
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sendPush"
                      checked={announcementForm.sendPush}
                      onChange={(e) => setAnnouncementForm({...announcementForm, sendPush: e.target.checked})}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sendPush" className="ml-2 block text-sm text-gray-900">
                      Send Push Notification
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAnnouncement(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendAnnouncement}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center"
                >
                  <Megaphone className="h-4 w-4 mr-2" />
                  Send Announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{selectedMessage.subject}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span>From: {selectedMessage.from} ({selectedMessage.fromEmail})</span>
                    <span>{selectedMessage.timestamp}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedMessage(null)}>
                  <Trash2 className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              
              {selectedMessage.attachments.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Attachments</h4>
                  <div className="space-y-2">
                    {selectedMessage.attachments.map((attachment: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Paperclip className="h-4 w-4 text-gray-400" />
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t border-gray-200 flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedMessage(null);
                    setShowCompose(true);
                    setComposeForm({
                      ...composeForm,
                      to: selectedMessage.fromEmail,
                      subject: `Re: ${selectedMessage.subject}`
                    });
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </button>
                <button
                  onClick={() => toast.success('Forward functionality coming soon!')}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
                >
                  <Forward className="h-4 w-4 mr-2" />
                  Forward
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

export default AdminMessages;