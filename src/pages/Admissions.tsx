import React, { useState, useEffect } from 'react';
import { Calendar, FileText, DollarSign, Clock, CheckCircle, Users, Send, Star, Award, BookOpen, GraduationCap, Mail, Phone, MapPin, User, Heart, Sparkles, ArrowRight, Target, Trophy, Zap } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Admissions: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    grade: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    previousSchool: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background images for the hero section
  const backgroundImages = [
    'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate admission steps
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);

    // Auto-rotate background images
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(imageInterval);
    };
  }, [backgroundImages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration - You'll need to replace these with your actual values
      const serviceId = 'service_8gbzb7o'; // Replace with your EmailJS service ID
      const templateId = 'template_s0or3w5'; // Replace with your EmailJS template ID
      const publicKey = 'Qne15FCsH6qoGwKbD'; // Replace with your EmailJS public key

      const templateParams = {
        to_email: 'stmaryssecbomet@gmail.com',
        from_name: formData.parentName,
        from_email: formData.email,
        student_name: formData.studentName,
        date_of_birth: formData.dateOfBirth,
        grade: formData.grade,
        parent_name: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        previous_school: formData.previousSchool || 'Not specified',
        message: formData.message || 'No additional information provided',
        subject: `New Admission Application - ${formData.studentName}`,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({
        studentName: '',
        dateOfBirth: '',
        grade: '',
        parentName: '',
        email: '',
        phone: '',
        address: '',
        previousSchool: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const admissionSteps = [
    {
      icon: FileText,
      title: "Submit Application",
      description: "Complete and submit the online application form with required documents",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Calendar,
      title: "School Visit",
      description: "Schedule a visit to tour our facilities and meet with our admissions team",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      icon: Users,
      title: "Assessment",
      description: "Student assessment and parent interview (for certain grade levels)",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      icon: CheckCircle,
      title: "Admission Decision",
      description: "Receive admission decision and enrollment information",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    }
  ];

  const feeStructure = [
    { grade: "Junior Secondary (Grade 7-9)", term1Fee: "20,000", term2Fee: "20,000", term3Fee: "20,000", yearFee: "60,000" },
    { grade: "Senior Secondary (Grade 10)", term1Fee: "25,000", term2Fee: "25,000", term3Fee: "25,000", yearFee: "75,000" }
  ];

  const requirements = [
    { text: "Completed application form", icon: FileText },
    { text: "Birth certificate (original and copy)", icon: Award },
    { text: "Previous school report cards", icon: BookOpen },
    { text: "Transfer certificate (if applicable)", icon: GraduationCap },
    { text: "Medical certificate", icon: Heart },
    { text: "Passport-size photographs (4 copies)", icon: User },
    { text: "Parent/Guardian ID copies", icon: Users },
    { text: "Academic transcripts (for Grade 10 applicants)", icon: Trophy }
  ];

  const achievements = [
    { number: "500+", label: "Students Enrolled", icon: Users },
    { number: "95%", label: "Success Rate", icon: Trophy },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "50+", label: "Expert Teachers", icon: GraduationCap }
  ];

  return (
    <div className="overflow-hidden">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      {/* Hero Section with Background Slideshow */}
      <section className="relative text-white py-24 overflow-hidden min-h-screen flex items-center">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/70 to-indigo-900/80 z-10"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 to-transparent"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-30">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <GraduationCap className="h-20 w-20 text-white animate-bounce" />
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-300 animate-pulse" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Admissions
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              Join our vibrant school community and give your child the foundation for a 
              <span className="text-yellow-300 font-semibold"> bright future</span>. 
              We welcome applications for all grades from Pre-Primary through Grade 10.
            </p>
            <div className="mt-12 flex justify-center space-x-8">
              {achievements.map((achievement, index) => (
                <div key={index} className={`text-center transform transition-all duration-700 delay-${index * 200} ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-2">
                    <achievement.icon className="h-8 w-8 text-yellow-300 mx-auto" />
                  </div>
                  <div className="text-2xl font-bold text-white">{achievement.number}</div>
                  <div className="text-sm text-purple-200">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <Target className="h-12 w-12 text-purple-600 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Admission Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple steps to join our school community</p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <div 
                key={index} 
                className={`relative group transform transition-all duration-500 hover:scale-105 ${
                  activeStep === index ? 'scale-105' : ''
                }`}
              >
                {/* Connection Line */}
                {index < admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 z-10"></div>
                )}
                
                <div className={`relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  activeStep === index ? 'border-purple-300 shadow-purple-100' : 'border-gray-100'
                }`}>
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* Icon Container */}
                  <div className={`relative ${step.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`h-10 w-10 ${step.iconColor}`} />
                    {activeStep === index && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-purple-400 animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Step Number */}
                  <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${step.color} text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-lg`}>
                    {index + 1}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
                  
                  {/* Hover Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center mt-4">
                    <ArrowRight className="h-5 w-5 text-purple-600 animate-bounce" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Send className="h-12 w-12 text-purple-600 animate-pulse" />
                <div className="absolute -inset-2 bg-purple-200 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Online Application Form</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Start your child's journey with us</p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-white/20">
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl transform animate-pulse">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-2 mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-green-800 font-semibold text-lg">
                      Application submitted successfully! 🎉
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      We will contact you within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl">
                <div className="flex items-center">
                  <div className="bg-red-100 rounded-full p-2 mr-4">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-red-800 font-semibold text-lg">
                      Submission Error
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      Please try again or contact us directly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label htmlFor="studentName" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2 text-purple-600" />
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-purple-300"
                    placeholder="Enter student's full name"
                  />
                </div>
                <div className="group">
                  <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-purple-300"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="grade" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2 text-purple-600" />
                  Grade Applying For *
                </label>
                <select
                  id="grade"
                  name="grade"
                  required
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-purple-300"
                >
                  <option value="">Select Grade</option>
                  <option value="Grade7">Grade 7</option>
                  <option value="Grade8">Grade 8</option>
                  <option value="Grade9">Grade 9</option>
                  <option value="Grade10">Grade 10</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label htmlFor="parentName" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-purple-600" />
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-purple-300"
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-purple-600" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-purple-300"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-purple-600" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-purple-300"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="group">
                  <label htmlFor="previousSchool" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-purple-600" />
                    Previous School (if applicable)
                  </label>
                  <input
                    type="text"
                    id="previousSchool"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-purple-300"
                    placeholder="Enter previous school name"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                  Home Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-purple-300"
                  placeholder="Enter full home address"
                />
              </div>

              <div className="group">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-purple-600" />
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 bg-white/50 backdrop-blur-sm group-hover:border-purple-300 resize-none"
                  placeholder="Any additional information you'd like to share..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-5 px-8 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="h-6 w-6 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                    Submit Application
                    <Sparkles className="h-5 w-5 ml-2 animate-pulse" />
                  </>
                )}
              </button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  By submitting this form, you agree to our terms and conditions.
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  All applications are reviewed within 24 hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <DollarSign className="h-12 w-12 text-green-600 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Fee Structure</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Transparent and affordable education fees</p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <tr>
                    <th className="px-8 py-6 text-left font-bold text-lg">Grade Level</th>
                    <th className="px-8 py-6 text-left font-bold text-lg">Term 1 Fee (KES)</th>
                    <th className="px-8 py-6 text-left font-bold text-lg">Term 2 Fee (KES)</th>
                    <th className="px-8 py-6 text-left font-bold text-lg">Term 3 Fee (KES)</th>
                    <th className="px-8 py-6 text-left font-bold text-lg">Annual Fee (KES)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {feeStructure.map((fee, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 group">
                      <td className="px-8 py-6 font-semibold text-gray-900 group-hover:text-purple-700">{fee.grade}</td>
                      <td className="px-8 py-6 text-gray-700 font-medium">{fee.term1Fee}</td>
                      <td className="px-8 py-6 text-gray-700 font-medium">{fee.term2Fee}</td>
                      <td className="px-8 py-6 text-gray-700 font-medium">{fee.term3Fee}</td>
                      <td className="px-8 py-6 text-gray-700 font-bold text-lg">{fee.yearFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
            <h3 className="font-bold text-gray-900 mb-4 text-xl flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
              Fee Information:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Fees are payable at the beginning of each term
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Registration fee: KES 10,000 (one-time payment)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Uniform and books are additional costs
                </li>
              </ul>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Payment plans available upon request
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Grade 10 fees include university preparation programs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Scholarships available for exceptional students
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center mb-8">
                <FileText className="h-10 w-10 text-purple-600 mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Required Documents</h2>
              </div>
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100 hover:border-purple-200">
                    <div className="bg-purple-100 rounded-lg p-2 mr-4 group-hover:bg-purple-200 transition-colors duration-300">
                      <requirement.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-purple-700 transition-colors duration-300">{requirement.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-8">
                <Calendar className="h-10 w-10 text-blue-600 mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Important Dates</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-blue-200">
                  <div className="bg-blue-100 rounded-xl p-3 mr-6 group-hover:bg-blue-200 transition-colors duration-300">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Application Deadline</p>
                    <p className="text-gray-600">Rolling admissions - Apply anytime</p>
                  </div>
                </div>
                <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-green-200">
                  <div className="bg-green-100 rounded-xl p-3 mr-6 group-hover:bg-green-200 transition-colors duration-300">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Term Starts</p>
                    <p className="text-gray-600">January, May, and September</p>
                  </div>
                </div>
                <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-orange-200">
                  <div className="bg-orange-100 rounded-xl p-3 mr-6 group-hover:bg-orange-200 transition-colors duration-300">
                    <Trophy className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Grade 10 Entrance Exam</p>
                    <p className="text-gray-600">December and March sessions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade 10 Special Information */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <GraduationCap className="h-16 w-16 text-yellow-300 animate-bounce" />
                <Star className="absolute -top-2 -right-2 h-8 w-8 text-yellow-300 animate-pulse" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Grade 10 - Senior Secondary</h2>
            <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              Our Grade 10 program offers specialized pathways to prepare students for university entrance and career success.
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-yellow-300 to-white mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "STEM Pathway",
                description: "Advanced mathematics, sciences, and technology preparation for engineering and medical programs.",
                icon: Zap,
                color: "from-blue-500 to-cyan-500",
                subjects: ["Advanced Mathematics", "Physics & Chemistry", "Computer Science", "Research Projects"]
              },
              {
                title: "Arts & Humanities",
                description: "Literature, languages, and social sciences for law, journalism, and teaching careers.",
                icon: BookOpen,
                color: "from-green-500 to-emerald-500",
                subjects: ["Advanced Literature", "History & Geography", "Foreign Languages", "Critical Writing"]
              },
              {
                title: "Business & Economics",
                description: "Commerce, economics, and entrepreneurship for business and finance careers.",
                icon: Trophy,
                color: "from-orange-500 to-red-500",
                subjects: ["Business Studies", "Economics & Accounting", "Entrepreneurship", "Market Research"]
              }
            ].map((pathway, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 transform hover:scale-105">
                  <div className={`bg-gradient-to-r ${pathway.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <pathway.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">{pathway.title}</h3>
                  <p className="text-purple-100 mb-6 text-center leading-relaxed">{pathway.description}</p>
                  <ul className="space-y-3">
                    {pathway.subjects.map((subject, subIndex) => (
                      <li key={subIndex} className="flex items-center text-purple-200">
                        <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3 animate-pulse"></div>
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;