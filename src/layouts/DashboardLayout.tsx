import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Moon,
  Sun,
  GraduationCap,
  Users,
  BarChart3,
  Calendar,
  FileText,
  Award,
  Globe
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: `/${user?.role}/dashboard`, icon: Home },
      { name: 'Profile', href: `/${user?.role}/profile`, icon: User },
      { name: 'Messages', href: `/${user?.role}/messages`, icon: MessageSquare },
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...baseItems,
          { name: 'Grades', href: '/student/grades', icon: Award },
          { name: 'Assignments', href: '/student/assignments', icon: FileText },
          { name: 'Schedule', href: '/student/schedule', icon: Calendar },
        ];
      case 'teacher':
        return [
          ...baseItems,
          { name: 'Classes', href: '/teacher/classes', icon: Users },
          { name: 'Gradebook', href: '/teacher/gradebook', icon: BookOpen },
          { name: 'Assignments', href: '/teacher/assignments', icon: FileText },
          { name: 'Schedule', href: '/teacher/schedule', icon: Calendar },
        ];
      case 'parent':
        return [
          ...baseItems,
          { name: 'Children', href: '/parent/children', icon: Users },
          { name: 'Reports', href: '/parent/reports', icon: BarChart3 },
          { name: 'Events', href: '/parent/events', icon: Calendar },
        ];
      case 'admin':
        return [
          ...baseItems,
          { name: 'Users', href: '/admin/users', icon: Users },
          { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
          { name: 'Website', href: '/admin/website', icon: Globe },
          { name: 'Settings', href: '/admin/settings', icon: Settings },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-lg`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600 border-b border-blue-700">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <GraduationCap className="h-8 w-8" />
            <span className="font-bold text-lg">St. Mary's</span>
          </Link>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="mt-8 flex-1 overflow-y-auto">
          <div className="px-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Fixed Top Header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:bg-gray-800 dark:border-gray-700 sm:gap-x-6 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Search bar */}
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 items-center max-w-md">
              <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3" />
              <input
                className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm dark:bg-gray-800 dark:text-white rounded-lg"
                placeholder="Search..."
                type="search"
              />
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Dark mode toggle */}
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            <button type="button" className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>

            {/* Profile section */}
            <div className="flex items-center space-x-3">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user?.avatar || 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150'}
                alt={user?.name}
              />
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;