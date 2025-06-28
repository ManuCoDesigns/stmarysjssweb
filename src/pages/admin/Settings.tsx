import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../../components/ConfirmDialog';
import { 
  Settings, 
  School, 
  Mail, 
  Shield, 
  Database, 
  Bell, 
  Palette, 
  Globe, 
  Save, 
  RefreshCw,
  Upload,
  Download,
  Eye,
  EyeOff,
  Key,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
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

  const [generalSettings, setGeneralSettings] = useState({
    schoolName: 'St. Mary\'s School',
    schoolAddress: '123 Education Street, Nairobi, Kenya',
    schoolPhone: '+254 712 345 678',
    schoolEmail: 'info@stmarysschool.ac.ke',
    schoolWebsite: 'www.stmarysschool.ac.ke',
    principalName: 'Mrs. Catherine Wanjiku',
    principalEmail: 'principal@stmarysschool.ac.ke',
    academicYear: '2024',
    currentTerm: 'Term 2',
    timezone: 'Africa/Nairobi',
    language: 'English'
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@stmarysschool.ac.ke',
    smtpPassword: '',
    fromName: 'St. Mary\'s School',
    fromEmail: 'noreply@stmarysschool.ac.ke',
    enableEmailNotifications: true,
    enableSMSNotifications: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enableTwoFactor: false,
    allowMultipleSessions: true,
    ipWhitelist: '',
    enableAuditLog: true
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    enableBackups: true,
    backupFrequency: 'daily',
    maxFileSize: 10,
    allowedFileTypes: 'pdf,doc,docx,jpg,png,gif',
    enableCaching: true,
    debugMode: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      newEnrollment: true,
      feePayments: true,
      examResults: true,
      attendance: true,
      announcements: true
    },
    smsNotifications: {
      emergencyAlerts: true,
      feeReminders: true,
      examSchedules: true,
      parentMeetings: true
    },
    pushNotifications: {
      assignments: true,
      grades: true,
      events: true,
      messages: true
    }
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    logoUrl: '',
    faviconUrl: '',
    customCSS: '',
    enableDarkMode: false,
    compactLayout: false
  });

  const tabs = [
    { id: 'general', name: 'General', icon: School },
    { id: 'email', name: 'Email & SMS', icon: Mail },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'system', name: 'System', icon: Database },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  const handleSaveSettings = (settingsType: string) => {
    const loadingToast = toast.loading(`Saving ${settingsType} settings...`);
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success(`${settingsType} settings saved successfully!`, {
        duration: 4000,
        icon: '✅',
      });
    }, 1500);
  };

  const handleResetSettings = (settingsType: string) => {
    setConfirmDialog({
      isOpen: true,
      title: `Reset ${settingsType} Settings`,
      message: `Are you sure you want to reset all ${settingsType} settings to default values? This action cannot be undone.`,
      type: 'warning',
      onConfirm: () => {
        const loadingToast = toast.loading(`Resetting ${settingsType} settings...`);
        
        setTimeout(() => {
          toast.dismiss(loadingToast);
          toast.success(`${settingsType} settings reset to defaults!`, {
            duration: 4000,
            icon: '🔄',
          });
        }, 1000);
      }
    });
  };

  const handleBackupSystem = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Create System Backup',
      message: 'This will create a complete backup of all system data and settings. The process may take several minutes. Continue?',
      type: 'info',
      onConfirm: () => {
        const loadingToast = toast.loading('Creating system backup...');
        
        setTimeout(() => {
          toast.dismiss(loadingToast);
          toast.success('System backup created successfully!', {
            duration: 5000,
            icon: '💾',
          });
        }, 3000);
      }
    });
  };

  const handleRestoreSystem = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Restore System',
      message: 'This will restore the system from a backup file. All current data will be replaced. Are you sure you want to continue?',
      type: 'danger',
      onConfirm: () => {
        const loadingToast = toast.loading('Restoring system from backup...');
        
        setTimeout(() => {
          toast.dismiss(loadingToast);
          toast.success('System restored successfully!', {
            duration: 5000,
            icon: '🔄',
          });
        }, 4000);
      }
    });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
          <input
            type="text"
            value={generalSettings.schoolName}
            onChange={(e) => setGeneralSettings({...generalSettings, schoolName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Principal Name</label>
          <input
            type="text"
            value={generalSettings.principalName}
            onChange={(e) => setGeneralSettings({...generalSettings, principalName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">School Address</label>
        <textarea
          value={generalSettings.schoolAddress}
          onChange={(e) => setGeneralSettings({...generalSettings, schoolAddress: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Phone</label>
          <input
            type="tel"
            value={generalSettings.schoolPhone}
            onChange={(e) => setGeneralSettings({...generalSettings, schoolPhone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Email</label>
          <input
            type="email"
            value={generalSettings.schoolEmail}
            onChange={(e) => setGeneralSettings({...generalSettings, schoolEmail: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
          <select
            value={generalSettings.academicYear}
            onChange={(e) => setGeneralSettings({...generalSettings, academicYear: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Term</label>
          <select
            value={generalSettings.currentTerm}
            onChange={(e) => setGeneralSettings({...generalSettings, currentTerm: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => handleResetSettings('General')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Reset to Defaults
        </button>
        <button
          onClick={() => handleSaveSettings('General')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
          <input
            type="text"
            value={emailSettings.smtpHost}
            onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
          <input
            type="text"
            value={emailSettings.smtpPort}
            onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
          <input
            type="text"
            value={emailSettings.smtpUsername}
            onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={emailSettings.smtpPassword}
              onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableEmailNotifications"
            checked={emailSettings.enableEmailNotifications}
            onChange={(e) => setEmailSettings({...emailSettings, enableEmailNotifications: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enableEmailNotifications" className="ml-2 block text-sm text-gray-900">
            Enable Email Notifications
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableSMSNotifications"
            checked={emailSettings.enableSMSNotifications}
            onChange={(e) => setEmailSettings({...emailSettings, enableSMSNotifications: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enableSMSNotifications" className="ml-2 block text-sm text-gray-900">
            Enable SMS Notifications
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => handleResetSettings('Email')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Reset to Defaults
        </button>
        <button
          onClick={() => handleSaveSettings('Email')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
          <input
            type="number"
            value={securitySettings.passwordMinLength}
            onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireSpecialChars"
            checked={securitySettings.requireSpecialChars}
            onChange={(e) => setSecuritySettings({...securitySettings, requireSpecialChars: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="requireSpecialChars" className="ml-2 block text-sm text-gray-900">
            Require Special Characters in Passwords
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireNumbers"
            checked={securitySettings.requireNumbers}
            onChange={(e) => setSecuritySettings({...securitySettings, requireNumbers: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="requireNumbers" className="ml-2 block text-sm text-gray-900">
            Require Numbers in Passwords
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableTwoFactor"
            checked={securitySettings.enableTwoFactor}
            onChange={(e) => setSecuritySettings({...securitySettings, enableTwoFactor: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enableTwoFactor" className="ml-2 block text-sm text-gray-900">
            Enable Two-Factor Authentication
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableAuditLog"
            checked={securitySettings.enableAuditLog}
            onChange={(e) => setSecuritySettings({...securitySettings, enableAuditLog: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enableAuditLog" className="ml-2 block text-sm text-gray-900">
            Enable Audit Logging
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => handleResetSettings('Security')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Reset to Defaults
        </button>
        <button
          onClick={() => handleSaveSettings('Security')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
          <select
            value={systemSettings.backupFrequency}
            onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
          <input
            type="number"
            value={systemSettings.maxFileSize}
            onChange={(e) => setSystemSettings({...systemSettings, maxFileSize: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Allowed File Types</label>
        <input
          type="text"
          value={systemSettings.allowedFileTypes}
          onChange={(e) => setSystemSettings({...systemSettings, allowedFileTypes: e.target.value})}
          placeholder="pdf,doc,docx,jpg,png,gif"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="maintenanceMode"
            checked={systemSettings.maintenanceMode}
            onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-900">
            Maintenance Mode
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableBackups"
            checked={systemSettings.enableBackups}
            onChange={(e) => setSystemSettings({...systemSettings, enableBackups: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enableBackups" className="ml-2 block text-sm text-gray-900">
            Enable Automatic Backups
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableCaching"
            checked={systemSettings.enableCaching}
            onChange={(e) => setSystemSettings({...systemSettings, enableCaching: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="enableCaching" className="ml-2 block text-sm text-gray-900">
            Enable System Caching
          </label>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Backup & Restore</h3>
        <div className="flex space-x-4">
          <button
            onClick={handleBackupSystem}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Create Backup
          </button>
          <button
            onClick={handleRestoreSystem}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Restore System
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => handleResetSettings('System')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Reset to Defaults
        </button>
        <button
          onClick={() => handleSaveSettings('System')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'email': return renderEmailSettings();
      case 'security': return renderSecuritySettings();
      case 'system': return renderSystemSettings();
      case 'notifications': return <div className="text-center py-12 text-gray-500">Notification settings coming soon...</div>;
      case 'appearance': return <div className="text-center py-12 text-gray-500">Appearance settings coming soon...</div>;
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600 mt-1">Configure school system preferences and security</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => toast.success('Settings exported successfully!')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Settings
            </button>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

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

export default AdminSettings;