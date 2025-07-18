import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Video, Image as ImageIcon, Play, MoreVertical, Share, Filter, Search, Plus, Shield } from 'lucide-react';
import PrivacyCard from '../components/PrivacyCard';
//import PrivacyCard from './components/PrivacyCard';

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  uploadDate: string;
  uploadedBy: string;
  duration?: string;
}

const Gallery: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mediaType, setMediaType] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [uploadType, setUploadType] = useState<'photo' | 'video'>('photo');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'Campus',
    file: null as File | null
  });

  // Content Protection Effects
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12 (Developer Tools)
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      
      // Disable Ctrl+S (Save)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
      
      // Disable Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      
      // Disable Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      
      // Disable Ctrl+A (Select All)
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable printing
    const handleBeforePrint = (e: Event) => {
      e.preventDefault();
      alert('Printing is disabled for this content.');
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('beforeprint', handleBeforePrint);

    // Add CSS protection
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
      
      img, video {
        pointer-events: none !important;
      }
      
      @media print {
        * {
          display: none !important;
        }
        body::before {
          content: "Printing is not allowed for this content." !important;
          display: block !important;
          font-size: 24px !important;
          text-align: center !important;
          margin-top: 50px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('beforeprint', handleBeforePrint);
      document.head.removeChild(style);
    };
  }, []);

  const galleryMedia: MediaItem[] = [
    {
      id: 1,
      type: 'image',
      src: "https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=600",
      thumbnail: "https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "School building exterior",
      category: "Campus",
      title: "Main School Building",
      description: "Our beautiful main building houses modern classrooms and administrative offices.",
      uploadDate: "2024-03-15",
      uploadedBy: "Admin"
    },
    {
      id: 2,
      type: 'video',
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Virtual school tour",
      category: "Campus",
      title: "Virtual School Tour",
      description: "Take a virtual tour of our campus facilities and see what makes St. Mary's special.",
      duration: "3:45",
      uploadDate: "2024-03-14",
      uploadedBy: "Marketing Team"
    },
    {
      id: 3,
      type: 'image',
      src: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600",
      thumbnail: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Modern classroom",
      category: "Facilities",
      title: "Modern Classroom",
      description: "State-of-the-art classrooms equipped with interactive whiteboards and modern technology.",
      uploadDate: "2024-03-13",
      uploadedBy: "Admin"
    },
    {
      id: 4,
      type: 'video',
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      thumbnail: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Students learning",
      category: "Academic",
      title: "Interactive Learning Session",
      description: "Watch our students engage in collaborative learning activities and group discussions.",
      duration: "2:30",
      uploadDate: "2024-03-12",
      uploadedBy: "Academic Department"
    },
    {
      id: 5,
      type: 'image',
      src: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600",
      thumbnail: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Students in classroom",
      category: "Academic",
      title: "Students Learning",
      description: "Our students actively participating in classroom discussions and collaborative learning.",
      uploadDate: "2024-03-11",
      uploadedBy: "Teacher"
    },
    {
      id: 6,
      type: 'video',
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Science experiment",
      category: "Facilities",
      title: "Science Lab Experiments",
      description: "Students conducting exciting experiments in our well-equipped science laboratory.",
      duration: "4:15",
      uploadDate: "2024-03-10",
      uploadedBy: "Science Department"
    },
    {
      id: 7,
      type: 'image',
      src: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600",
      thumbnail: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Science laboratory",
      category: "Facilities",
      title: "Science Laboratory",
      description: "Our modern science laboratory with advanced equipment for hands-on learning.",
      uploadDate: "2024-03-09",
      uploadedBy: "Admin"
    },
    {
      id: 8,
      type: 'video',
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      thumbnail: "https://images.pexels.com/photos/2105028/pexels-photo-2105028.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Sports activities",
      category: "Sports",
      title: "Annual Sports Day Highlights",
      description: "Exciting moments from our annual sports day featuring various athletic competitions.",
      duration: "5:20",
      uploadDate: "2024-03-08",
      uploadedBy: "Sports Department"
    },
    {
      id: 9,
      type: 'image',
      src: "https://images.pexels.com/photos/2105028/pexels-photo-2105028.jpeg?auto=compress&cs=tinysrgb&w=600",
      thumbnail: "https://images.pexels.com/photos/2105028/pexels-photo-2105028.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Sports activities",
      category: "Sports",
      title: "Athletic Training",
      description: "Students participating in various sports and athletic training sessions.",
      uploadDate: "2024-03-07",
      uploadedBy: "Sports Coach"
    },
    {
      id: 10,
      type: 'video',
      src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=300",
      alt: "Graduation ceremony",
      category: "Events",
      title: "Graduation Ceremony 2024",
      description: "Celebrating our graduating class and their achievements in this memorable ceremony.",
      duration: "8:45",
      uploadDate: "2024-03-06",
      uploadedBy: "Admin"
    }
  ];

  const categories = ['All', 'Campus', 'Facilities', 'Academic', 'Sports', 'Events'];
  const mediaTypes = ['All', 'Photos', 'Videos'];

  const filteredMedia = galleryMedia.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = mediaType === 'All' || 
      (mediaType === 'Photos' && item.type === 'image') || 
      (mediaType === 'Videos' && item.type === 'video');
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if ((uploadType === 'photo' && !isImage) || (uploadType === 'video' && !isVideo)) {
        alert(`Please select a valid ${uploadType} file.`);
        return;
      }
      
      const maxSize = uploadType === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`File size must be less than ${uploadType === 'video' ? '50MB' : '10MB'}.`);
        return;
      }
      
      setUploadForm({ ...uploadForm, file });
    }
  };

  const handleUploadSubmit = () => {
    if (!isVerified) {
      alert('Please verify your authorization first.');
      return;
    }
    
    if (!uploadForm.title || !uploadForm.file) {
      alert('Please fill in all required fields and select a file.');
      return;
    }
    
    console.log('Uploading:', uploadForm);
    alert(`${uploadType === 'photo' ? 'Photo' : 'Video'} uploaded successfully!`);
    
    setUploadForm({ title: '', description: '', category: 'Campus', file: null });
    setShowUploadModal(false);
  };

  const handleUploadClick = () => {
    if (!isVerified) {
      setShowVerificationModal(true);
    } else {
      setShowUploadModal(true);
    }
  };

  const handleVerification = () => {
    // Simple verification codes - you can change these
    const validCodes = ['SCHOOL2024', 'ADMIN123', 'TEACHER2024', 'STAFF123'];
    
    if (validCodes.includes(verificationCode.toUpperCase())) {
      setIsVerified(true);
      setShowVerificationModal(false);
      setShowUploadModal(true);
      setVerificationCode('');
      setVerificationError('');
      alert('Verification successful! You can now upload media.');
    } else {
      setVerificationError('Invalid verification code. Please contact the school administration.');
    }
  };

  const handleShare = (media: MediaItem) => {
    if (navigator.share) {
      navigator.share({
        title: media.title,
        text: media.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Secure Image Component with Canvas Protection
  const SecureImage: React.FC<{ src: string; alt: string; className?: string; onClick?: () => void }> = ({ 
    src, 
    alt, 
    className, 
    onClick 
  }) => {
    const [canvasDataUrl, setCanvasDataUrl] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            // Add watermark
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.font = '20px Arial';
            ctx.fillText('St. Mary\'s School', 20, 40);
            
            // Add protective overlay pattern
            ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
            for (let i = 0; i < canvas.width; i += 50) {
              for (let j = 0; j < canvas.height; j += 50) {
                ctx.fillRect(i, j, 2, 2);
              }
            }
            
            setCanvasDataUrl(canvas.toDataURL('image/jpeg', 0.8));
          }
        }
      };
      img.onerror = () => {
        console.error('Failed to load image:', src);
      };
      img.src = src;
    }, [src]);

    return (
      <div className="relative">
        <canvas ref={canvasRef} className="hidden" />
        {canvasDataUrl && (
          <img
            src={canvasDataUrl}
            alt={alt}
            className={className}
            onClick={onClick}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            style={{ 
              userSelect: 'none',
              pointerEvents: onClick ? 'auto' : 'none'
            }}
          />
        )}
        {/* Invisible overlay to prevent right-click */}
        <div 
          className="absolute inset-0 bg-transparent cursor-pointer"
          onClick={onClick}
          style={{ userSelect: 'none' }}
        />
      </div>
    );
  };

  // Secure Video Component
  const SecureVideo: React.FC<{ media: MediaItem }> = ({ media }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const video = videoRef.current;
      if (video) {
        video.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Use setAttribute to set controlsList to avoid TypeScript errors
        video.setAttribute('controlsList', 'nodownload noremoteplayback');
      }
    }, []);

    return (
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-auto max-h-96"
          controls
          poster={media.thumbnail}
          preload="metadata"
          onContextMenu={(e) => e.preventDefault()}
          style={{ userSelect: 'none' }}
        >
          <source src={media.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Invisible overlay for additional protection */}
        <div 
          className="absolute inset-0 bg-transparent pointer-events-none"
          style={{ userSelect: 'none' }}
        />
        
        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pointer-events-none">
          <h3 className="text-white font-semibold text-lg">{media.title}</h3>
          <p className="text-gray-300 text-sm">{media.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-400 text-xs">Duration: {media.duration}</span>
            <span className="text-gray-400 text-xs">Uploaded: {media.uploadDate}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="select-none" style={{ userSelect: 'none' }}>
      {/* Privacy Protection Card */}
      <PrivacyCard />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Secure Media Gallery</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Explore our vibrant school community through protected photos and videos that capture the essence of learning, 
              growth, and memorable moments at St. Mary's School.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Upload */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {mediaTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <button
                onClick={handleUploadClick}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
                  isVerified 
                    ? 'bg-teal-600 text-white hover:bg-teal-700' 
                    : 'bg-gray-400 text-white hover:bg-gray-500'
                }`}
              >
                {isVerified ? (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    Upload Media
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Verify to Upload
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-teal-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((media, index) => (
              <div
                key={media.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                {/* Media Thumbnail */}
                <div 
                  className="relative h-64 overflow-hidden"
                  onClick={() => setSelectedMedia(index)}
                >
                  <SecureImage
                    src={media.thumbnail}
                    alt={media.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Media Type Indicator */}
                  <div className="absolute top-2 left-2 pointer-events-none">
                    {media.type === 'video' ? (
                      <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        {media.duration}
                      </div>
                    ) : (
                      <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center text-xs">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        Photo
                      </div>
                    )}
                  </div>

                  {/* Play Button for Videos */}
                  {media.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-white bg-opacity-90 rounded-full p-3">
                        <Play className="h-8 w-8 text-teal-600" />
                      </div>
                    </div>
                  )}

                  {/* Protection Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Media Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{media.title}</h3>
                    <div className="relative">
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">{media.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded">{media.category}</span>
                    <span>{media.uploadDate}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(media);
                      }}
                      className="bg-white bg-opacity-90 text-gray-700 p-2 rounded-full hover:bg-opacity-100 transition-colors"
                      title="Share"
                    >
                      <Share className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                {mediaType === 'Videos' ? <Video className="h-16 w-16 mx-auto" /> : <ImageIcon className="h-16 w-16 mx-auto" />}
              </div>
              <p className="text-gray-500 text-lg">No {mediaType.toLowerCase()} found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setMediaType('All');
                }}
                className="mt-4 text-teal-600 hover:text-teal-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Media Modal */}
      {selectedMedia !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-6xl max-h-full w-full">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="h-6 w-6" />
            </button>
            
            {filteredMedia[selectedMedia].type === 'video' ? (
              <SecureVideo media={filteredMedia[selectedMedia]} />
            ) : (
              <div className="relative">
                <SecureImage
                  src={filteredMedia[selectedMedia].src}
                  alt={filteredMedia[selectedMedia].alt}
                  className="max-w-full max-h-screen object-contain rounded-lg"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <h3 className="text-xl font-semibold mb-2">{filteredMedia[selectedMedia].title}</h3>
                  <p className="text-gray-300">{filteredMedia[selectedMedia].description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400 text-sm">{filteredMedia[selectedMedia].category}</span>
                    <span className="text-gray-400 text-sm">Uploaded: {filteredMedia[selectedMedia].uploadDate}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            {selectedMedia > 0 && (
              <button
                onClick={() => setSelectedMedia(selectedMedia - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-3xl bg-black bg-opacity-50 rounded-full p-2"
              >
                ‹
              </button>
            )}
            
            {selectedMedia < filteredMedia.length - 1 && (
              <button
                onClick={() => setSelectedMedia(selectedMedia + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-3xl bg-black bg-opacity-50 rounded-full p-2"
              >
                ›
              </button>
            )}

            {/* Media Actions */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => handleShare(filteredMedia[selectedMedia])}
                className="bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-colors"
                title="Share"
              >
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Shield className="h-5 w-5 mr-2 text-teal-600" />
                Upload Verification Required
              </h3>
              <button onClick={() => {
                setShowVerificationModal(false);
                setVerificationCode('');
                setVerificationError('');
              }}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">
                      Authorization Required
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      To maintain content quality and prevent spam, uploading requires a verification code. 
                      Contact the school administration to obtain an upload code.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                    setVerificationError('');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter verification code"
                  onKeyPress={(e) => e.key === 'Enter' && handleVerification()}
                />
                {verificationError && (
                  <p className="text-red-600 text-sm mt-1">{verificationError}</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">
                  <strong>Need a verification code?</strong><br />
                  Contact the school office at: <br />
                  📧 admin@stmarysschool.edu<br />
                  📞 (555) 123-4567
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleVerification}
                  disabled={!verificationCode.trim()}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Verify & Continue
                </button>
                <button
                  onClick={() => {
                    setShowVerificationModal(false);
                    setVerificationCode('');
                    setVerificationError('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Upload className="h-5 w-5 mr-2 text-teal-600" />
                Upload Media
              </h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {isVerified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-green-800 font-medium">Verified - Upload authorized</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setUploadType('photo')}
                    className={`flex-1 p-3 border-2 rounded-lg flex items-center justify-center ${
                      uploadType === 'photo' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
                    }`}
                  >
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Photo
                  </button>
                  <button
                    onClick={() => setUploadType('video')}
                    className={`flex-1 p-3 border-2 rounded-lg flex items-center justify-center ${
                      uploadType === 'video' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
                    }`}
                  >
                    <Video className="h-5 w-5 mr-2" />
                    Video
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select {uploadType === 'photo' ? 'Image' : 'Video'} File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept={uploadType === 'photo' ? 'image/*' : 'video/*'}
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {uploadType === 'photo' ? 'PNG, JPG, GIF up to 10MB' : 'MP4, MOV, AVI up to 50MB'}
                    </p>
                  </label>
                  {uploadForm.file && (
                    <p className="text-sm text-teal-600 mt-2">
                      Selected: {uploadForm.file.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter media title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter media description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {categories.filter(cat => cat !== 'All').map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleUploadSubmit}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
                >
                  Upload {uploadType === 'photo' ? 'Photo' : 'Video'}
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to See More?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Schedule a visit to experience our facilities firsthand and meet our dedicated team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200">
              Schedule Campus Tour
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-900 transition-colors duration-200">
              Contact Admissions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
