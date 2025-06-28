import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download, 
  Calendar, 
  Filter, 
  Users, 
  DollarSign, 
  BookOpen, 
  Award,
  FileText,
  Eye,
  Share,
  Printer,
  RefreshCw
} from 'lucide-react';

const AdminReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-03-31'
  });

  const reportTypes = [
    { id: 'overview', name: 'School Overview', icon: BarChart3, description: 'Comprehensive school statistics' },
    { id: 'academic', name: 'Academic Performance', icon: Award, description: 'Student grades and achievements' },
    { id: 'financial', name: 'Financial Report', icon: DollarSign, description: 'Revenue and expenses analysis' },
    { id: 'attendance', name: 'Attendance Report', icon: Users, description: 'Student and staff attendance' },
    { id: 'enrollment', name: 'Enrollment Report', icon: BookOpen, description: 'Student enrollment trends' },
  ];

  const quickStats = [
    { label: 'Total Students', value: '512', change: '+12', trend: 'up', color: 'blue' },
    { label: 'Total Teachers', value: '28', change: '+2', trend: 'up', color: 'green' },
    { label: 'Monthly Revenue', value: 'KES 2.8M', change: '+8%', trend: 'up', color: 'yellow' },
    { label: 'Average Attendance', value: '94%', change: '+2%', trend: 'up', color: 'purple' },
  ];

  const academicData = [
    { grade: 'Grade 1', students: 45, avgGrade: 'B+', passRate: '96%', topPerformers: 8 },
    { grade: 'Grade 2', students: 48, avgGrade: 'B+', passRate: '94%', topPerformers: 9 },
    { grade: 'Grade 3', students: 47, avgGrade: 'A-', passRate: '98%', topPerformers: 12 },
    { grade: 'Grade 4', students: 50, avgGrade: 'B+', passRate: '92%', topPerformers: 10 },
    { grade: 'Grade 5', students: 52, avgGrade: 'B', passRate: '90%', topPerformers: 8 },
    { grade: 'Grade 6', students: 48, avgGrade: 'B+', passRate: '95%', topPerformers: 11 },
    { grade: 'Grade 7', students: 55, avgGrade: 'B', passRate: '88%', topPerformers: 9 },
    { grade: 'Grade 8', students: 53, avgGrade: 'B+', passRate: '91%', topPerformers: 10 },
    { grade: 'Grade 9', students: 48, avgGrade: 'B+', passRate: '93%', topPerformers: 12 },
    { grade: 'Grade 10', students: 56, avgGrade: 'A-', passRate: '96%', topPerformers: 15 },
  ];

  const financialData = [
    { month: 'January', revenue: 2650000, expenses: 1800000, profit: 850000 },
    { month: 'February', revenue: 2750000, expenses: 1850000, profit: 900000 },
    { month: 'March', revenue: 2800000, expenses: 1900000, profit: 900000 },
  ];

  const attendanceData = [
    { grade: 'Grade 1', students: 45, present: 43, absent: 2, rate: '96%' },
    { grade: 'Grade 2', students: 48, present: 45, absent: 3, rate: '94%' },
    { grade: 'Grade 3', students: 47, present: 46, absent: 1, rate: '98%' },
    { grade: 'Grade 4', students: 50, present: 47, absent: 3, rate: '94%' },
    { grade: 'Grade 5', students: 52, present: 48, absent: 4, rate: '92%' },
    { grade: 'Grade 6', students: 48, present: 46, absent: 2, rate: '96%' },
    { grade: 'Grade 7', students: 55, present: 51, absent: 4, rate: '93%' },
    { grade: 'Grade 8', students: 53, present: 49, absent: 4, rate: '92%' },
    { grade: 'Grade 9', students: 48, present: 45, absent: 3, rate: '94%' },
    { grade: 'Grade 10', students: 56, present: 54, absent: 2, rate: '96%' },
  ];

  const enrollmentTrends = [
    { year: '2020', students: 420, growth: '5%' },
    { year: '2021', students: 445, growth: '6%' },
    { year: '2022', students: 475, growth: '7%' },
    { year: '2023', students: 500, growth: '5%' },
    { year: '2024', students: 512, growth: '2%' },
  ];

  const generateReport = (reportType: string) => {
    const loadingToast = toast.loading(`Generating ${reportType} report...`);
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success(`${reportType} report generated successfully!`, {
        duration: 4000,
        icon: '📊',
      });
    }, 2000);
  };

  const exportReport = (format: string) => {
    const loadingToast = toast.loading(`Exporting report as ${format.toUpperCase()}...`);
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success(`Report exported as ${format.toUpperCase()} successfully!`, {
        duration: 4000,
        icon: '📄',
      });
    }, 1500);
  };

  const shareReport = () => {
    toast.success('Report sharing link copied to clipboard!', {
      duration: 3000,
      icon: '🔗',
    });
  };

  const printReport = () => {
    toast.success('Report sent to printer!', {
      duration: 3000,
      icon: '🖨️',
    });
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Student Distribution by Grade</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would appear here</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcademicReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Academic Performance by Grade</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Grade</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Students</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Avg Grade</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Pass Rate</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Top Performers</th>
              </tr>
            </thead>
            <tbody>
              {academicData.map((grade, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-6 font-medium text-gray-900">{grade.grade}</td>
                  <td className="py-3 px-6 text-gray-600">{grade.students}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      grade.avgGrade.startsWith('A') ? 'bg-green-100 text-green-700' :
                      grade.avgGrade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {grade.avgGrade}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-gray-600">{grade.passRate}</td>
                  <td className="py-3 px-6 text-gray-600">{grade.topPerformers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">KES 8.2M</p>
          <p className="text-sm text-gray-600 mt-1">Q1 2024</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">KES 5.55M</p>
          <p className="text-sm text-gray-600 mt-1">Q1 2024</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Net Profit</h3>
          <p className="text-3xl font-bold text-blue-600">KES 2.65M</p>
          <p className="text-sm text-gray-600 mt-1">Q1 2024</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Monthly Financial Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Month</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Expenses</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Profit</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Margin</th>
              </tr>
            </thead>
            <tbody>
              {financialData.map((month, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-6 font-medium text-gray-900">{month.month}</td>
                  <td className="py-3 px-6 text-green-600">KES {(month.revenue / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-6 text-red-600">KES {(month.expenses / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-6 text-blue-600">KES {(month.profit / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-6 text-gray-600">{((month.profit / month.revenue) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAttendanceReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Daily Attendance by Grade</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Grade</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Total Students</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Present</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Absent</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Attendance Rate</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((grade, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-6 font-medium text-gray-900">{grade.grade}</td>
                  <td className="py-3 px-6 text-gray-600">{grade.students}</td>
                  <td className="py-3 px-6 text-green-600">{grade.present}</td>
                  <td className="py-3 px-6 text-red-600">{grade.absent}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      parseInt(grade.rate) >= 95 ? 'bg-green-100 text-green-700' :
                      parseInt(grade.rate) >= 90 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {grade.rate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEnrollmentReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Enrollment Trends (5 Years)</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {enrollmentTrends.map((year, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{year.year}</p>
                  <p className="text-sm text-gray-600">Academic Year</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{year.students}</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-green-600">{year.growth}</p>
                  <p className="text-sm text-gray-600">Growth</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview': return renderOverviewReport();
      case 'academic': return renderAcademicReport();
      case 'financial': return renderFinancialReport();
      case 'attendance': return renderAttendanceReport();
      case 'enrollment': return renderEnrollmentReport();
      default: return renderOverviewReport();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Generate comprehensive reports and insights</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={shareReport}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </button>
            <button
              onClick={printReport}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-4 rounded-lg border-2 transition-colors text-left ${
              selectedReport === report.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <report.icon className={`h-6 w-6 mb-2 ${
              selectedReport === report.id ? 'text-blue-600' : 'text-gray-600'
            }`} />
            <h3 className="font-medium text-gray-900">{report.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{report.description}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            {selectedPeriod === 'custom' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => generateReport(selectedReport)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <div className="relative">
              <button
                onClick={() => exportReport('pdf')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </button>
            </div>
            <button
              onClick={() => exportReport('excel')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {reportTypes.find(r => r.id === selectedReport)?.name} Report
          </h2>
          <div className="text-sm text-gray-600">
            Generated on {new Date().toLocaleDateString()}
          </div>
        </div>
        
        {renderReportContent()}
      </div>
    </div>
  );
};

export default AdminReports;