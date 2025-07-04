import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Award, 
  Users, 
  BookOpen, 
  Globe, 
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  TrendingUp,
  Heart,
  Shield,
  Lightbulb
} from 'lucide-react';

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Consistently high performance in national examinations with personalized learning approaches through Grade 10.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description: "Dedicated teachers with years of experience in nurturing young minds and character development at all levels.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: BookOpen,
      title: "Complete CBE Program",
      description: "Full Competency-Based Education from Grade 7-9 through Grade 10, preparing students for university success.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "Preparing students for success in an interconnected world with international partnerships and university preparation.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const stats = [
    { number: "500+", label: "Students", icon: Users, color: "text-blue-600" },
    { number: "25+", label: "Teachers", icon: Award, color: "text-green-600" },
    { number: "30+", label: "Years of Excellence", icon: Star, color: "text-purple-600" },
    { number: "98%", label: "University Admission Rate", icon: TrendingUp, color: "text-orange-600" }
  ];

  const gradeHighlights = [
    {
      title: "Junior Secondary",
      description: "Career pathway introduction and advanced skill development",
      grades: "Grade 7 - 9",
      icon: BookOpen,
      features: ["Foundation Skills", "Career Exploration", "Character Building"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Senior Secondary",
      description: "University preparation with specialized pathway focus",
      grades: "Grade 10",
      icon: Globe,
      features: ["University Prep", "Specialized Pathways", "Research Projects"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "High School - Girls",
      description: "The 8-4-4 system cohort, currently Form 2-4",
      grades: "8-4-4",
      icon: Heart,
      features: ["Traditional Excellence", "Leadership Development", "Community Service"],
      color: "from-green-500 to-teal-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent of Grade 10 Student",
      content: "St. Mary's has transformed my daughter's approach to learning. The CBE program has given her confidence and critical thinking skills that will serve her well in university.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Michael Chen",
      role: "Grade 10 Graduate",
      content: "The STEM pathway at St. Mary's opened doors I never knew existed. I'm now studying Engineering at university, thanks to the solid foundation I received here.",
      rating: 5,
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Dr. Patricia Williams",
      role: "Education Consultant",
      content: "St. Mary's School represents the gold standard in CBE implementation. Their holistic approach to education is truly remarkable.",
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  const achievements = [
    { title: "National Science Fair Winners", year: "2024", icon: Award },
    { title: "Best CBE Implementation", year: "2023", icon: Star },
    { title: "Community Service Excellence", year: "2024", icon: Heart },
    { title: "Innovation in Education", year: "2023", icon: Lightbulb }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Enhanced Design */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="inline-flex items-center bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2" />
                35+ Years of Educational Excellence
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Shaping Tomorrow's
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Leaders Today
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl leading-relaxed">
                At St. Mary's Mixed Junior and Senior School - Bomet, we provide exceptional education from Junior School (Grade 7-9) through Grade 10, 
                nurturing academic excellence, character development, and lifelong learning in a supportive Christian environment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/admissions"
                  className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Video
                </Link>
              </div>

              {/* Quick Contact Info */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +254 721 771 568
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  stmaryssecbomet@gmail.com
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Bomet, Kenya
                </div>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
                <img
                  src="/images/students1.jpg"
                  alt="St. Mary's School students"
                  className="relative rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white"></div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="font-semibold">500+ Students</div>
                      <div className="text-xs">Thriving Community</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Three decades of educational excellence reflected in our achievements</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${
                    index === 0 ? 'from-blue-500 to-blue-600' :
                    index === 1 ? 'from-green-500 to-green-600' :
                    index === 2 ? 'from-purple-500 to-purple-600' :
                    'from-orange-500 to-orange-600'
                  } mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Grade Levels Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Educational Programs
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Educational Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From early childhood through senior secondary, we provide a seamless educational experience 
              that prepares students for university and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {gradeHighlights.map((highlight, index) => (
              <div key={index} className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4">
                <div className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${highlight.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <highlight.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                    {highlight.grades}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{highlight.description}</p>
                  
                  <div className="space-y-3">
                    {highlight.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Link 
                      to="/academics" 
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300"
                    >
                      Learn More 
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Excellence in Every Aspect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We offer a comprehensive educational experience that prepares students for success in academics and life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from parents, students, and education experts about their St. Mary's experience
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
                />
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="text-lg font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-blue-300"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-blue-300"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grade 10 Spotlight - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2" />
                Premier Program
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Grade 10 - Senior Secondary 
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h2>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Our Grade 10 program represents the pinnacle of CBE education, offering specialized pathways 
                that prepare students for university entrance and career success.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  "STEM, Sports & Arts, and Social Sciences",
                  "Center for ICT and Innovation",
                  "University entrance exam preparation",
                  "Industry partnerships and mentorship",
                  "Advanced research projects",
                  "International exchange programs"
                ].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-200 group-hover:text-white transition-colors duration-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/academics"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Explore Grade 10 Programs
                </Link>
                <Link
                  to="/admissions"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Apply Now
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Grade 10 students"
                className="relative rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating Achievement Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-xs text-gray-600">University Admission</div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">E.E</div>
                  <div className="text-xs text-gray-600">Average Grade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
            <p className="text-xl text-gray-600">Celebrating our continued excellence and recognition</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                  <div className="text-sm text-gray-600">{achievement.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced News Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              Latest Updates
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">School News & Events</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Stay updated with our school activities and achievements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Grade 10 Students Excel in University Entrance Exams",
                date: "March 20, 2024",
                category: "Academic Achievement",
                excerpt: "Our first cohort of Grade 10 students achieved outstanding results in university entrance examinations, with 98% gaining admission to top universities.",
                image: "5905709",
                color: "bg-blue-100 text-blue-600"
              },
              {
                title: "New STEM Laboratory Opens for Grade 10",
                date: "March 15, 2024",
                category: "Infrastructure",
                excerpt: "State-of-the-art STEM laboratory equipped with advanced technology to support our Grade 10 science and technology pathway students.",
                image: "2280571",
                color: "bg-green-100 text-green-600"
              },
              {
                title: "Student Excellence Awards Ceremony",
                date: "March 10, 2024",
                category: "Recognition",
                excerpt: "Celebrating our outstanding students across all grade levels who have shown exceptional performance in academics and extracurricular activities.",
                image: "159844",
                color: "bg-purple-100 text-purple-600"
              }
            ].map((item, index) => (
              <article key={index} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
                <div className="relative overflow-hidden">
                  <img
                    src={`https://images.pexels.com/photos/${item.image}/pexels-photo-${item.image}.jpeg?auto=compress&cs=tinysrgb&w=600`}
                    alt="School news"
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.color} backdrop-blur-sm`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.date}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {item.excerpt}
                  </p>
                  
                  <Link 
                    to="/news" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-2 transition-transform duration-300"
                  >
                    Read More 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/news"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All News
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-yellow-500/20 text-yellow-300 px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Shield className="w-4 h-4 mr-2" />
            Join Our Excellence Community
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Join Our 
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              School Community?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Take the first step towards your child's bright future. From Junior School through Grade 10, 
            our admissions team is ready to guide you through the process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              to="/admissions"
              className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 px-10 py-5 rounded-xl font-bold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
            >
              Start Application
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform inline" />
            </Link>
            <Link
              to="/contact"
              className="group border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg"
            >
              <Calendar className="mr-3 h-6 w-6 inline" />
              Schedule Visit
            </Link>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Phone className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-sm text-gray-300 mb-1">Call Us</div>
              <div className="font-semibold">+254 721 771 568</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Mail className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-sm text-gray-300 mb-1">Email Us</div>
              <div className="font-semibold">stmaryssecbomet@gmail.com</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <MapPin className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-sm text-gray-300 mb-1">Visit Us</div>
              <div className="font-semibold">Bomet, Kenya</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;