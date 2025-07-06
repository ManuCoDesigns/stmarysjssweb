"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Award,
  Heart,
  Target,
  Users,
  BookOpen,
  GraduationCap,
  Star,
  Trophy,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Clock,
  Building,
  Shield,
  Handshake,
} from "lucide-react"

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeValue, setActiveValue] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    // Auto-rotate values
    const valueInterval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length)
    }, 3000)
    return () => {
      clearInterval(valueInterval)
    }
  }, [])

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest standards in everything we do, fostering a culture of continuous improvement and achievement.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We nurture empathy, kindness, and understanding, creating a caring community where everyone feels valued.",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      icon: Target,
      title: "Integrity",
      description: "We uphold honesty, transparency, and moral principles in all our actions and decisions.",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Users,
      title: "Community",
      description: "We build strong partnerships between students, families, teachers, and the wider community.",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ]

  const achievements = [
    { number: "500+", label: "Students Enrolled", icon: Users, color: "text-blue-600" },
    { number: "98%", label: "University Success", icon: Trophy, color: "text-green-600" },
    { number: "30+", label: "Years Excellence", icon: Award, color: "text-purple-600" },
    { number: "20+", label: "Expert Teachers", icon: GraduationCap, color: "text-orange-600" },
  ]

  const educationLevels = [
    {
      level: "7-9",
      title: "Junior Secondary",
      description: "Career pathway introduction and advanced skill development with mentorship",
      icon: Target,
      color: "from-green-500 to-emerald-500",
      students: "150+",
      features: ["Career Pathways", "Advanced Skills", "Mentorship", "Leadership"],
    },
    {
      level: "10",
      title: "Senior Secondary",
      description: "University preparation with specialized pathways and advanced research projects",
      icon: GraduationCap,
      color: "from-purple-500 to-indigo-500",
      students: "70+",
      features: ["University Prep", "Specialized Tracks", "Research Projects", "Global Standards"],
    },
    {
      level: "Form 2-4",
      title: "8-4-4 Secondary",
      description: "University preparation with specialized pathways and advanced research projects",
      icon: GraduationCap,
      color: "from-purple-500 to-indigo-500",
      students: "70+",
      features: ["University Prep", "Specialized Tracks", "Research Projects", "Global Standards"],
    },
  ]

  const leadership = [
    { name: "Dr. Sr. Mary Gabriel C.", position: "Principal", image: "principal.jpg", department: "Administration" },
    { name: "Md. Kiama M.W", position: "Deputy Principal", image: "deputy.jpg", department: "Administration" },
    { name: "Dr. Johnson Bulowa", position: "Senior Teacher", image: "", department: "Academic" },
    { name: "Md. Bevaline C.", position: "Head of JSS", image: "", department: "Junior Secondary" },
    { name: "Md. Winnie C.", position: "IQASO", image: "", department: "Quality Assurance" },
    { name: "Mr. Cyrus L.", position: "Director Of Studies JSS", image: "", department: "Junior Secondary" },
    { name: "Md. Eunice G.", position: "Director Of Studies High School", image: "", department: "High School" },
    { name: "Mr. Emmanuel O.", position: "Examination Officer", image: "Exams1.jpg", department: "Examinations" },
    { name: "Mr. Fred O.", position: "H.O.D - Sciences", image: "", department: "Sciences" },
    { name: "Mr. Geoffrey B.", position: "Boarding Master", image: "", department: "Boarding" },
  ]

  const milestones = [
    {
      year: "1990",
      event: "Foundation",
      description: "Established by Franciscan Sisters of St. Joseph with 50 students",
      icon: Building,
      color: "from-blue-500 to-cyan-500",
    },
    {
      year: "1995",
      event: "First Graduation",
      description: "Outstanding KCSE results from our first graduating class",
      icon: Award,
      color: "from-green-500 to-emerald-500",
    },
    {
      year: "2000",
      event: "Major Expansion",
      description: "New dormitories and laboratory facilities added",
      icon: Building,
      color: "from-purple-500 to-violet-500",
    },
    {
      year: "2010",
      event: "Excellence Award",
      description: "Top performing school in the region recognition",
      icon: Award,
      color: "from-orange-500 to-red-500",
    },
    {
      year: "2025",
      event: "Digital Learning",
      description: "Smart classrooms and digital platform launched",
      icon: BookOpen,
      color: "from-indigo-500 to-blue-500",
    },
    {
      year: "2025",
      event: "Grade 10 Launch",
      description: "Introduction of Grade 10 with advanced curriculum",
      icon: BookOpen,
      color: " from-teal-500 to-cyan-500",
    },
  ]

  const coreValues = [
    {
      icon: Heart,
      title: "God Centeredness",
      description: "Faith-based foundation in all we do",
    },
    {
      icon: Handshake,
      title: "Respect",
      description: "Honoring dignity and diversity",
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Collaborative learning environment",
    },
    {
      icon: Shield,
      title: "Responsibility",
      description: "Ownership of actions and outcomes",
    },
    {
      icon: CheckCircle,
      title: "Accountability",
      description: "Commitment to excellence and integrity",
    },
  ]

  const stats = [
    { number: "1990", label: "Founded", icon: Calendar, color: "text-blue-600" },
    { number: "500+", label: "Students", icon: Users, color: "text-green-600" },
    { number: "34", label: "Years", icon: Clock, color: "text-purple-600" },
    { number: "95%", label: "Success Rate", icon: Award, color: "text-orange-600" },
  ]

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
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div
              className={`transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <div className="inline-flex items-center bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Award className="w-4 h-4 mr-2" />
                Excellence Since 1990
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                About
                <span className="block bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                  St. Mary's
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl leading-relaxed">
                Founded in 1990, St. Mary's School has been a beacon of educational excellence in Bomet Region, shaping
                young minds and building character from Pre-Primary through Grade 10 in a nurturing Christian
                environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group bg-gradient-to-r from-blue-500 to-sky-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-400 hover:to-sky-400 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Our Story
                </button>
                <button className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
                  <Users className="mr-2 h-5 w-5" />
                  Meet Our Team
                </button>
              </div>
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center"
                  >
                    <achievement.icon className={`w-6 h-6 ${achievement.color} mx-auto mb-2`} />
                    <div className="text-xl font-bold text-white">{achievement.number}</div>
                    <div className="text-xs text-gray-300">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-400 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
                <img
                  src="/images/OurHistory.jpg"
                  alt="St. Mary's School"
                  className="relative rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Achievement Cards */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="text-center">
                    <Award className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-600">30+ Years</div>
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

      {/* Enhanced Core Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Our Foundation
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Core Values</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              These fundamental principles guide everything we do and shape the character of our school community across
              all grade levels.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 ${activeValue === index ? "scale-105 shadow-2xl" : ""}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                ></div>
                <div className="relative text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`h-1 bg-gradient-to-r ${value.color} rounded-full`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Educational Excellence */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4 mr-2" />
              Educational Excellence
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Education</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our approach spans from early years through senior secondary
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationLevels.map((level, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${level.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <level.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Students</div>
                      <div className="text-lg font-bold text-gray-900">{level.students}</div>
                    </div>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{level.level}</div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {level.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed text-center">{level.description}</p>
                  <div className="space-y-2">
                    {level.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform duration-300 mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced History Timeline - Revised with Expanded Image */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full -translate-x-32 -translate-y-32 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full translate-x-40 translate-y-40 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Content - Compressed */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold shadow-md backdrop-blur-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Our Journey
                  <Sparkles className="w-3 h-3 ml-2 animate-pulse" />
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
                  Our Rich History
                </h2>

                <p className="text-gray-600 text-base leading-relaxed">
                  St. Mary's School was established in 1990 by the{" "}
                  <span className="font-semibold text-indigo-700">Franciscan Sisters of St. Joseph (FSSJ) Asumbi</span>.
                  From 50 students to over 500, we've maintained our commitment to academic excellence while embracing
                  modern educational approaches including Kenya's Competency-Based Education (CBE).
                </p>
              </div>

              {/* Compact Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-300 to-purple-200 rounded-full"></div>

                <div className="space-y-4">
                  {milestones.map((milestone, index) => {
                    const IconComponent = milestone.icon
                    return (
                      <div key={index} className="flex items-start group relative">
                        {/* Timeline Dot */}
                        <div className="absolute left-5 w-3 h-3 bg-white border-2 border-indigo-300 rounded-full group-hover:border-indigo-500 transition-colors duration-300 z-10"></div>

                        {/* Year Badge */}
                        <div
                          className={`bg-gradient-to-r ${milestone.color} text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xs mr-4 group-hover:scale-110 transition-all duration-300 shadow-lg relative z-10`}
                        >
                          {milestone.year.slice(-2)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-white/60 backdrop-blur-sm p-3 rounded-xl shadow-sm group-hover:shadow-md group-hover:bg-white/80 transition-all duration-300 border border-white/40">
                          <div className="flex items-center mb-1">
                            <div
                              className={`bg-gradient-to-r ${milestone.color} w-6 h-6 rounded-lg flex items-center justify-center mr-2`}
                            >
                              <IconComponent className="h-3 w-3 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm group-hover:text-indigo-700 transition-colors duration-300">
                              {milestone.event}
                            </h4>
                          </div>
                          <p className="text-gray-600 text-xs leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Content - Expanded Image */}
            <div className="lg:col-span-3 relative">
              {/* Main Image Container - Much Larger */}
              <div className="relative group">
                {/* Background Decorations */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-3xl transform rotate-2 scale-105 opacity-15 group-hover:rotate-3 group-hover:scale-110 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-purple-300 via-pink-300 to-blue-300 rounded-3xl transform -rotate-1 scale-95 opacity-10 group-hover:-rotate-2 group-hover:scale-100 transition-all duration-700"></div>

                {/* Expanded Image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="/images/OurHistory.jpg"
                    alt="School History - St. Mary's School Journey"
                    className="w-full h-[500px] lg:h-[600px] object-cover transform group-hover:scale-105 transition-all duration-700 border-4 border-white/50"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Image Overlay Content */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">34 Years of Excellence</h3>
                    <p className="text-gray-600 text-sm">
                      From a small institution to one of Kenya's most respected schools, our journey continues with
                      unwavering commitment to educational excellence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Compact Floating Stats Cards */}
              <div className="absolute -top-4 -left-4 grid grid-cols-2 gap-2">
                {stats.slice(0, 2).map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div
                      key={index}
                      className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/50 hover:scale-110 transition-all duration-300 group"
                    >
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <IconComponent className={`w-4 h-4 ${stat.color} mr-1`} />
                          <div className={`text-lg font-bold ${stat.color}`}>{stat.number}</div>
                        </div>
                        <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="absolute -bottom-4 -right-4 grid grid-cols-2 gap-2">
                {stats.slice(2).map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div
                      key={index}
                      className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/50 hover:scale-110 transition-all duration-300 group"
                    >
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <IconComponent className={`w-4 h-4 ${stat.color} mr-1`} />
                          <div className={`text-lg font-bold ${stat.color}`}>{stat.number}</div>
                        </div>
                        <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Achievement Badge */}
              <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-full shadow-xl animate-pulse hover:animate-none hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission & Vision with Core Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Target className="w-5 h-5 mr-2" />
              Our Purpose
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Guiding principles that drive our educational excellence and shape tomorrow's leaders
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Mission Card */}
            <div className="group relative bg-white p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-6 border border-blue-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-blue-900 mb-8 text-center">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed text-lg text-center">
                  To provide an{" "}
                  <span className="font-semibold text-blue-700">Excellent, Modern and God-Centered Environment</span>{" "}
                  for Holistic Learning Development of Skills and Sound Character Formation.
                </p>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative bg-white p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-6 border border-purple-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-16 -translate-x-16 opacity-50"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                  <Lightbulb className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-purple-900 mb-8 text-center">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed text-lg text-center">
                  To be a{" "}
                  <span className="font-semibold text-purple-700">
                    World Class Model Senior and Junior Secondary School
                  </span>{" "}
                  that Empowers Learners to Excel in Academics and Skills Competencies.
                </p>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-12">
              <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">Our Core Values</h3>
              <p className="text-indigo-100 text-lg">The fundamental principles that guide our educational journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <div
                    key={index}
                    className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 border border-white/20 cursor-pointer"
                  >
                    <div className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2 text-center">{value.title}</h4>
                    <p className="text-indigo-100 text-sm text-center leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center mt-12 space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white/30 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Leadership Team */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4 mr-2" />
              Leadership Excellence
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals leading our school community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={
                      leader.image
                        ? `/images/${leader.image}`
                        : `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`
                    }
                    alt={leader.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                    {leader.department}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {leader.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">{leader.position}</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Principal's Message */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
              <img
                src="/images/principal2.jpg"
                alt="Principal"
                className="relative rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
              />
              {/* Floating Quote */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="text-center">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                  <div className="text-xs font-semibold text-gray-600">Excellence</div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Heart className="w-4 h-4 mr-2" />
                Leadership Message
              </div>
              <h2 className="text-4xl font-bold mb-8 leading-tight">
                Message from Our
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Principal
                </span>
              </h2>
              <blockquote className="text-xl italic mb-8 text-gray-200 leading-relaxed border-l-4 border-blue-400 pl-6">
                "At St. Mary's School, we believe that every child has unique talents and potential waiting to be
                discovered and nurtured. Our dedicated team of educators works tirelessly to create an environment where
                students can thrive academically, socially, and spiritually from their earliest years through Grade 10."
              </blockquote>
              <p className="text-gray-200 mb-6 leading-relaxed">
                We are committed to preparing our students not just for examinations, but for life and university
                success. Through our comprehensive curriculum spanning Junior-School through Grade 10, extracurricular
                activities, and character development programs, we ensure that our graduates are well-rounded
                individuals ready to make positive contributions to society.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center">
                  <img src="/images/principal2.jpg" alt="Principal" className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <p className="font-bold text-white text-lg">Dr. Sr. Mary Gabriel C.</p>
                    <p className="text-blue-300">Principal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Achievements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Our Success
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Achievements</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrating excellence across all educational levels
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "98%",
                label: "University Admission Rate",
                icon: GraduationCap,
                color: "from-blue-500 to-blue-600",
              },
              { number: "95%", label: "KJSEA & KPLEA Excellence", icon: Award, color: "from-green-500 to-green-600" },
              { number: "50+", label: "Awards & Recognition", icon: Trophy, color: "from-yellow-500 to-orange-500" },
              {
                number: "100%",
                label: "CBE Implementation",
                icon: CheckCircle,
                color: "from-purple-500 to-purple-600",
              },
            ].map((achievement, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${achievement.color}`}></div>
                <div className="p-8 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${achievement.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {achievement.number}
                  </div>
                  <p className="text-gray-600 font-medium">{achievement.label}</p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`h-1 bg-gradient-to-r ${achievement.color} rounded-full`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Join Our Community
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Be Part of
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Story?
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Join St. Mary's School and become part of a legacy of excellence that has been shaping young minds for over
            three decades.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-5 rounded-xl font-bold hover:from-blue-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg">
              Apply for Admission
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform inline" />
            </button>
            <button className="group border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-lg">
              <Calendar className="mr-3 h-6 w-6 inline" />
              Schedule a Visit
            </button>
          </div>
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-sm text-gray-300 mb-1">Email Us</div>
              <div className="font-semibold">info@stmarysschool.ac.ke</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Phone className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-sm text-gray-300 mb-1">Call Us</div>
              <div className="font-semibold">+254 123 456 789</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <MapPin className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-sm text-gray-300 mb-1">Visit Us</div>
              <div className="font-semibold">Bomet, Kenya</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About