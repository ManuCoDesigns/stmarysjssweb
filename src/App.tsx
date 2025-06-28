import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import LifeAtStMarys from './pages/LifeAtStMarys';
import CBC from './pages/CBC';
import Alumni from './pages/Alumni';
import Careers from './pages/Careers';
import Downloads from './pages/Downloads';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';

// Dashboard Pages
import StudentDashboard from './pages/dashboard/StudentDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import ParentDashboard from './pages/dashboard/ParentDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Admin Pages
import AdminUsers from './pages/admin/Users';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';
import AdminMessages from './pages/admin/Messages';
import WebsiteManagement from './pages/admin/WebsiteManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="academics" element={<Academics />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="news" element={<News />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="life-at-stmarys" element={<LifeAtStMarys />} />
            <Route path="cbc" element={<CBC />} />
            <Route path="alumni" element={<Alumni />} />
            <Route path="careers" element={<Careers />} />
            <Route path="downloads" element={<Downloads />} />
          </Route>

          {/* Login Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Dashboard Routes */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<div>Student Profile</div>} />
            <Route path="grades" element={<div>Student Grades</div>} />
            <Route path="assignments" element={<div>Student Assignments</div>} />
            <Route path="schedule" element={<div>Student Schedule</div>} />
            <Route path="messages" element={<div>Student Messages</div>} />
          </Route>

          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="profile" element={<div>Teacher Profile</div>} />
            <Route path="classes" element={<div>Teacher Classes</div>} />
            <Route path="gradebook" element={<div>Teacher Gradebook</div>} />
            <Route path="assignments" element={<div>Teacher Assignments</div>} />
            <Route path="schedule" element={<div>Teacher Schedule</div>} />
            <Route path="messages" element={<div>Teacher Messages</div>} />
          </Route>

          <Route path="/parent" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<ParentDashboard />} />
            <Route path="profile" element={<div>Parent Profile</div>} />
            <Route path="children" element={<div>Parent Children</div>} />
            <Route path="reports" element={<div>Parent Reports</div>} />
            <Route path="events" element={<div>Parent Events</div>} />
            <Route path="messages" element={<div>Parent Messages</div>} />
          </Route>

          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<div>Admin Profile</div>} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="website" element={<WebsiteManagement />} />
          </Route>
        </Routes>
        
        {/* React Hot Toast Container */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '10px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            },
            // Default options for specific types
            success: {
              duration: 3000,
              style: {
                background: '#10B981',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#10B981',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#EF4444',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#EF4444',
              },
            },
            loading: {
              style: {
                background: '#3B82F6',
                color: '#fff',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;