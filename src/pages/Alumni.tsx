import React, { useState } from 'react';
import { GraduationCap, Users, Trophy, MapPin, Calendar, Mail, Phone, Linkedin } from 'lucide-react';

const Alumni: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    graduationYear: '',
    email: '',
    phone: '',
    profession: '',
    company: '',
    location: '',
    achievements: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Alumni registration:', formData);
    alert('Thank you for joining our alumni network! We will be in touch soon.');
  };

  const featuredAlumni = [
    {
      name: "Dr. James Mwangi",
      graduationYear: "1995",
      profession: "Cardiologist",
      company: "Nairobi Hospital",
      achievement: "Leading heart surgeon in East Africa",
      image: "3182743"
    },
    {
      name: "Sarah Wanjiku",
      graduationYear: "2000",
      profession: "Software Engineer",
      company: "Google",
      achievement: "Tech lead for Google Maps Africa",
      image: "3184360"
    },
    {
      name: "David Ochieng",
      graduationYear: "1998",
      profession: "Entrepreneur",
      company: "GreenTech Solutions",
      achievement: "Founded successful renewable energy company",
      image: "3182812"
    },
    {
      name: "Grace Mutiso",
      graduationYear: "2005",
      profession: "Diplomat",
      company: "Ministry of Foreign Affairs",
      achievement: "Kenya's youngest ambassador",
      image: "3184339"
    },
    {
      name: "Michael Kimani",
      graduationYear: "1992",
      profession: "Author & Journalist",
      company: "Nation Media Group",
      achievement: "Award-winning investigative journalist",
      image: "3184338"
    },
    {
      name: "Ruth Akinyi",
      graduationYear: "2003",
      profession: "Research Scientist",
      company: "KEMRI",
      achievement: "Leading malaria research in Kenya",
      image: "3184337"
    }
  ];

  const achievements = [
    {
      icon: GraduationCap,
      title: "5,000+ Graduates",
      description: "Alumni spread across the globe making a difference"
    },
    {
      icon: Users,
      title: "Global Network",
      description: "Alumni in 25+ countries worldwide"
    },
    {
      icon: Trophy,
      title: "Outstanding Achievements",
      description: "Leaders in medicine, technology, business, and public service"
    }
  ];

  const events = [
    {
      title: "Annual Alumni Reunion",
      date: "December 15, 2024",
      description: "Join us for our annual gathering to reconnect with classmates and celebrate achievements"
    },
    {
      title: "Career Mentorship Program",
      date: "Ongoing",
      description: "Alumni volunteer to mentor current students in various career paths"
    },
    {
      title: "Alumni Awards Gala",
      date: "March 20, 2025",
      description: "Recognizing outstanding alumni contributions to society and their professions"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-800 to-violet-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Alumni Network</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Join our vibrant community of St. Mary's School graduates who are making a positive impact 
              around the world. Stay connected, give back, and continue growing together.
            </p>
          </div>
        </div>
      </section>

      {/* Alumni Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Alumni */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Distinguished Alumni</h2>
            <p className="text-xl text-gray-600">Celebrating the achievements of our remarkable graduates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAlumni.map((alumni, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={`https://images.pexels.com/photos/${alumni.image}/pexels-photo-${alumni.image}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                  alt={alumni.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{alumni.name}</h3>
                  <p className="text-violet-600 font-medium mb-1">{alumni.profession}</p>
                  <p className="text-gray-600 text-sm mb-2">{alumni.company}</p>
                  <p className="text-gray-500 text-sm mb-3">Class of {alumni.graduationYear}</p>
                  <p className="text-gray-700 text-sm">{alumni.achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Registration */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Alumni Network</h2>
            <p className="text-xl text-gray-600">Stay connected with your alma mater and fellow graduates</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year *
                  </label>
                  <select
                    id="graduationYear"
                    name="graduationYear"
                    required
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Profession
                  </label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-2">
                  Notable Achievements
                </label>
                <textarea
                  id="achievements"
                  name="achievements"
                  rows={3}
                  value={formData.achievements}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                ></textarea>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message to Current Students
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-violet-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-violet-700 transition-colors duration-200"
              >
                Join Alumni Network
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Alumni Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Stay connected through our alumni events and programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-violet-600 mr-3" />
                  <span className="text-violet-600 font-medium">{event.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Benefits */}
      <section className="py-20 bg-violet-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Alumni Benefits</h2>
            <p className="text-xl text-gray-200">Exclusive benefits for our alumni community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-violet-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Networking Opportunities</h3>
              <p className="text-gray-300 text-sm">Connect with fellow alumni worldwide</p>
            </div>
            <div className="text-center">
              <GraduationCap className="h-12 w-12 text-violet-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mentorship Programs</h3>
              <p className="text-gray-300 text-sm">Guide current students in their career paths</p>
            </div>
            <div className="text-center">
              <Calendar className="h-12 w-12 text-violet-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Exclusive Events</h3>
              <p className="text-gray-300 text-sm">Special alumni gatherings and reunions</p>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 text-violet-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Recognition Programs</h3>
              <p className="text-gray-300 text-sm">Celebrate outstanding achievements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Alumni Office */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Alumni Office</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get in touch with our alumni relations team for any questions or support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center">
              <Mail className="h-6 w-6 text-violet-600 mr-3" />
              <span className="text-gray-700">alumni@stmarysschool.ac.ke</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="h-6 w-6 text-violet-600 mr-3" />
              <span className="text-gray-700">+254 712 345 678</span>
            </div>
            <div className="flex items-center justify-center">
              <Linkedin className="h-6 w-6 text-violet-600 mr-3" />
              <span className="text-gray-700">St. Mary's School Alumni</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Alumni;