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
      url: "https://drive.google.com/uc?export=download&id=1vG4NKqnXuzLCsIfu1OekqTqkMM1l8oMS"
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

  const categories = ['All', ...Array.from(new Set(downloadFiles.map(file => file.category)))];

  const filteredFiles = downloadFiles.filter(file => {
    const lower = searchTerm.toLowerCase();
    const matchesSearch = file.title.toLowerCase().includes(lower) || file.description.toLowerCase().includes(lower);
    const matchesCategory = selectedCategory === 'All' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const handleOpen = (file: any) => {
    if (!file.url || file.url === '#') {
      alert('This file will be available soon. Please check back later!');
      return;
    }
    // open in new tab to let Google Drive handle download
    window.open(file.url, '_blank');
  };

  return (
    <>
      <div>
        <section className="relative overflow-hidden py-28 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
              Downloads Center
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto">
              Access all school documents, forms, policies, and academic resources.
            </p>
          </div>
        </section>

        <section className="py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">

              <div className="relative flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-md shadow-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-600 transition"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-700 h-6 w-6" />
              </div>

              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-md shadow-sm px-4 py-3 border border-gray-200 rounded-xl">
                <Filter className="h-5 w-5 text-amber-700" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-2 py-1 bg-transparent focus:ring-0 focus:outline-none text-gray-700 font-medium"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getFileIcon(file.type)}</span>
                      <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold">
                        {file.category}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm font-medium">{file.type}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                    {file.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                    {file.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{file.size}</span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(file.date).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="font-medium">{file.downloads} downloads</span>
                  </div>

                  <button
                    onClick={() => handleOpen(file)}
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 px-4 rounded-lg flex items-center justify-center font-semibold shadow-md hover:shadow-xl transition duration-300"
                  >
                    <Download className="h-5 w-5 mr-2" />
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
      </div>

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
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300 border border-gray-100"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.category}</p>
                <button className="text-amber-700 hover:text-amber-900 font-semibold">
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
          <p className="text-xl text-amber-200 mb-8">
            Can't find the document you're looking for? Our office staff is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition duration-200 shadow-md hover:shadow-xl"
            >
              Contact Office
            </a>
            <a
              href="tel:+254712345678"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-amber-900 transition duration-200 shadow-md hover:shadow-xl"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Downloads;