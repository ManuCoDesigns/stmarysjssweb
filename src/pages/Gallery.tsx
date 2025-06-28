import React, { useState } from 'react';
import { X, Upload, Video, Image, Play, Pause, Volume2, VolumeX, MoreVertical, Download, Share, Edit, Trash2, Filter, Search, Plus } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mediaType, setMediaType] = useState('All'); // All, Photos, Videos
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'photo' | 'video'>('photo');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: 'Campus',
    file: null as File | null
  });

  const galleryMedia = [
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
      // Validate file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if ((uploadType === 'photo' && !isImage) || (uploadType === 'video' && !isVideo)) {
        alert(`Please select a valid ${uploadType} file.`);
        return;
      }
      
      // Validate file size (max 50MB for videos, 10MB for images)
      const maxSize = uploadType === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`File size must be less than ${uploadType === 'video' ? '50MB' : '10MB'}.`);
        return;
      }
      
      setUploadForm({ ...uploadForm, file });
    }
  };

  const handleUploadSubmit = () => {
    if (!uploadForm.title || !uploadForm.file) {
      alert('Please fill in all required fields and select a file.');
      return;
    }
    
    // Simulate upload process
    console.log('Uploading:', uploadForm);
    alert(`${uploadType === 'photo' ? 'Photo' : 'Video'} uploaded successfully!`);
    
    // Reset form
    setUploadForm({ title: '', description: '', category: 'Campus', file: null });
    setShowUploadModal(false);
  };

  const handleDownload = (media: any) => {
    // Simulate download
    console.log('Downloading:', media.title);
    alert(`Downloading ${media.title}...`);
  };

  const handleShare = (media: any) => {
    // Simulate sharing
    if (navigator.share) {
      navigator.share({
        title: media.title,
        text: media.description,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const VideoPlayer = ({ media }: { media: any }) => {
    return (
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          className="w-full h-auto max-h-96"
          controls
          poster={media.thumbnail}
          preload="metadata"
        >
          <source src={media.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Media Gallery</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Explore our vibrant school community through photos and videos that capture the essence of learning, 
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
              {/* Media Type Filter */}
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

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Upload Button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Upload Media
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
                  <img
                    src={media.thumbnail}
                    alt={media.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Media Type Indicator */}
                  <div className="absolute top-2 left-2">
                    {media.type === 'video' ? (
                      <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        {media.duration}
                      </div>
                    ) : (
                      <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center text-xs">
                        <Image className="h-3 w-3 mr-1" />
                        Photo
                      </div>
                    )}
                  </div>

                  {/* Play Button for Videos */}
                  {media.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white bg-opacity-90 rounded-full p-3">
                        <Play className="h-8 w-8 text-teal-600" />
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
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
                        handleDownload(media);
                      }}
                      className="bg-white bg-opacity-90 text-gray-700 p-2 rounded-full hover:bg-opacity-100 transition-colors"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
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
                {mediaType === 'Videos' ? <Video className="h-16 w-16 mx-auto" /> : <Image className="h-16 w-16 mx-auto" />}
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
              <VideoPlayer media={filteredMedia[selectedMedia]} />
            ) : (
              <div className="relative">
                <img
                  src={filteredMedia[selectedMedia].src}
                  alt={filteredMedia[selectedMedia].alt}
                  className="max-w-full max-h-screen object-contain rounded-lg"
                />
                <div className="absolute bottom-4 left-4 right-4 text-white">
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
                onClick={() => handleDownload(filteredMedia[selectedMedia])}
                className="bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-colors"
                title="Download"
              >
                <Download className="h-5 w-5" />
              </button>
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Upload Media</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Upload Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setUploadType('photo')}
                    className={`flex-1 p-3 border-2 rounded-lg flex items-center justify-center ${
                      uploadType === 'photo' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
                    }`}
                  >
                    <Image className="h-5 w-5 mr-2" />
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

              {/* File Upload */}
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

              {/* Title */}
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

              {/* Description */}
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

              {/* Category */}
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

              {/* Upload Button */}
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