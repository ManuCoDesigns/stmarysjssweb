import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../../components/ConfirmDialog';
import { 
  Globe, 
  Edit, 
  Save, 
  Eye, 
  Upload, 
  Download, 
  Image, 
  FileText, 
  Video, 
  Calendar,
  Users,
  BookOpen,
  Award,
  Phone,
  Mail,
  MapPin,
  Plus,
  Trash2,
  RefreshCw,
  Settings,
  Palette,
  Layout,
  Type,
  Link,
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const WebsiteManagement: React.FC = () => {
  const [activeSection, setActiveSection] = useState('homepage');
  const [isEditing, setIsEditing] = useState(false);
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

  const [homepageContent, setHomepageContent] = useState({
    heroTitle: 'Shaping Tomorrow\'s Leaders Today',
    heroSubtitle: 'At St. Mary\'s School, we provide exceptional education from Pre-Primary through Grade 10, nurturing academic excellence, character development, and lifelong learning in a supportive Christian environment.',
    heroImage: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg',
    featuredNews: [
      { id: 1, title: 'Grade 10 Students Excel in University Entrance Exams', date: '2024-03-20', featured: true },
      { id: 2, title: 'New STEM Laboratory Opens', date: '2024-03-15', featured: true },
      { id: 3, title: 'Student Excellence Awards Ceremony', date: '2024-03-10', featured: true }
    ],
    quickStats: [
      { label: 'Students', value: '500+' },
      { label: 'Teachers', value: '25+' },
      { label: 'Years of Excellence', value: '50+' },
      { label: 'University Admission Rate', value: '98%' }
    ]
  });

  const [aboutContent, setAboutContent] = useState({
    mission: 'To provide exceptional education from Pre-Primary through Grade 10 that nurtures academic excellence, character development, and spiritual growth in a supportive Christian environment.',
    vision: 'To be the leading educational institution that transforms lives through holistic education from early childhood through senior secondary.',
    history: 'St. Mary\'s School was established in 1965 by a group of visionary educators and community leaders who recognized the need for quality education in our region.',
    principalMessage: 'At St. Mary\'s School, we believe that every child has unique talents and potential waiting to be discovered and nurtured.',
    achievements: [
      '98% University Admission Rate',
      '95% KCPE Excellence Rate',
      '50+ Awards & Recognition',
      '100% CBC Implementation'
    ]
  });

  const [newsContent, setNewsContent] = useState([
    {
      id: 1,
      title: 'Outstanding KCPE Results 2024',
      excerpt: 'Our Grade 6 students have achieved exceptional results in the Kenya Certificate of Primary Education examinations.',
      content: 'Full article content here...',
      author: 'Academic Department',
      date: '2024-03-15',
      category: 'Academic',
      featured: true,
      published: true,
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg'
    },
    {
      id: 2,
      title: 'Science Fair Competition Winners',
      excerpt: 'St. Mary\'s students dominated the county science fair, winning first place in three different categories.',
      content: 'Full article content here...',
      author: 'Science Department',
      date: '2024-03-10',
      category: 'Achievement',
      featured: true,
      published: true,
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg'
    }
  ]);

  const [galleryContent, setGalleryContent] = useState([
    {
      id: 1,
      title: 'Main School Building',
      category: 'Campus',
      image: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg',
      description: 'Our beautiful main building houses modern classrooms and administrative offices.',
      featured: true
    },
    {
      id: 2,
      title: 'Science Laboratory',
      category: 'Facilities',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
      description: 'State-of-the-art science laboratory for hands-on learning.',
      featured: true
    },
    {
      id: 3,
      title: 'Students Learning',
      category: 'Academic',
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg',
      description: 'Our students engaged in interactive learning sessions.',
      featured: false
    }
  ]);

  const [contactInfo, setContactInfo] = useState({
    address: '123 Education Street, Nairobi, Kenya',
    phone: '+254 712 345 678',
    email: 'info@stmarysschool.ac.ke',
    website: 'www.stmarysschool.ac.ke',
    socialMedia: {
      facebook: 'https://facebook.com/stmarysschool',
      twitter: 'https://twitter.com/stmarysschool',
      instagram: 'https://instagram.com/stmarysschool'
    },
    officeHours: 'Monday - Friday: 7:30 AM - 5:00 PM'
  });

  const sections = [
    { id: 'homepage', name: 'Homepage', icon: Globe, description: 'Main landing page content' },
    { id: 'about', name: 'About Us', icon: Users, description: 'School information and history' },
    { id: 'academics', name: 'Academics', icon: BookOpen, description: 'Academic programs and curriculum' },
    { id: 'news', name: 'News & Events', icon: FileText, description: 'News articles and announcements' },
    { id: 'gallery', name: 'Photo Gallery', icon: Image, description: 'School photos and media' },
    { id: 'contact', name: 'Contact Info', icon: Phone, description: 'Contact details and location' },
    { id: 'admissions', name: 'Admissions', icon: Award, description: 'Admission process and requirements' },
    { id: 'downloads', name: 'Downloads', icon: Download, description: 'Forms and documents' },
  ];

  const handleSaveContent = (sectionName: string) => {
    const loadingToast = toast.loading(`Saving ${sectionName} content...`);
    
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success(`${sectionName} content saved successfully!`, {
        duration: 4000,
        icon: '✅',
      });
      setIsEditing(false);
    }, 1500);
  };

  const handlePublishChanges = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Publish Website Changes',
      message: 'This will make all your changes live on the website. Are you sure you want to continue?',
      type: 'info',
      onConfirm: () => {
        const loadingToast = toast.loading('Publishing changes to website...');
        
        setTimeout(() => {
          toast.dismiss(loadingToast);
          toast.success('Website changes published successfully!', {
            duration: 5000,
            icon: '🚀',
          });
        }, 3000);
      }
    });
  };

  const handlePreviewWebsite = () => {
    toast.success('Opening website preview in new tab...', {
      duration: 3000,
      icon: '👁️',
    });
  };

  const handleAddNewsArticle = () => {
    const newArticle = {
      id: newsContent.length + 1,
      title: 'New Article Title',
      excerpt: 'Article excerpt...',
      content: 'Article content...',
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      category: 'General',
      featured: false,
      published: false,
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg'
    };
    
    setNewsContent([newArticle, ...newsContent]);
    toast.success('New article created! Don\'t forget to edit and publish it.');
  };

  const handleDeleteNewsArticle = (id: number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Article',
      message: 'Are you sure you want to delete this article? This action cannot be undone.',
      type: 'danger',
      onConfirm: () => {
        setNewsContent(newsContent.filter(article => article.id !== id));
        toast.success('Article deleted successfully!');
      }
    });
  };

  const handleAddGalleryImage = () => {
    const newImage = {
      id: galleryContent.length + 1,
      title: 'New Image',
      category: 'General',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg',
      description: 'Image description...',
      featured: false
    };
    
    setGalleryContent([newImage, ...galleryContent]);
    toast.success('New image added to gallery!');
  };

  const renderHomepageEditor = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
          <input
            type="text"
            value={homepageContent.heroTitle}
            onChange={(e) => setHomepageContent({...homepageContent, heroTitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
          <input
            type="url"
            value={homepageContent.heroImage}
            onChange={(e) => setHomepageContent({...homepageContent, heroImage: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
        <textarea
          value={homepageContent.heroSubtitle}
          onChange={(e) => setHomepageContent({...homepageContent, heroSubtitle: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isEditing}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {homepageContent.quickStats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                value={stat.label}
                onChange={(e) => {
                  const newStats = [...homepageContent.quickStats];
                  newStats[index].label = e.target.value;
                  setHomepageContent({...homepageContent, quickStats: newStats});
                }}
                placeholder="Stat Label"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isEditing}
              />
              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const newStats = [...homepageContent.quickStats];
                  newStats[index].value = e.target.value;
                  setHomepageContent({...homepageContent, quickStats: newStats});
                }}
                placeholder="Stat Value"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isEditing}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAboutEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
        <textarea
          value={aboutContent.mission}
          onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isEditing}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
        <textarea
          value={aboutContent.vision}
          onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isEditing}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">School History</label>
        <textarea
          value={aboutContent.history}
          onChange={(e) => setAboutContent({...aboutContent, history: e.target.value})}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isEditing}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Principal's Message</label>
        <textarea
          value={aboutContent.principalMessage}
          onChange={(e) => setAboutContent({...aboutContent, principalMessage: e.target.value})}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderNewsEditor = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">News Articles</h3>
        <button
          onClick={handleAddNewsArticle}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Article
        </button>
      </div>

      <div className="space-y-4">
        {newsContent.map((article) => (
          <div key={article.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={article.title}
                  onChange={(e) => {
                    const updatedNews = newsContent.map(a => 
                      a.id === article.id ? { ...a, title: e.target.value } : a
                    );
                    setNewsContent(updatedNews);
                  }}
                  className="w-full text-lg font-medium px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isEditing}
                />
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-600">By: {article.author}</span>
                  <span className="text-sm text-gray-600">Date: {article.date}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    article.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {article.published ? 'Published' : 'Draft'}
                  </span>
                  {article.featured && (
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => {
                    const updatedNews = newsContent.map(a => 
                      a.id === article.id ? { ...a, featured: !a.featured } : a
                    );
                    setNewsContent(updatedNews);
                  }}
                  className="text-yellow-600 hover:text-yellow-800 p-1"
                  title="Toggle Featured"
                >
                  {article.featured ? <Star className="h-4 w-4 fill-current" /> : <Star className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => {
                    const updatedNews = newsContent.map(a => 
                      a.id === article.id ? { ...a, published: !a.published } : a
                    );
                    setNewsContent(updatedNews);
                  }}
                  className="text-green-600 hover:text-green-800 p-1"
                  title="Toggle Published"
                >
                  {article.published ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => handleDeleteNewsArticle(article.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Delete Article"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <textarea
              value={article.excerpt}
              onChange={(e) => {
                const updatedNews = newsContent.map(a => 
                  a.id === article.id ? { ...a, excerpt: e.target.value } : a
                );
                setNewsContent(updatedNews);
              }}
              rows={2}
              placeholder="Article excerpt..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              disabled={!isEditing}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={article.category}
                onChange={(e) => {
                  const updatedNews = newsContent.map(a => 
                    a.id === article.id ? { ...a, category: e.target.value } : a
                  );
                  setNewsContent(updatedNews);
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isEditing}
              >
                <option value="Academic">Academic</option>
                <option value="Achievement">Achievement</option>
                <option value="Sports">Sports</option>
                <option value="Events">Events</option>
                <option value="General">General</option>
              </select>
              
              <input
                type="url"
                value={article.image}
                onChange={(e) => {
                  const updatedNews = newsContent.map(a => 
                    a.id === article.id ? { ...a, image: e.target.value } : a
                  );
                  setNewsContent(updatedNews);
                }}
                placeholder="Image URL"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isEditing}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGalleryEditor = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Photo Gallery</h3>
        <button
          onClick={handleAddGalleryImage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryContent.map((image) => (
          <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-3">
              <input
                type="text"
                value={image.title}
                onChange={(e) => {
                  const updatedGallery = galleryContent.map(img => 
                    img.id === image.id ? { ...img, title: e.target.value } : img
                  );
                  setGalleryContent(updatedGallery);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isEditing}
              />
              
              <select
                value={image.category}
                onChange={(e) => {
                  const updatedGallery = galleryContent.map(img => 
                    img.id === image.id ? { ...img, category: e.target.value } : img
                  );
                  setGalleryContent(updatedGallery);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isEditing}
              >
                <option value="Campus">Campus</option>
                <option value="Facilities">Facilities</option>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Events">Events</option>
              </select>
              
              <textarea
                value={image.description}
                onChange={(e) => {
                  const updatedGallery = galleryContent.map(img => 
                    img.id === image.id ? { ...img, description: e.target.value } : img
                  );
                  setGalleryContent(updatedGallery);
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!isEditing}
              />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`featured-${image.id}`}
                    checked={image.featured}
                    onChange={(e) => {
                      const updatedGallery = galleryContent.map(img => 
                        img.id === image.id ? { ...img, featured: e.target.checked } : img
                      );
                      setGalleryContent(updatedGallery);
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={!isEditing}
                  />
                  <label htmlFor={`featured-${image.id}`} className="ml-2 block text-sm text-gray-900">
                    Featured
                  </label>
                </div>
                
                <button
                  onClick={() => {
                    setGalleryContent(galleryContent.filter(img => img.id !== image.id));
                    toast.success('Image removed from gallery!');
                  }}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Remove Image"
                  disabled={!isEditing}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContactEditor = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Address</label>
          <textarea
            value={contactInfo.address}
            onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Office Hours</label>
          <textarea
            value={contactInfo.officeHours}
            onChange={(e) => setContactInfo({...contactInfo, officeHours: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={contactInfo.website}
            onChange={(e) => setContactInfo({...contactInfo, website: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
            <input
              type="url"
              value={contactInfo.socialMedia.facebook}
              onChange={(e) => setContactInfo({
                ...contactInfo, 
                socialMedia: {...contactInfo.socialMedia, facebook: e.target.value}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
            <input
              type="url"
              value={contactInfo.socialMedia.twitter}
              onChange={(e) => setContactInfo({
                ...contactInfo, 
                socialMedia: {...contactInfo.socialMedia, twitter: e.target.value}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
            <input
              type="url"
              value={contactInfo.socialMedia.instagram}
              onChange={(e) => setContactInfo({
                ...contactInfo, 
                socialMedia: {...contactInfo.socialMedia, instagram: e.target.value}
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'homepage': return renderHomepageEditor();
      case 'about': return renderAboutEditor();
      case 'news': return renderNewsEditor();
      case 'gallery': return renderGalleryEditor();
      case 'contact': return renderContactEditor();
      default: 
        return (
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Content editor for {activeSection} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Website Content Management</h1>
            <p className="text-gray-600 mt-1">Update and manage all website content and pages</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handlePreviewWebsite}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Website
            </button>
            <button
              onClick={handlePublishChanges}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Publish Changes
            </button>
          </div>
        </div>
      </div>

      {/* Content Management */}
      <div className="bg-white rounded-lg shadow">
        {/* Section Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setIsEditing(false);
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <section.icon className="h-5 w-5" />
                <span>{section.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Section Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {sections.find(s => s.id === activeSection)?.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {sections.find(s => s.id === activeSection)?.description}
              </p>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveContent(sections.find(s => s.id === activeSection)?.name || '')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Content
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="p-6">
          {renderSectionContent()}
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

export default WebsiteManagement;