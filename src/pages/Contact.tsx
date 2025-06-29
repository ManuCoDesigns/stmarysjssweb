import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Message sent successfully! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Education Street", "Bomet, Kenya", "P.O. Box 301-20300"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 721 771 568", "+254 714 749 123"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@stmarysschool.ac.ke", "admissions@stmarysschool.ac.ke"]
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 7:30 AM - 5:00 PM", "Saturday: 8:00 AM - 1:00 PM", "Sunday: Closed"]
    }
  ];

  const departments = [
    { name: "General Inquiry", email: "info@stmarysschool.ac.ke" },
    { name: "Admissions", email: "admissions@stmarysschool.ac.ke" },
    { name: "Academic Affairs", email: "academic@stmarysschool.ac.ke" },
    { name: "Finance Department", email: "finance@stmarysschool.ac.ke" },
    { name: "Transport Services", email: "transport@stmarysschool.ac.ke" },
    { name: "Principal's Office", email: "principal@stmarysschool.ac.ke" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We'd love to hear from you. Get in touch with us for admissions inquiries, 
              general questions, or to schedule a visit to our School.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select Subject</option>
                        <option value="admissions">Admissions Inquiry</option>
                        <option value="academic">Academic Information</option>
                        <option value="fees">Fee Structure</option>
                        <option value="transport">Transport Services</option>
                        <option value="general">General Inquiry</option>
                        <option value="complaint">Complaint/Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Us</h2>
              
              {/* Map Placeholder */}
              <div className="bg-gray-300 h-64 rounded-lg mb-6 flex items-center justify-center">
                <p className="text-gray-600">Interactive Map Coming Soon</p>
              </div>

              {/* Directions */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Directions</h3>
                <p className="text-gray-600 mb-4">
                  St. Mary's School is conveniently located in the heart of Bomet Town, easily accessible by public transport and private vehicles.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• 5 minutes from Bomet Town</li>
                  <li>• Near Bomet Police Station</li>
                  <li>• Tarmaced route to school</li>
                  <li>• Secure parking available on school</li>
                </ul>
              </div>

              {/* Department Contacts */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Department Contacts</h3>
                <div className="space-y-3">
                  {departments.map((dept, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700">{dept.name}</span>
                      <a href={`mailto:${dept.email}`} className="text-emerald-600 hover:text-emerald-800 text-sm">
                        {dept.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for Quick Answers?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Check out our frequently asked questions for immediate answers to common inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/faq"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              View FAQ
            </a>
            <a
              href="/admissions"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-900 transition-colors duration-200"
            >
              Admissions Info
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;