import { useState } from "react";
import {
  Download,
  FileText,
  Calendar,
  Search,
  Filter,
  Eye,
  X,
} from "lucide-react";

interface DownloadFile {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  date: string;
  downloads: number;
  url: string;
}

const Downloads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewFile, setPreviewFile] = useState<DownloadFile | null>(null);

  const downloadFiles: DownloadFile[] = [
    {
      id: 1,
      title: "School Admission Form 2026",
      description: "Complete admission application form for new students",
      category: "Admissions",
      type: "PDF",
      size: "2.5 MB",
      date: "2025-12-06",
      downloads: 34,
      url: "https://drive.google.com/uc?export=download&id=1vG4NKqnXuzLCsIfu1OekqTqkMM1l8oMS",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
      url: "#",
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
      url: "#",
    },
  ];

  const categories = [
    "All",
    ...Array.from(new Set(downloadFiles.map((file) => file.category))),
  ];

  const filteredFiles = downloadFiles.filter((file) => {
    const lower = searchTerm.toLowerCase();
    const matchesSearch =
      file.title.toLowerCase().includes(lower) ||
      file.description.toLowerCase().includes(lower);
    const matchesCategory =
      selectedCategory === "All" || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "xls":
      case "xlsx":
        return "📊";
      default:
        return "📄";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Admissions: "bg-blue-100 text-blue-800 border-blue-200",
      Finance: "bg-emerald-100 text-emerald-800 border-emerald-200",
      Academic: "bg-purple-100 text-purple-800 border-purple-200",
      General: "bg-amber-100 text-amber-800 border-amber-200",
      Transport: "bg-cyan-100 text-cyan-800 border-cyan-200",
      Health: "bg-rose-100 text-rose-800 border-rose-200",
      Activities: "bg-orange-100 text-orange-800 border-orange-200",
      Safety: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleDownload = (file: DownloadFile) => {
    if (!file.url || file.url === "#") {
      alert("This file will be available soon. Please check back later!");
      return;
    }
    window.open(file.url, "_blank");
  };

  const handlePreview = (file: DownloadFile) => {
    if (!file.url || file.url === "#") {
      alert("Preview not available for this file yet.");
      return;
    }
    setPreviewFile(file);
  };

  const getEmbedUrl = (url: string) => {
    if (!url || url === "#") return null;
    const fileIdMatch = url.match(/[?&]id=([^&]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return url;
  };

  const quickAccessItems = [
    {
      title: "Admission Form",
      category: "Admissions",
      icon: "📝",
      fileId: 1,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Fee Structure",
      category: "Finance",
      icon: "💰",
      fileId: 2,
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Academic Calendar",
      category: "Academic",
      icon: "📅",
      fileId: 3,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Parent Handbook",
      category: "General",
      icon: "📖",
      fileId: 8,
      gradient: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* Inline Styles for Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -15px rgba(245, 158, 11, 0.3);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .card-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .card-shine:hover::before {
          left: 100%;
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-28"
        style={{
          background:
            "linear-gradient(135deg, #d97706 0%, #ea580c 50%, #dc2626 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 18c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z' stroke='%23FFF' stroke-width='2' opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-6 py-2 glass-effect rounded-full animate-fade-in-up">
            <span className="text-white font-semibold text-sm tracking-wide">
              📚 RESOURCE CENTER
            </span>
          </div>
          <h1
            className="text-6xl md:text-7xl font-black tracking-tight text-white mb-6 animate-fade-in-up"
            style={{
              animationDelay: "0.1s",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            Downloads Center
          </h1>
          <p
            className="mt-6 text-2xl md:text-3xl text-white/95 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in-up"
            style={{
              animationDelay: "0.2s",
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Access all school documents, forms, policies, and academic resources
            in one convenient location
          </p>
          <div
            className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              { value: downloadFiles.length, label: "Documents", icon: "📄" },
              { value: categories.length - 1, label: "Categories", icon: "📁" },
              { value: "24/7", label: "Access", icon: "🕐" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-effect px-6 py-3 rounded-xl hover-lift"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/90">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section
        className="py-10 sticky top-0 z-40"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(254,243,199,0.95) 50%, rgba(255,255,255,0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(251,191,36,0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-xl w-full">
              <input
                type="text"
                placeholder="Search documents by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl focus:outline-none focus:ring-4 text-lg placeholder:text-gray-400"
                style={{
                  boxShadow: "0 10px 30px -10px rgba(245,158,11,0.2)",
                  border: "2px solid rgba(251,191,36,0.3)",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#f59e0b";
                  e.target.style.boxShadow = "0 0 0 4px rgba(245,158,11,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(251,191,36,0.3)";
                  e.target.style.boxShadow =
                    "0 10px 30px -10px rgba(245,158,11,0.2)";
                }}
              />
              <Search
                className="absolute left-5 top-1/2 text-amber-600 h-6 w-6"
                style={{ transform: "translateY(-50%)" }}
              />
            </div>

            <div
              className="flex items-center space-x-4 bg-white px-6 py-4 rounded-2xl"
              style={{
                boxShadow: "0 10px 30px -10px rgba(245,158,11,0.2)",
                border: "2px solid rgba(251,191,36,0.3)",
              }}
            >
              <Filter className="h-6 w-6 text-amber-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-transparent focus:ring-0 focus:outline-none text-gray-800 font-semibold text-lg cursor-pointer"
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
          {filteredFiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFiles.map((file, index) => (
                <div
                  key={file.id}
                  className="group bg-white rounded-3xl hover-lift overflow-hidden relative card-shine animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    border: "2px solid rgba(251,146,60,0.2)",
                    boxShadow: "0 4px 20px rgba(245,158,11,0.1)",
                  }}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center space-x-4">
                        <div
                          className="text-4xl transition-all duration-500"
                          style={{
                            display: "inline-block",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "scale(1.3) rotate(12deg)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                              "scale(1) rotate(0deg)";
                          }}
                        >
                          {getFileIcon(file.type)}
                        </div>
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 ${getCategoryColor(
                            file.category
                          )}`}
                        >
                          {file.category}
                        </span>
                      </div>
                      <span
                        className="text-sm font-bold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "#fef3c7",
                          color: "#92400e",
                          border: "1px solid #fbbf24",
                        }}
                      >
                        {file.type}
                      </span>
                    </div>

                    <h3
                      className="text-2xl font-bold text-gray-900 mb-3 leading-tight transition-colors duration-300"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#d97706")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#111827")
                      }
                    >
                      {file.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-2">
                      {file.description}
                    </p>

                    <div
                      className="flex items-center justify-between text-sm text-gray-600 mb-6 pb-6"
                      style={{ borderBottom: "2px solid #fef3c7" }}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="font-bold text-amber-700">
                          {file.size}
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(file.date).toLocaleDateString()}
                          </span>
                        </span>
                      </div>
                      <span
                        className="font-bold text-xs px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "#d1fae5",
                          color: "#065f46",
                          border: "1px solid #10b981",
                        }}
                      >
                        {file.downloads.toLocaleString()} ⬇
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDownload(file)}
                        className="flex-1 text-white py-4 px-6 rounded-xl flex items-center justify-center font-bold transition-all duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
                          boxShadow: "0 4px 15px rgba(245,158,11,0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 25px rgba(245,158,11,0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 15px rgba(245,158,11,0.3)";
                        }}
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download
                      </button>
                      <button
                        onClick={() => handlePreview(file)}
                        className="px-5 py-4 rounded-xl flex items-center justify-center font-bold transition-all duration-300"
                        style={{
                          background:
                            "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                          color: "#1e293b",
                          boxShadow: "0 4px 15px rgba(71,85,105,0.2)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 25px rgba(71,85,105,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 15px rgba(71,85,105,0.2)";
                        }}
                        title="Preview file"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Decorative gradient bar */}
                  <div
                    style={{
                      height: "4px",
                      background:
                        "linear-gradient(to right, #f59e0b 0%, #ea580c 50%, #dc2626 100%)",
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-20 bg-white rounded-3xl"
              style={{
                boxShadow: "0 10px 40px rgba(245,158,11,0.15)",
                border: "2px solid rgba(251,146,60,0.2)",
              }}
            >
              <FileText className="h-20 w-20 text-amber-400 mx-auto mb-6 animate-float" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No documents found
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                Try adjusting your search criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="text-white px-8 py-3 rounded-xl font-bold transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
                  boxShadow: "0 4px 15px rgba(245,158,11,0.3)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(245,158,11,0.4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(245,158,11,0.3)")
                }
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Access Section */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-block mb-4 px-6 py-2 bg-white rounded-full"
              style={{ border: "2px solid #fbbf24" }}
            >
              <span className="text-amber-700 font-bold text-sm tracking-wide">
                ⚡ QUICK ACCESS
              </span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Popular Downloads
            </h2>
            <p className="text-2xl text-gray-700 max-w-2xl mx-auto">
              Most frequently accessed documents by our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickAccessItems.map((item, index) => {
              const file = downloadFiles.find((f) => f.id === item.fileId);
              return (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-3xl text-center cursor-pointer hover-lift overflow-hidden relative"
                  style={{
                    border: "2px solid rgba(251,146,60,0.3)",
                    boxShadow: "0 10px 30px rgba(245,158,11,0.2)",
                  }}
                  onClick={() => file && handleDownload(file)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500`}
                    style={{ pointerEvents: "none" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.1")
                    }
                  />
                  <div className="relative">
                    <div
                      className="text-6xl mb-6 inline-block transition-all duration-500"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "scale(1.3) rotate(12deg)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "scale(1) rotate(0deg)";
                      }}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 font-medium">
                      {item.category}
                    </p>
                    <span className="inline-flex items-center text-amber-700 font-bold text-lg gap-2 transition-all duration-300">
                      Download Now
                      <span
                        className="transition-transform duration-300"
                        style={{ display: "inline-block" }}
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-20 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1e293b 0%, #92400e 50%, #ea580c 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23FFF' opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              Trusted by Our Community
            </h2>
            <p className="text-xl text-amber-200">
              Real-time statistics from our downloads center
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "15K+", label: "Total Downloads", icon: "📊" },
              { value: "98%", label: "Satisfaction Rate", icon: "⭐" },
              { value: "24/7", label: "Available", icon: "🕐" },
              { value: "Secure", label: "& Encrypted", icon: "🔒" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-8 rounded-2xl backdrop-blur-md transition-all duration-300 hover-lift"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                <div
                  className="text-4xl mb-3 animate-float"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  {stat.icon}
                </div>
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-sm text-amber-200 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #d97706 0%, #ea580c 50%, #dc2626 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M40 10l10 20-10 20-10-20z' stroke='%23FFF' stroke-width='2' opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 text-7xl animate-float">💬</div>
          <h2
            className="text-5xl font-black text-white mb-6"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            Need Assistance?
          </h2>
          <p className="text-2xl text-white/95 mb-10 leading-relaxed max-w-3xl mx-auto">
            Can't find the document you're looking for? Our dedicated office
            staff is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="group bg-white text-amber-700 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 inline-flex items-center justify-center hover-lift"
              style={{
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <span className="mr-3 text-2xl">📧</span>
              Contact Office
              <span
                className="ml-2 transition-transform duration-300 inline-block"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateX(8px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateX(0)")
                }
              >
                →
              </span>
            </a>
            <a
              href="tel:+254712345678"
              className="group bg-transparent text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 inline-flex items-center justify-center hover-lift"
              style={{
                border: "4px solid white",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#d97706";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "white";
              }}
            >
              <span className="mr-3 text-2xl">📞</span>
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {previewFile && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in-up"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              border: "4px solid #fbbf24",
            }}
          >
            <div
              className="flex items-center justify-between p-8"
              style={{
                background:
                  "linear-gradient(to right, #fef3c7 0%, #fed7aa 100%)",
                borderBottom: "2px solid #fbbf24",
              }}
            >
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  {previewFile.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {previewFile.description}
                </p>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-gray-500 hover:text-gray-700 transition-all bg-white p-3 rounded-full"
                style={{
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "rotate(90deg)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "rotate(0deg)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.1)";
                }}
              >
                <X className="h-8 w-8" />
              </button>
            </div>
            <div
              className="flex-1 overflow-hidden min-h-[500px]"
              style={{ backgroundColor: "#f1f5f9" }}
            >
              {getEmbedUrl(previewFile.url) ? (
                <iframe
                  src={getEmbedUrl(previewFile.url)!}
                  className="w-full h-full border-0"
                  allow="autoplay"
                  title={previewFile.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-24 w-24 text-gray-400 mx-auto mb-6 animate-float" />
                    <p className="text-gray-600 text-2xl font-bold">
                      Preview not available
                    </p>
                    <p className="text-gray-500 mt-2">
                      This file type cannot be previewed
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div
              className="flex gap-4 p-8"
              style={{
                background:
                  "linear-gradient(to right, #fef3c7 0%, #fed7aa 100%)",
                borderTop: "2px solid #fbbf24",
              }}
            >
              <button
                onClick={() => handleDownload(previewFile)}
                className="flex-1 text-white py-5 px-6 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
                  boxShadow: "0 10px 30px rgba(245,158,11,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(245,158,11,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(245,158,11,0.3)";
                }}
              >
                <Download className="h-6 w-6 mr-3" />
                Download File
              </button>
              <button
                onClick={() => setPreviewFile(null)}
                className="flex-1 py-5 px-6 rounded-2xl font-bold text-lg transition-all duration-300"
                style={{
                  backgroundColor: "#e2e8f0",
                  color: "#1e293b",
                  boxShadow: "0 10px 30px rgba(71,85,105,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.backgroundColor = "#cbd5e1";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(71,85,105,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(71,85,105,0.2)";
                }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Downloads;
