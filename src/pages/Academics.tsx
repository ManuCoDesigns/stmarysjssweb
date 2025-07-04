import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  ChevronRight,
  Star,
  Target,
  Lightbulb,
  Globe,
  Microscope,
  Calculator,
  Palette,
  Music,
  Trophy,
  Brain,
  Zap,
  Heart,
  Shield,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Calendar,
  MapPin
} from 'lucide-react';

const Academics: React.FC = () => {
  const [activePathway, setActivePathway] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const subjects = [
    { 
      name: "English Language", 
      description: "Developing communication skills and literary appreciation",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600"
    },
    { 
      name: "Kiswahili", 
      description: "National language proficiency and cultural understanding",
      icon: Globe,
      color: "from-sky-500 to-sky-600"
    },
    { 
      name: "Mathematics", 
      description: "Building analytical and problem-solving capabilities",
      icon: Calculator,
      color: "from-indigo-500 to-indigo-600"
    },
    { 
      name: "Science & Technology", 
      description: "Integrated science with hands-on experiments",
      icon: Microscope,
      color: "from-cyan-500 to-cyan-600"
    },
    { 
      name: "Social Studies", 
      description: "Understanding society, history, and geography",
      icon: Users,
      color: "from-blue-600 to-blue-700"
    },
    { 
      name: "Religious Education", 
      description: "Moral and spiritual development",
      icon: Heart,
      color: "from-sky-600 to-sky-700"
    },
    { 
      name: "Creative Arts", 
      description: "Music, art, and creative expression",
      icon: Palette,
      color: "from-indigo-600 to-indigo-700"
    },
    { 
      name: "Physical Education", 
      description: "Health, fitness, and sports development",
      icon: Trophy,
      color: "from-cyan-600 to-cyan-700"
    },
    { 
      name: "Life Skills", 
      description: "Practical skills for daily living and decision making",
      icon: Lightbulb,
      color: "from-blue-700 to-blue-800"
    },
    { 
      name: "Foreign Languages", 
      description: "French and German language options",
      icon: Globe,
      color: "from-sky-700 to-sky-800"
    }
  ];

  const levels = [
    {
      title: "Junior Secondary (Grade 7-9)",
      description: "Comprehensive secondary foundation with career pathways",
      features: ["Career pathways introduction", "Advanced projects", "Mentorship programs", "University preparation"],
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      students: "200+",
      duration: "3 Years"
    },
    {
      title: "Senior Secondary (Grade 10)",
      description: "Specialized learning in chosen career pathways with university preparation",
      features: ["Pathway specialization", "University entrance preparation", "Advanced research projects", "Industry partnerships"],
      icon: Target,
      color: "from-indigo-500 to-blue-500",
      students: "150+",
      duration: "1 Year"
    },
    {
      title: "High School (Form 2-4)",
      description: "8-4-4 learning system for girls",
      features: ["University entrance preparation", "Advanced research projects", "Industry partnerships", "Leadership development"],
      icon: Heart,
      color: "from-sky-500 to-blue-500",
      students: "100+",
      duration: "3 Years"
    }
  ];

  const pathwayTracks = [
    {
      pathway: "ARTS & SPORTS",
      tracks: [
        {
          name: "Arts Track",
          subjects: ["Fine Arts", "Theatre & Film", "Literature in English", "Music & Dance", "French", "German"],
          careers: ["Creative Director", "Film Producer", "Writer", "Artist", "Cultural Ambassador"],
          icon: Palette,
          color: "from-blue-500 to-indigo-500"
        },
        {
          name: "Sports & Recreation",
          subjects: ["Sports & Recreation", "Biology", "Computer Studies", "Mandarin", "Advanced Mathematics"],
          careers: ["Sports Management", "Athletic Training", "Sports Medicine", "Recreation Therapy"],
          icon: Trophy,
          color: "from-sky-500 to-blue-500"
        }
      ]
    },
    {
      pathway: "SOCIAL SCIENCES",
      tracks: [
        {
          name: "Humanities & Business Studies",
          subjects: ["Business Studies", "History & Citizenship", "Computer Studies", "German", "French", "CRE", "Geography", "Literature in English", "Fasihi ya Kiswahili", "Advanced Mathematics"],
          careers: ["Business Management", "International Relations", "Law", "Journalism", "Diplomacy"],
          icon: Users,
          color: "from-indigo-500 to-blue-600"
        },
        {
          name: "Languages & Literature",
          subjects: ["French", "German", "Computer Studies", "Literature in English", "Fasihi ya Kiswahili", "Mandarin"],
          careers: ["Translation", "International Business", "Cultural Studies", "Linguistics", "Education"],
          icon: Globe,
          color: "from-cyan-500 to-blue-500"
        }
      ]
    },
    {
      pathway: "STEM",
      tracks: [
        {
          name: "Applied Sciences",
          subjects: ["Agriculture", "Business Studies", "Biology", "Geography", "Computer Studies", "Home Science", "Advanced Mathematics"],
          careers: ["Agricultural Engineering", "Environmental Science", "Biotechnology", "Food Science"],
          icon: Microscope,
          color: "from-blue-600 to-indigo-600"
        },
        {
          name: "Pure Sciences",
          subjects: ["Advanced Mathematics", "Biology", "Chemistry", "Physics", "Agriculture", "Computer Studies", "Home Science"],
          careers: ["Medicine", "Engineering", "Research Scientist", "Biotechnology", "Pharmaceutical Sciences"],
          icon: Zap,
          color: "from-sky-600 to-blue-600"
        },
        {
          name: "Technical Studies",
          subjects: ["Building Construction", "Business Studies", "Computer Studies", "Electricity", "Biology"],
          careers: ["Civil Engineering", "Electrical Engineering", "Architecture", "Construction Management"],
          icon: Brain,
          color: "from-indigo-600 to-blue-700"
        }
      ]
    }
  ];

  const assessmentFeatures = [
    {
      title: "Continuous Assessment",
      description: "Regular evaluation throughout the learning process",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Portfolio Documentation",
      description: "Comprehensive record of student learning journey",
      icon: BookOpen,
      color: "text-sky-600"
    },
    {
      title: "Parent Consultations",
      description: "Regular meetings to discuss student progress",
      icon: Users,
      color: "text-indigo-600"
    },
    {
      title: "University Preparation",
      description: "Specialized preparation for higher education",
      icon: Target,
      color: "text-cyan-600"
    }
  ];

  const supportServices = [
    {
      title: "Learning Support",
      description: "Individualized support for students with different learning needs and styles",
      icon: Heart,
      features: ["One-on-one tutoring", "Learning disability support", "Study skills training"]
    },
    {
      title: "Remedial Classes",
      description: "Additional support classes for students who need extra help in specific subjects",
      icon: BookOpen,
      features: ["After-school sessions", "Weekend workshops", "Peer tutoring programs"]
    },
    {
      title: "Gifted Program",
      description: "Enrichment activities and advanced learning opportunities for exceptional students",
      icon: Star,
      features: ["Advanced coursework", "Research projects", "Competition preparation"]
    },
    {
      title: "University Prep",
      description: "Specialized preparation for university entrance exams and application processes",
      icon: Target,
      features: ["SAT/ACT prep", "Application guidance", "Scholarship assistance"]
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-sky-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="inline-flex items-center bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Award className="w-4 h-4 mr-2" />
                CBE Excellence Since 1994
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Academic
                <span className="block bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl leading-relaxed">
                Our comprehensive CBE curriculum spans from Junior School to Grade 10, designed to develop critical thinking, creativity,
                and practical skills that prepare students for success in higher education and beyond.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/admissions"
                  className="group bg-gradient-to-r from-blue-500 to-sky-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-400 hover:to-sky-400 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Curriculum
                </Link>
                <Link
                  to="/about"
                  className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Virtual Tour
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-sky-400">40+</div>
                  <div className="text-sm text-gray-300">Subject Combinations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-400">3</div>
                  <div className="text-sm text-gray-300">Career Pathways</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-indigo-400">98%</div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                </div>
              </div>
            </div>

            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-400 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
                <img
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Academic excellence"
                  className="relative rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Achievement Cards */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="text-center">
                    <Award className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-600">CBE Certified</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="text-center">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-600">Excellence Award</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CBE Overview with Enhanced Design */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Educational Framework
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Competency-Based Education (CBE)
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We have fully embraced Kenya's CBE system from Junior School (Grade 7-9) through Grade 10, focusing on competency development
              rather than content coverage, ensuring our students are well-prepared for university and career success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Competency-Based",
                description: "Focus on skills and abilities rather than just knowledge",
                color: "from-blue-500 to-sky-500"
              },
              {
                icon: Users,
                title: "Learner-Centered",
                description: "Individualized learning paths for every student",
                color: "from-indigo-500 to-blue-500"
              },
              {
                icon: Clock,
                title: "Flexible Pacing",
                description: "Students progress at their own optimal pace",
                color: "from-sky-500 to-cyan-500"
              },
              {
                icon: Award,
                title: "Continuous Assessment",
                description: "Regular evaluation and feedback for improvement",
                color: "from-cyan-500 to-blue-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`h-1 bg-gradient-to-r ${feature.color} rounded-full`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Academic Levels */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-sky-100 text-sky-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="w-4 h-4 mr-2" />
              Academic Structure
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Academic Levels</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive education from early years through senior secondary</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <div key={index} className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${level.color} group-hover:scale-110 transition-transform duration-300`}>
                      <level.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Students</div>
                      <div className="text-lg font-bold text-gray-900">{level.students}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {level.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{level.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {level.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Duration: <span className="font-semibold text-gray-900">{level.duration}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Career Pathways with Subject Combinations */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="w-4 h-4 mr-2" />
              Grade 10 Specialization
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Career Pathways & Subject Combinations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose from 40+ specialized subject combinations across three major pathways</p>
          </div>

          {/* Pathway Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              {pathwayTracks.map((pathway, index) => (
                <button
                  key={index}
                  onClick={() => setActivePathway(index)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activePathway === index
                      ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {pathway.pathway}
                </button>
              ))}
            </div>
          </div>

          {/* Active Pathway Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pathwayTracks[activePathway].tracks.map((track, index) => (
              <div key={index} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${track.color}`}></div>
                
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${track.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <track.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {track.name}
                      </h3>
                      <div className="text-sm text-gray-500">{pathwayTracks[activePathway].pathway}</div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                      Core Subjects:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {track.subjects.map((subject, subjectIndex) => (
                        <div key={subjectIndex} className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300">
                          {subject}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-blue-600" />
                      Career Opportunities:
                    </h4>
                    <div className="space-y-2">
                      {track.careers.map((career, careerIndex) => (
                        <div key={careerIndex} className="flex items-center text-sm text-gray-600">
                          <ChevronRight className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                          {career}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <Link
                      to="/admissions"
                      className={`w-full bg-gradient-to-r ${track.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 block text-center`}
                    >
                      Learn More About This Track
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Subjects Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Core Curriculum
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Subjects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive curriculum covering all essential learning areas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${subject.color}`}></div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${subject.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <subject.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {subject.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{subject.description}</p>
                  
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`h-1 bg-gradient-to-r ${subject.color} rounded-full`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Assessment & Reporting */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-sky-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Award className="w-4 h-4 mr-2" />
                Assessment Excellence
              </div>
              
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Assessment & 
                <span className="block bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                  Reporting
                </span>
              </h2>
              
              <p className="text-gray-200 mb-8 text-lg leading-relaxed">
                Our assessment system is designed to track student progress comprehensively,
                focusing on competency development and preparing students for national examinations and university entrance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {assessmentFeatures.map((feature, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <feature.icon className={`w-8 h-8 ${feature.color} mb-3`} />
                    <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/admissions"
                  className="bg-gradient-to-r from-blue-500 to-sky-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-400 hover:to-sky-400 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                >
                  View Sample Reports
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-center"
                >
                  Assessment Calendar
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-400 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Student assessment"
                className="relative rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating Stats */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <div className="text-xs text-gray-600">Pass Rate</div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-600">A</div>
                  <div className="text-xs text-gray-600">Average Grade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Academic Support Services */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Student Support
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Academic Support Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive support to ensure every student succeeds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportServices.map((service, index) => (
              <div key={index} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="bg-gradient-to-r from-blue-500 to-sky-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-center leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Link
                      to="/contact"
                      className="w-full text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300"
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

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-sky-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Star className="w-4 h-4 mr-2" />
            Start Your Academic Journey
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Excel in 
            <span className="block bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
              Academics?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Join St. Mary's School and experience world-class education with personalized pathways 
            that prepare you for university and career success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              to="/admissions"
              className="group bg-gradient-to-r from-blue-500 to-sky-500 text-white px-10 py-5 rounded-xl font-bold hover:from-blue-400 hover:to-sky-400 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
            >
              Apply for Admission
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform inline" />
            </Link>
            <Link
              to="/contact"
              className="group border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg"
            >
              <Calendar className="mr-3 h-6 w-6 inline" />
              Schedule Campus Visit
            </Link>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <BookOpen className="w-8 h-8 text-sky-400 mx-auto mb-3" />
              <div className="text-sm text-gray-300 mb-1">Academic Office</div>
              <div className="font-semibold">academics@stmarysschool.ac.ke</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-sm text-gray-300 mb-1">Admissions</div>
              <div className="font-semibold">+254 123 456 789</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <MapPin className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <div className="text-sm text-gray-300 mb-1">Campus Tours</div>
              <div className="font-semibold">Mon-Fri 9AM-4PM</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;