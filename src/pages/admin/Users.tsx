import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../../components/ConfirmDialog';
import { 
  Users, 
  UserCheck, 
  GraduationCap, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  Download,
  Upload,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings
} from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
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

  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@student.com', 
      grade: 'Grade 10', 
      status: 'active', 
      fees: 'paid',
      parentName: 'Robert Doe',
      parentEmail: 'robert.doe@email.com',
      phone: '+254712345678',
      admissionDate: '2023-01-15',
      lastLogin: '2024-03-20'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@student.com', 
      grade: 'Grade 9', 
      status: 'active', 
      fees: 'pending',
      parentName: 'Mary Smith',
      parentEmail: 'mary.smith@email.com',
      phone: '+254723456789',
      admissionDate: '2023-02-10',
      lastLogin: '2024-03-19'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      email: 'mike.johnson@student.com', 
      grade: 'Grade 8', 
      status: 'active', 
      fees: 'paid',
      parentName: 'David Johnson',
      parentEmail: 'david.johnson@email.com',
      phone: '+254734567890',
      admissionDate: '2022-09-05',
      lastLogin: '2024-03-18'
    },
    { 
      id: 4, 
      name: 'Sarah Wilson', 
      email: 'sarah.wilson@student.com', 
      grade: 'Grade 7', 
      status: 'inactive', 
      fees: 'overdue',
      parentName: 'Lisa Wilson',
      parentEmail: 'lisa.wilson@email.com',
      phone: '+254745678901',
      admissionDate: '2022-01-20',
      lastLogin: '2024-02-15'
    },
  ]);

  const [teachers, setTeachers] = useState([
    { 
      id: 1, 
      name: 'Mrs. Johnson', 
      email: 'johnson@school.com', 
      subjects: 'Mathematics, Physics', 
      status: 'active',
      phone: '+254756789012',
      qualification: 'MSc Mathematics',
      experience: '8 years',
      hireDate: '2020-08-15',
      lastLogin: '2024-03-20'
    },
    { 
      id: 2, 
      name: 'Mr. Smith', 
      email: 'smith@school.com', 
      subjects: 'English, Literature', 
      status: 'active',
      phone: '+254767890123',
      qualification: 'BA English Literature',
      experience: '5 years',
      hireDate: '2021-01-10',
      lastLogin: '2024-03-19'
    },
    { 
      id: 3, 
      name: 'Dr. Brown', 
      email: 'brown@school.com', 
      subjects: 'Chemistry, Biology', 
      status: 'active',
      phone: '+254778901234',
      qualification: 'PhD Chemistry',
      experience: '12 years',
      hireDate: '2019-03-20',
      lastLogin: '2024-03-20'
    },
    { 
      id: 4, 
      name: 'Ms. Davis', 
      email: 'davis@school.com', 
      subjects: 'History, Geography', 
      status: 'leave',
      phone: '+254789012345',
      qualification: 'MA History',
      experience: '6 years',
      hireDate: '2020-11-05',
      lastLogin: '2024-03-10'
    },
  ]);

  const [parents, setParents] = useState([
    { 
      id: 1, 
      name: 'Robert Doe', 
      email: 'robert.doe@email.com', 
      children: ['John Doe - Grade 10'], 
      status: 'active',
      phone: '+254790123456',
      occupation: 'Engineer',
      lastLogin: '2024-03-19'
    },
    { 
      id: 2, 
      name: 'Mary Smith', 
      email: 'mary.smith@email.com', 
      children: ['Jane Smith - Grade 9'], 
      status: 'active',
      phone: '+254701234567',
      occupation: 'Doctor',
      lastLogin: '2024-03-18'
    },
    { 
      id: 3, 
      name: 'David Johnson', 
      email: 'david.johnson@email.com', 
      children: ['Mike Johnson - Grade 8'], 
      status: 'active',
      phone: '+254712345670',
      occupation: 'Business Owner',
      lastLogin: '2024-03-20'
    },
  ]);

  const [admins, setAdmins] = useState([
    { 
      id: 1, 
      name: 'Catherine Wanjiku', 
      email: 'principal@school.com', 
      role: 'Principal', 
      status: 'active',
      phone: '+254723456701',
      permissions: ['all'],
      lastLogin: '2024-03-20'
    },
    { 
      id: 2, 
      name: 'James Mwangi', 
      email: 'deputy@school.com', 
      role: 'Deputy Principal', 
      status: 'active',
      phone: '+254734567012',
      permissions: ['academic', 'staff'],
      lastLogin: '2024-03-19'
    },
    { 
      id: 3, 
      name: 'Grace Mutiso', 
      email: 'finance@school.com', 
      role: 'Finance Manager', 
      status: 'active',
      phone: '+254745670123',
      permissions: ['finance'],
      lastLogin: '2024-03-20'
    },
  ]);

  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    subjects: '',
    role: '',
    parentName: '',
    parentEmail: '',
    qualification: '',
    experience: ''
  });

  const getCurrentData = () => {
    switch (activeTab) {
      case 'students': return students;
      case 'teachers': return teachers;
      case 'parents': return parents;
      case 'admins': return admins;
      default: return [];
    }
  };

  const getFilteredData = () => {
    const data = getCurrentData();
    return data.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  };

  const handleAddUser = () => {
    if (!newUserForm.name || !newUserForm.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading(`Adding ${activeTab.slice(0, -1)}...`);
    
    setTimeout(() => {
      const newUser = {
        id: getCurrentData().length + 1,
        ...newUserForm,
        status: 'active',
        lastLogin: new Date().toISOString().split('T')[0]
      };

      switch (activeTab) {
        case 'students':
          setStudents([...students, { ...newUser, fees: 'pending', admissionDate: new Date().toISOString().split('T')[0] }]);
          break;
        case 'teachers':
          setTeachers([...teachers, { ...newUser, hireDate: new Date().toISOString().split('T')[0] }]);
          break;
        case 'parents':
          setParents([...parents, { ...newUser, children: [], occupation: '' }]);
          break;
        case 'admins':
          setAdmins([...admins, { ...newUser, permissions: ['basic'] }]);
          break;
      }

      setNewUserForm({
        name: '', email: '', phone: '', grade: '', subjects: '', role: '',
        parentName: '', parentEmail: '', qualification: '', experience: ''
      });
      setShowAddModal(false);
      
      toast.dismiss(loadingToast);
      toast.success(`${newUserForm.name} has been successfully added!`, {
        duration: 4000,
        icon: '✅',
      });
    }, 1000);
  };

  const handleDeleteUser = (user: any) => {
    setConfirmDialog({
      isOpen: true,
      title: `Delete ${activeTab.slice(0, -1)}`,
      message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      type: 'danger',
      onConfirm: () => {
        const loadingToast = toast.loading(`Deleting ${user.name}...`);
        
        setTimeout(() => {
          switch (activeTab) {
            case 'students':
              setStudents(students.filter(s => s.id !== user.id));
              break;
            case 'teachers':
              setTeachers(teachers.filter(t => t.id !== user.id));
              break;
            case 'parents':
              setParents(parents.filter(p => p.id !== user.id));
              break;
            case 'admins':
              setAdmins(admins.filter(a => a.id !== user.id));
              break;
          }
          
          toast.dismiss(loadingToast);
          toast.success(`${user.name} has been successfully deleted.`, {
            duration: 4000,
            icon: '🗑️',
          });
        }, 1000);
      }
    });
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      toast.error('Please select users first');
      return;
    }

    const actionText = action === 'delete' ? 'delete' : action === 'activate' ? 'activate' : 'deactivate';
    
    setConfirmDialog({
      isOpen: true,
      title: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} Users`,
      message: `Are you sure you want to ${actionText} ${selectedUsers.length} selected users?`,
      type: action === 'delete' ? 'danger' : 'warning',
      onConfirm: () => {
        const loadingToast = toast.loading(`${actionText.charAt(0).toUpperCase() + actionText.slice(1)}ing users...`);
        
        setTimeout(() => {
          if (action === 'delete') {
            switch (activeTab) {
              case 'students':
                setStudents(students.filter(s => !selectedUsers.includes(s.id)));
                break;
              case 'teachers':
                setTeachers(teachers.filter(t => !selectedUsers.includes(t.id)));
                break;
              case 'parents':
                setParents(parents.filter(p => !selectedUsers.includes(p.id)));
                break;
              case 'admins':
                setAdmins(admins.filter(a => !selectedUsers.includes(a.id)));
                break;
            }
          } else {
            const newStatus = action === 'activate' ? 'active' : 'inactive';
            switch (activeTab) {
              case 'students':
                setStudents(students.map(s => selectedUsers.includes(s.id) ? { ...s, status: newStatus } : s));
                break;
              case 'teachers':
                setTeachers(teachers.map(t => selectedUsers.includes(t.id) ? { ...t, status: newStatus } : t));
                break;
              case 'parents':
                setParents(parents.map(p => selectedUsers.includes(p.id) ? { ...p, status: newStatus } : p));
                break;
              case 'admins':
                setAdmins(admins.map(a => selectedUsers.includes(a.id) ? { ...a, status: newStatus } : a));
                break;
            }
          }
          
          setSelectedUsers([]);
          toast.dismiss(loadingToast);
          toast.success(`Successfully ${actionText}d ${selectedUsers.length} users!`, {
            duration: 4000,
            icon: '✅',
          });
        }, 1500);
      }
    });
  };

  const exportUsers = () => {
    const loadingToast = toast.loading('Exporting user data...');
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('User data exported successfully!', {
        duration: 4000,
        icon: '📊',
      });
    }, 2000);
  };

  const tabs = [
    { id: 'students', label: 'Students', icon: GraduationCap, count: students.length },
    { id: 'teachers', label: 'Teachers', icon: UserCheck, count: teachers.length },
    { id: 'parents', label: 'Parents', icon: Users, count: parents.length },
    { id: 'admins', label: 'Admins', icon: Settings, count: admins.length },
  ];

  const renderUserTable = () => {
    const data = getFilteredData();
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(data.map(user => user.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                  checked={selectedUsers.length === data.length && data.length > 0}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
              {activeTab === 'students' && <th className="text-left py-3 px-4 font-medium text-gray-900">Grade</th>}
              {activeTab === 'teachers' && <th className="text-left py-3 px-4 font-medium text-gray-900">Subjects</th>}
              {activeTab === 'parents' && <th className="text-left py-3 px-4 font-medium text-gray-900">Children</th>}
              {activeTab === 'admins' && <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>}
              <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user.id]);
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                {activeTab === 'students' && <td className="py-3 px-4 text-gray-600">{(user as any).grade}</td>}
                {activeTab === 'teachers' && <td className="py-3 px-4 text-gray-600">{(user as any).subjects}</td>}
                {activeTab === 'parents' && (
                  <td className="py-3 px-4 text-gray-600">
                    {Array.isArray((user as any).children) ? (user as any).children.join(', ') : (user as any).children}
                  </td>
                )}
                {activeTab === 'admins' && <td className="py-3 px-4 text-gray-600">{(user as any).role}</td>}
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' :
                    user.status === 'inactive' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">{user.lastLogin}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => {
                        setEditingUser(user);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => toast.success('View details functionality coming soon!')}
                      className="text-green-600 hover:text-green-800 p-1"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {data.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Manage students, teachers, parents, and administrators</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={exportUsers}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedUsers([]);
                  setSearchTerm('');
                  setFilterStatus('all');
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Filters and Actions */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                {activeTab === 'teachers' && <option value="leave">On Leave</option>}
              </select>
            </div>
            
            {selectedUsers.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                >
                  Activate ({selectedUsers.length})
                </button>
                <button
                  onClick={() => handleBulkAction('deactivate')}
                  className="bg-yellow-600 text-white px-3 py-2 rounded-md hover:bg-yellow-700 transition-colors text-sm"
                >
                  Deactivate ({selectedUsers.length})
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                  Delete ({selectedUsers.length})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          {renderUserTable()}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New {activeTab.slice(0, -1)}</h3>
              <button onClick={() => setShowAddModal(false)}>
                <XCircle className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={newUserForm.name}
                onChange={(e) => setNewUserForm({...newUserForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email *"
                value={newUserForm.email}
                onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newUserForm.phone}
                onChange={(e) => setNewUserForm({...newUserForm, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {activeTab === 'students' && (
                <>
                  <select
                    value={newUserForm.grade}
                    onChange={(e) => setNewUserForm({...newUserForm, grade: e.target.value})}
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
                    value={newUserForm.parentName}
                    onChange={(e) => setNewUserForm({...newUserForm, parentName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Parent Email"
                    value={newUserForm.parentEmail}
                    onChange={(e) => setNewUserForm({...newUserForm, parentEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}
              
              {activeTab === 'teachers' && (
                <>
                  <input
                    type="text"
                    placeholder="Subjects (comma separated) *"
                    value={newUserForm.subjects}
                    onChange={(e) => setNewUserForm({...newUserForm, subjects: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Qualification"
                    value={newUserForm.qualification}
                    onChange={(e) => setNewUserForm({...newUserForm, qualification: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Years of Experience"
                    value={newUserForm.experience}
                    onChange={(e) => setNewUserForm({...newUserForm, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}
              
              {activeTab === 'admins' && (
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Role *</option>
                  <option value="Principal">Principal</option>
                  <option value="Deputy Principal">Deputy Principal</option>
                  <option value="Academic Director">Academic Director</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="IT Administrator">IT Administrator</option>
                </select>
              )}
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddUser}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add {activeTab.slice(0, -1)}
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
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

export default AdminUsers;