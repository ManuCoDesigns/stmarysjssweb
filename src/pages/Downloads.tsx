import React, { useState } from 'react';
import { Download, FileText, Calendar, Search, Filter } from 'lucide-react';

const Downloads: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const downloadFiles = [
    {
      id: 1,
      title: "School Admission Form 2024",
      description: "Complete admission application form for new students",
      category: "Admissions",
      type: "PDF",
      size: "2.5 MB",
      date: "2024-01-15",
      downloads: 1250,
      url: "#"
    },
    {
      id: 2,
      title: "Fee Structure 2024",
      description: "Detailed breakdown of school fees for all grade levels",
      category: "Finance",
      type: "PDF",
      size: "1.8 MB",
      date: "2024-01-10",
      downloads: 890,
      url: "#"
    },
    {
      id: 3,
      title: "Academic Calendar 2024",
      description: "Complete academic calendar with term dates and holidays",
      category: "Academic",
      type: "PDF",
      size: "1.2 MB",
      date: "2024-01-05",
      downloads: 2100,
      url: "#"
    },
    {
      id: 4,
      title: "School Uniform Guidelines",
      description: "Comprehensive guide to school uniform requirements",
      category: "General",
      type: "PDF",
      size: "3.1 MB",
      date: "2024-01-01",
      downloads: 750,
      url: "#"
    },
    {
      id: 5,
      title: "Transport Routes and Fees",
      description: "School bus routes, schedules, and transport fee structure",
      category: "Transport",
      type: "PDF",
      size: "2.0 MB",
      date: "2023-12-20",
      downloads: 650,
      url: "#"
    },
    {
      id: 6,
      title: "CBC Curriculum Guide",
      description: "Parent's guide to understanding the CBC curriculum",
      category: "Academic",
      type: "PDF",
      size: "4.2 MB",
      date: "2023-12-15",
      downloads: 1800,
      url: "#"
    },
    {
      id: 7,
      title: "Medical Form",
      description: "Student medical information and consent form",
      category: "Health",
      type: "PDF",
      size: "1.5 MB",
      date: "2023-12-10",
      downloads: 920,
      url: "#"
    },
    {
      id: 8,
      title: "Parent Handbook 2024",
      description: "Comprehensive guide for parents covering school policies",
      category: "General",
      type: "PDF",
      size: "5.8 MB",
      date: "2023-12-01",
      downloads: 1450,
      url: "#"
    },
    {
      id: 9,
      title: "Extracurricular Activities Form",
      description: "Registration form for clubs and sports activities",
      category: "Activities",
      type: "PDF",
      size: "1.1 MB",
      date: "2023-11-25",
      downloads: 580,
      url: "#"
    },
    {
      id: 10,
      title: "School Rules and Regulations",
      description: "Complete student code of conduct and school policies",
      category: "General",
      type: "PDF",
      size: "2.8 MB",
      date: "2023-11-20",
      downloads: 1100,
      url: "#"
    },
    {
      id: 11,
      title: "Grade 6 Transition Guide",
      description: "Information for Grade 6 students transitioning to Grade 7",
      category: "Academic",
      type: "PDF",
      size: "2.2 MB",
      date: "2023-11-15",
      downloads: 680,
      url: "#"
    },
    {
      id: 12,
      title: "Emergency Contact Form",
      description: "Emergency contact information and procedures",
      category: "Safety",
      type: "PDF",
      size: "1.0 MB",
      date: "2023-11-10",
      downloads: 850,
      url: "#"
    }
  ];

  const categories = ['All', ...new Set(downloadFiles.map(file => file.category))];

  const filteredFiles = downloadFiles.filter(file => {
    const matchesSearch = file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (file: any) => {
    // In a real application, this would trigger the actual download
    console.log(`Downloading: ${file.title}`);
    alert(`Downloading ${file.title}...`);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      default:
        return '📄';
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Downloads</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Access important school documents, forms, and resources. Download admission forms, 
              academic calendars, fee structures, and other essential documents.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file) => (
              <div key={file.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getFileIcon(file.type)}</span>
                    <div>
                      <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                        {file.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{file.type}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{file.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{file.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span>{file.size}</span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(file.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span>{file.downloads} downloads</span>
                </div>

                <button
                  onClick={() => handleDownload(file)}
                  className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No documents found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-amber-600 hover:text-amber-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access</h2>
            <p className="text-xl text-gray-600">Frequently downloaded documents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Admission Form", category: "Admissions", icon: "📝" },
              { title: "Fee Structure", category: "Finance", icon: "💰" },
              { title: "Academic Calendar", category: "Academic", icon: "📅" },
              { title: "Parent Handbook", category: "General", icon: "📖" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.category}</p>
                <button className="text-amber-600 hover:text-amber-800 font-medium">
                  Download Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Can't find the document you're looking for? Our office staff is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Contact Office
            </a>
            <a
              href="tel:+254712345678"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-900 transition-colors duration-200"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;