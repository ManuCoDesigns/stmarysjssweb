import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Bell,
  CalendarCheck,
  GraduationCap,
  Building2,
  Lightbulb,
  Target,
  ChevronDown,
  Video,
  Image as ImageIcon,
  Clock,
  Zap,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Trophy,
  BookMarked,
  Microscope,
  Music,
  Palette,
  MessageSquare,
  Send,
} from "lucide-react";

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentFacility, setCurrentFacility] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const facilityInterval = setInterval(() => {
      setCurrentFacility((prev) => (prev + 1) % facilities.length);
    }, 4000);
    return () => clearInterval(facilityInterval);
  }, []);

  const features = [
    {
      icon: Award,
      title: "Academic Excellence",
      description:
        "Consistently high performance in national examinations with personalized learning approaches through Grade 10.",
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description:
        "Dedicated teachers with years of experience in nurturing young minds and character development at all levels.",
      gradient: "from-green-500 via-emerald-600 to-teal-700",
    },
    {
      icon: BookOpen,
      title: "Complete CBE Program",
      description:
        "Full Competency-Based Education from Grade 7-9 through Grade 10, preparing students for university success.",
      gradient: "from-purple-500 via-violet-600 to-purple-700",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description:
        "Preparing students for success in an interconnected world with international partnerships and university preparation.",
      gradient: "from-orange-500 via-red-500 to-pink-600",
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Students",
      icon: Users,
      color: "#3B82F6",
      bg: "from-blue-500 to-blue-700",
    },
    {
      number: "25+",
      label: "Teachers",
      icon: Award,
      color: "#10B981",
      bg: "from-green-500 to-green-700",
    },
    {
      number: "30+",
      label: "Years of Excellence",
      icon: Star,
      color: "#8B5CF6",
      bg: "from-purple-500 to-purple-700",
    },
    {
      number: "98%",
      label: "University Admission",
      icon: TrendingUp,
      color: "#F59E0B",
      bg: "from-amber-500 to-orange-700",
    },
  ];

  const gradeHighlights = [
    {
      title: "Junior Secondary",
      description: "Career pathway introduction and advanced skill development",
      grades: "Grade 7 - 9",
      icon: BookOpen,
      features: [
        "Foundation Skills",
        "Career Exploration",
        "Character Building",
      ],
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      iconBg: "from-blue-500 to-cyan-600",
    },
    {
      title: "Senior Secondary",
      description: "University preparation with specialized pathway focus",
      grades: "Grade 10",
      icon: Globe,
      features: [
        "University Prep",
        "Specialized Pathways",
        "Research Projects",
      ],
      gradient: "from-purple-600 via-pink-600 to-rose-600",
      iconBg: "from-purple-500 to-pink-600",
    },
    {
      title: "High School - Girls",
      description: "The 8-4-4 system cohort, currently Form 2-4",
      grades: "8-4-4",
      icon: Heart,
      features: [
        "Traditional Excellence",
        "Leadership Development",
        "Community Service",
      ],
      gradient: "from-green-600 via-emerald-600 to-teal-600",
      iconBg: "from-green-500 to-teal-600",
    },
  ];

  const testimonials = [
    {
      name: "Ann Jepngetich",
      role: "Parent of Grade 10 Student",
      content:
        "St. Mary's has transformed my daughter's approach to learning. The CBE program has given her confidence and critical thinking skills that will serve her well in university.",
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      name: "Abiagel Chemutai",
      role: "Grade 10 Graduate",
      content:
        "The STEM pathway at St. Mary's opened doors I never knew existed. I'm now studying Engineering at university, thanks to the solid foundation I received here.",
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      name: "Sr. Dr. Alice S.",
      role: "Education Consultant",
      content:
        "St. Mary's School represents the gold standard in CBE implementation. Their holistic approach to education is truly remarkable.",
      rating: 5,
      image: "/placeholder.svg",
    },
  ];

  const achievements = [
    {
      title: "Kenya Music Festivals, Band-National Level",
      year: "2025",
      icon: Award,
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Best CBE Implementation",
      year: "2025",
      icon: Star,
      gradient: "from-purple-400 to-pink-500",
    },
    {
      title: "Community Service Excellence",
      year: "2025",
      icon: Heart,
      gradient: "from-red-400 to-rose-500",
    },
    {
      title: "Top 5 performing school-KCSE 2024-Bomet region",
      year: "2024",
      icon: TrendingUp,
      gradient: "from-blue-400 to-cyan-500",
    },
  ];

  const scrollingNews = [
    {
      type: "interview",
      icon: CalendarCheck,
      text: "Entrance Interviews for New Students: 8th, 15th & 22nd November 2025 – Book Your Slot Early!",
      link: "/admissions",
    },
    {
      type: "announcement",
      icon: Bell,
      text: "Admissions Open for Grade 7–10, 2026 Academic Year – Apply Now!",
      link: "/admissions",
    },
    {
      type: "opening",
      icon: CalendarCheck,
      text: "School Reopens on 5th January 2026 for Term 1 – Welcome Back Students!",
      link: "/calendar",
    },
    {
      type: "announcement",
      icon: Bell,
      text: "Launch of New ICT Innovation Lab – Empowering Learners Through Digital Skills",
      link: "/news",
    },
    {
      type: "achievement",
      icon: Award,
      text: "St. Mary's Music Band Qualifies for Kenya Music Festival National Finals 2025",
      link: "/news",
    },
    {
      type: "achievement",
      icon: Star,
      text: "St. Mary's Ranked Among Top CBC Implementing Schools in the Rift Valley Region",
      link: "/about",
    },
    {
      type: "announcement",
      icon: Bell,
      text: "New Languages Introduced – French, German & Indigenous Language Program Now Available",
      link: "/academics",
    },
  ];

  const facilities = [
    {
      name: "ICT Innovation Lab",
      description: "State-of-the-art computer lab with latest technology",
      icon: Microscope,
      image: "/images/students1.jpg",
      features: ["50+ Computers", "High-Speed Internet", "Coding Classes"],
    },
    {
      name: "Science Laboratories",
      description: "Fully equipped labs for Physics, Chemistry, and Biology",
      icon: Microscope,
      image: "/images/gate.jpg",
      features: ["Modern Equipment", "Safety Standards", "Practical Learning"],
    },
    {
      name: "Music & Arts Center",
      description: "Professional facilities for music and creative arts",
      icon: Music,
      image: "/images/band1.jpg",
      features: ["Instruments", "Recording Studio", "Art Supplies"],
    },
    {
      name: "Sports Complex",
      description: "Comprehensive sports facilities for all activities",
      icon: Trophy,
      image: "/images/band2.jpg",
      features: ["Football Field", "Basketball Court", "Athletics Track"],
    },
  ];

  const upcomingEvents = [
    {
      date: "8 Nov",
      title: "Entrance Interviews - Session 1",
      time: "9:00 AM - 3:00 PM",
      type: "Admissions",
      color: "from-blue-500 to-blue-600",
    },
    {
      date: "15 Nov",
      title: "Entrance Interviews - Session 2",
      time: "9:00 AM - 3:00 PM",
      type: "Admissions",
      color: "from-blue-500 to-blue-600",
    },
    {
      date: "22 Nov",
      title: "Entrance Interviews - Session 3",
      time: "9:00 AM - 3:00 PM",
      type: "Admissions",
      color: "from-blue-500 to-blue-600",
    },
    {
      date: "5 Jan",
      title: "Term 1 Begins - 2026",
      time: "7:00 AM",
      type: "Academic",
      color: "from-green-500 to-green-600",
    },
  ];

  const successStories = [
    {
      name: "James Kipchoge",
      achievement: "Full Scholarship to MIT",
      year: "2024",
      pathway: "STEM",
      quote:
        "St. Mary's STEM program prepared me for the world's best universities.",
      image: "/placeholder.svg",
    },
    {
      name: "Sarah Chebet",
      achievement: "National Debate Champion",
      year: "2024",
      pathway: "Social Sciences",
      quote: "The critical thinking skills I learned here are invaluable.",
      image: "/placeholder.svg",
    },
    {
      name: "David Mutai",
      achievement: "National Athletics Gold Medal",
      year: "2025",
      pathway: "Sports & Arts",
      quote:
        "Balanced excellence in both sports and academics is possible here.",
      image: "/placeholder.svg",
    },
  ];

  const faqs = [
    {
      question: "What grades do you offer?",
      answer:
        "We offer Junior Secondary (Grade 7-9), Senior Secondary (Grade 10), and High School for Girls (Form 2-4 under the 8-4-4 system). Our CBE program provides a seamless educational journey preparing students for university entrance.",
    },
    {
      question: "What is the CBC curriculum?",
      answer:
        "The Competency-Based Curriculum (CBC) focuses on developing skills, knowledge, and values rather than just memorization. It emphasizes critical thinking, problem-solving, and real-world application through project-based learning and continuous assessment.",
    },
    {
      question: "What are the admission requirements?",
      answer:
        "Requirements vary by grade level. Generally, we require previous academic records, a completed application form, entrance assessment, and an interview. For Grade 7 entry, we require primary school completion certificates. Visit our Admissions page for detailed requirements.",
    },
    {
      question: "Do you offer boarding facilities?",
      answer:
        "Yes, we offer both boarding and day school options. Our boarding facilities provide a safe, nurturing environment with 24/7 supervision, comfortable dormitories, nutritious meals, and dedicated study time.",
    },
    {
      question: "What co-curricular activities are available?",
      answer:
        "We offer a wide range of activities including sports (athletics, football, basketball), music and band, drama and theater, debate clubs, science clubs, coding clubs, and community service programs. Our award-winning band regularly performs at national events.",
    },
    {
      question: "What is your university admission rate?",
      answer:
        "We maintain a 98% university admission rate. Our Grade 10 program is specifically designed to prepare students for university entrance examinations, with specialized pathways in STEM, Social Sciences, and Sports & Arts.",
    },
  ];

  const partners = [
    { name: "Kenya Institute of Curriculum Development" },
    { name: "Cambridge Assessment" },
    { name: "UNESCO Associated Schools" },
    { name: "Microsoft Education" },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="home-container">
      <style>{`
        /* Global Styles */
        .home-container {
          overflow-x: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Hero Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.6); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes fadeZoom {
          0%, 100% { opacity: 0; transform: scale(1.1); }
          10%, 45% { opacity: 1; transform: scale(1); }
          55%, 90% { opacity: 0; transform: scale(1.1); }
        }

        @keyframes glow-border {
          0% { box-shadow: 0 0 15px rgba(251, 191, 36, 0.3); }
          50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.6); }
          100% { box-shadow: 0 0 15px rgba(251, 191, 36, 0.3); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Utility Classes */
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .scroll-left:hover {
          animation-play-state: paused;
        }

        .animate-fadeZoom {
          animation: fadeZoom 12s infinite ease-in-out;
        }

        .animate-fadeZoom-delay-1 {
          animation: fadeZoom 12s infinite ease-in-out;
          animation-delay: 4s;
        }

        .animate-fadeZoom-delay-2 {
          animation: fadeZoom 12s infinite ease-in-out;
          animation-delay: 8s;
        }

        .animate-glow-border {
          animation: glow-border 3s ease-in-out infinite;
        }

        /* Card Hover Effects */
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Gradient Text */
        .gradient-text {
          background: linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #EF4444 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Glass Morphism */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-dark {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Button Styles */
        .btn-primary {
          background: linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%);
          color: #1F2937;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 700;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 25px -5px rgba(245, 158, 11, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 20px 35px -5px rgba(245, 158, 11, 0.6);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 700;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* Section Spacing */
        .section {
          padding: 6rem 1rem;
        }

        /* Responsive Grid */
        .grid-responsive {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        /* Stat Counter Animation */
        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
          transition: transform 0.3s ease;
        }

        .stat-card:hover .stat-number {
          transform: scale(1.15);
        }

        /* Newsletter Input */
        .newsletter-input {
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          backdrop-filter: blur(10px);
          width: 100%;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #FCD34D;
          background: rgba(255, 255, 255, 0.15);
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        /* Social Media Icons */
        .social-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .social-icon:hover {
          transform: translateY(-5px) scale(1.1);
        }

        /* Timeline Events */
        .event-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
        }

        .event-card:hover {
          transform: translateX(8px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
        }

        /* Facility Carousel */
        .facility-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 1.5rem;
          transition: transform 0.3s ease;
        }

        .facility-image:hover {
          transform: scale(1.05);
        }

        /* Success Story Cards */
        .success-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          position: relative;
        }

        .success-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899);
        }

        .success-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
        }

        /* Quote Styling */
        .quote-mark {
          font-size: 4rem;
          line-height: 0;
          color: #FCD34D;
          opacity: 0.3;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .section {
            padding: 3rem 1rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .facility-image {
            height: 250px;
          }
        }

        /* Loading Animation */
        .shimmer-effect {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        /* Scroll Progress Bar */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899);
          z-index: 9999;
          transition: width 0.2s ease;
        }
      `}</style>

      {/* Hero Section with Breaking News */}
      <section
        className="relative min-h-screen text-white overflow-hidden pt-8"
        style={{
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)",
        }}
      >
        {/* Breaking News Ticker */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-7xl z-40 glass rounded-xl shadow-2xl py-2 overflow-hidden">
          <div className="relative flex items-center">
            <div
              className="flex-shrink-0 px-4 py-1 rounded-r-full"
              style={{
                background: "linear-gradient(135deg, #EF4444, #DC2626)",
              }}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "#FEE2E2" }}
                ></div>
                <span className="font-bold text-sm tracking-wider text-white">
                  BREAKING NEWS
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-hidden mx-2">
              <div className="scroll-left whitespace-nowrap py-1 inline-block">
                <div className="inline-flex items-center space-x-12">
                  {[...scrollingNews, ...scrollingNews].map((news, index) => (
                    <Link
                      key={index}
                      to={news.link}
                      className="inline-flex items-center space-x-3 hover:text-yellow-300 transition-colors duration-300 px-4"
                      style={{ color: "white" }}
                    >
                      <news.icon className="w-4 h-4 flex-shrink-0 text-yellow-300" />
                      <span className="text-sm font-medium">{news.text}</span>
                      <div className="w-1 h-1 rounded-full bg-yellow-300/50"></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 glass px-3 py-1 rounded-l-full">
              <Link
                to="/news"
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300"
              >
                <span className="text-xs font-medium">VIEW ALL</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: "#3B82F6" }}
          ></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: "#A855F7", animationDelay: "2s" }}
          ></div>
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: "#EC4899", animationDelay: "4s" }}
          ></div>
        </div>

        {/* Pattern Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3,
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.2s", opacity: 0 }}
            >
              <div
                className="inline-flex items-center glass px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  color: "#FCD34D",
                  border: "1px solid rgba(252, 211, 77, 0.3)",
                }}
              >
                <Star className="w-4 h-4 mr-2" />
                35+ Years of Educational Excellence
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Shaping Tomorrow's
                <span className="block gradient-text">Leaders Today</span>
              </h1>

              <p
                className="text-xl md:text-2xl mb-8 leading-relaxed"
                style={{ color: "#E5E7EB" }}
              >
                At St. Mary's Mixed Junior and Senior School - Bomet, we provide
                exceptional education from Junior School (Grade 7-9) through
                Grade 10, nurturing academic excellence, character development,
                and lifelong learning.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/admissions" className="btn-primary">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/about" className="btn-secondary">
                  <Play className="w-5 h-5" />
                  Watch Video
                </Link>
              </div>

              {/* Contact Info */}
              <div
                className="flex flex-wrap gap-6 text-sm"
                style={{ color: "#D1D5DB" }}
              >
                <div className="flex items-center hover:text-yellow-300 transition-colors cursor-pointer">
                  <Phone className="w-4 h-4 mr-2" />
                  +254 721 771 568
                </div>
                <div className="flex items-center hover:text-yellow-300 transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 mr-2" />
                  stmaryssecbomet@gmail.com
                </div>
                <div className="flex items-center hover:text-yellow-300 transition-colors cursor-pointer">
                  <MapPin className="w-4 h-4 mr-2" />
                  Bomet, Kenya
                </div>
              </div>
            </div>

            {/* Right Content - Image Slider */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.4s", opacity: 0 }}
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl transform rotate-6 scale-105 opacity-20 animate-pulse-glow"
                  style={{
                    background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
                  }}
                ></div>

                <div className="relative rounded-3xl shadow-2xl w-full h-[420px] overflow-hidden border-4 border-transparent animate-glow-border">
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                    }}
                  ></div>

                  <img
                    src="/images/students1.jpg"
                    alt="St. Mary's students"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl animate-fadeZoom"
                  />
                  <img
                    src="/images/gate.jpg"
                    alt="School gate"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl animate-fadeZoom-delay-1"
                  />
                  <img
                    src="/images/GRADE 9 KNEC AGN.jpg"
                    alt="Campus"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl animate-fadeZoom-delay-2"
                  />
                </div>

                {/* Floating Stats Card */}
                <div
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white"
                          style={{
                            background: `linear-gradient(135deg, ${
                              i === 1
                                ? "#3B82F6"
                                : i === 2
                                ? "#8B5CF6"
                                : "#EC4899"
                            }, ${
                              i === 1
                                ? "#60A5FA"
                                : i === 2
                                ? "#A78BFA"
                                : "#F472B6"
                            })`,
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <div className="font-bold" style={{ color: "#1F2937" }}>
                        500+ Students
                      </div>
                      <div className="text-xs" style={{ color: "#6B7280" }}>
                        Thriving Community
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div
            className="w-6 h-10 border-2 rounded-full flex justify-center"
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
          >
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="section"
        style={{ background: "linear-gradient(135deg, #F9FAFB, #EFF6FF)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#1F2937" }}
            >
              Our Impact in Numbers
            </h2>
            <p className="text-xl" style={{ color: "#6B7280" }}>
              Three decades of educational excellence reflected in achievements
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card card-hover bg-white p-8 rounded-2xl shadow-lg border-2"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderColor: stat.color,
                  borderWidth: "2px",
                }}
              >
                <div className="text-center">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                    }}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="stat-number" style={{ color: stat.color }}>
                    {stat.number}
                  </div>
                  <div
                    className="font-semibold mt-2"
                    style={{ color: "#6B7280" }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-12" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Specialized Pathways",
                desc: "STEM, Social Sciences, Arts",
              },
              {
                icon: Building2,
                title: "Modern Facilities",
                desc: "Labs, Sports, ICT Center",
              },
              {
                icon: Shield,
                title: "Safe Environment",
                desc: "24/7 Security & Care",
              },
              {
                icon: Lightbulb,
                title: "Innovation Focus",
                desc: "Project-Based Learning",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card-hover flex items-start space-x-4 p-6 rounded-xl border-2"
                style={{
                  background: "linear-gradient(135deg, #F9FAFB, #EFF6FF)",
                  borderColor: "#E5E7EB",
                }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
                  }}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: "#1F2937" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#6B7280" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Levels */}
      <section className="section" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #DBEAFE, #BFDBFE)",
                color: "#1E40AF",
              }}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Educational Programs
            </div>
            <h2
              className="text-4xl md:text-6xl font-black mb-6"
              style={{ color: "#1F2937" }}
            >
              Complete Educational Journey
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "#6B7280" }}
            >
              From junior secondary through senior secondary, preparing students
              for university and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {gradeHighlights.map((highlight, index) => (
              <div
                key={index}
                className="card-hover relative overflow-hidden bg-white rounded-3xl shadow-xl border-2"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{
                    background: `linear-gradient(90deg, ${highlight.gradient
                      .split(" ")[0]
                      .replace("from-", "#")} 0%, ${highlight.gradient
                      .split(" ")[2]
                      .replace("to-", "#")} 100%)`,
                  }}
                ></div>

                <div className="p-8">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${
                        highlight.iconBg.replace("from-", "#").split(" ")[0]
                      }, ${
                        highlight.iconBg.replace("to-", "#").split(" ")[1]
                      })`,
                    }}
                  >
                    <highlight.icon className="h-8 w-8 text-white" />
                  </div>

                  <div
                    className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4"
                    style={{
                      background: "linear-gradient(135deg, #F3F4F6, #E5E7EB)",
                      color: "#374151",
                    }}
                  >
                    {highlight.grades}
                  </div>

                  <h3
                    className="text-2xl font-black mb-4"
                    style={{ color: "#1F2937" }}
                  >
                    {highlight.title}
                  </h3>

                  <p className="mb-6" style={{ color: "#6B7280" }}>
                    {highlight.description}
                  </p>

                  <div className="space-y-3">
                    {highlight.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm"
                        style={{ color: "#4B5563" }}
                      >
                        <CheckCircle
                          className="w-4 h-4 mr-3 flex-shrink-0"
                          style={{ color: "#10B981" }}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-6 pt-6 border-t"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <Link
                      to="/academics"
                      className="inline-flex items-center font-semibold hover:translate-x-2 transition-transform duration-300"
                      style={{ color: "#3B82F6" }}
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

      {/* Features Section */}
      <section
        className="section"
        style={{
          background: "linear-gradient(135deg, #F9FAFB 0%, #EFF6FF 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)",
                color: "#065F46",
              }}
            >
              <Award className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2
              className="text-4xl md:text-6xl font-black mb-6"
              style={{ color: "#1F2937" }}
            >
              Excellence in Every Aspect
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: "#6B7280" }}
            >
              Comprehensive educational experience for academic and life
              success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-hover relative bg-white p-8 rounded-3xl shadow-lg border-2"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{
                    background: `linear-gradient(90deg, ${feature.gradient
                      .split(" ")[0]
                      .replace("from-", "#")}, ${feature.gradient
                      .split(" ")[2]
                      .replace("to-", "#")})`,
                  }}
                ></div>

                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${
                      feature.gradient.replace("from-", "#").split(" ")[0]
                    }, ${feature.gradient.replace("via-", "#").split(" ")[1]})`,
                  }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#1F2937" }}
                >
                  {feature.title}
                </h3>

                <p style={{ color: "#6B7280" }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Showcase */}
      <section className="section" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
                color: "#92400E",
              }}
            >
              <Building2 className="w-4 h-4 mr-2" />
              World-Class Facilities
            </div>
            <h2
              className="text-4xl md:text-6xl font-black mb-6"
              style={{ color: "#1F2937" }}
            >
              State-of-the-Art Campus
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: "#6B7280" }}
            >
              Modern infrastructure supporting holistic education
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={facilities[currentFacility].image}
                alt={facilities[currentFacility].name}
                className="facility-image"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-8"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{
                      background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
                    }}
                  >
                    {React.createElement(facilities[currentFacility].icon, {
                      className: "w-6 h-6",
                      style: { color: "#1F2937" },
                    })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {facilities[currentFacility].name}
                    </h3>
                    <p className="text-gray-300">
                      {facilities[currentFacility].description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {facilities[currentFacility].features.map((feature, i) => (
                    <div
                      key={i}
                      className="glass px-3 py-1 rounded-full text-sm text-white"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {facilities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFacility(index)}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    background:
                      index === currentFacility ? "#F59E0B" : "#D1D5DB",
                    transform:
                      index === currentFacility ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section
        className="section"
        style={{
          background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
                color: "#991B1B",
              }}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Success Stories
            </div>
            <h2
              className="text-4xl md:text-6xl font-black mb-6"
              style={{ color: "#1F2937" }}
            >
              Celebrating Our Alumni
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: "#6B7280" }}
            >
              Inspiring achievements from our exceptional students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="success-card card-hover p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg mr-4"
                  />
                  <div>
                    <h3
                      className="font-bold text-lg"
                      style={{ color: "#1F2937" }}
                    >
                      {story.name}
                    </h3>
                    <div
                      className="inline-block px-2 py-1 rounded text-xs font-semibold"
                      style={{
                        background: "linear-gradient(135deg, #DBEAFE, #BFDBFE)",
                        color: "#1E40AF",
                      }}
                    >
                      {story.pathway}
                    </div>
                  </div>
                </div>

                <div
                  className="text-2xl font-black mb-3"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {story.achievement}
                </div>

                <p className="italic mb-4" style={{ color: "#6B7280" }}>
                  "{story.quote}"
                </p>

                <div
                  className="flex items-center text-sm"
                  style={{ color: "#9CA3AF" }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Class of {story.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #FCE7F3, #FBCFE8)",
                color: "#9F1239",
              }}
            >
              <Heart className="w-4 h-4 mr-2" />
              Testimonials
            </div>
            <h2
              className="text-4xl md:text-6xl font-black mb-6"
              style={{ color: "#1F2937" }}
            >
              What Our Community Says
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: "#6B7280" }}
            >
              Hear from parents, students, and experts
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div
              className="rounded-3xl p-8 md:p-12 shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #F9FAFB, #EFF6FF)",
              }}
            >
              <div className="text-center">
                <div className="quote-mark">&ldquo;</div>
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
                />

                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    )
                  )}
                </div>

                <blockquote
                  className="text-xl md:text-2xl mb-6 italic font-medium"
                  style={{ color: "#1F2937" }}
                >
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                <div className="text-lg font-bold" style={{ color: "#1F2937" }}>
                  {testimonials[currentTestimonial].name}
                </div>
                <div style={{ color: "#6B7280" }}>
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) =>
                      (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-2"
                style={{ borderColor: "#E5E7EB" }}
              >
                <ChevronLeft className="w-5 h-5" style={{ color: "#1F2937" }} />
              </button>
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) => (prev + 1) % testimonials.length
                  )
                }
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-2"
                style={{ borderColor: "#E5E7EB" }}
              >
                <ChevronRight
                  className="w-5 h-5"
                  style={{ color: "#1F2937" }}
                />
              </button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className="w-3 h-3 rounded-full transition-colors duration-300"
                  style={{
                    background:
                      index === currentTestimonial ? "#3B82F6" : "#D1D5DB",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grade 10 Spotlight */}
      <section
        className="section text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)",
        }}
      >
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: "#3B82F6" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: "#A855F7", animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center glass px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  color: "#FCD34D",
                  border: "1px solid rgba(252, 211, 77, 0.3)",
                }}
              >
                <Star className="w-4 h-4 mr-2" />
                Premier Program
              </div>

              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Grade 10 - Senior Secondary
                <span className="block gradient-text">Excellence</span>
              </h2>

              <p className="text-xl mb-8" style={{ color: "#E5E7EB" }}>
                Our Grade 10 program represents the pinnacle of CBE education,
                offering specialized pathways for university entrance and career
                success.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  "STEM, Sports & Arts, Social Sciences",
                  "ICT and Innovation Center",
                  "University Prep Programs",
                  "Industry Partnerships",
                  "Advanced Research Projects",
                  "International Exchange",
                ].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <div
                      className="w-2 h-2 rounded-full mr-4 group-hover:scale-150 transition-transform duration-300"
                      style={{ background: "#FCD34D" }}
                    ></div>
                    <span style={{ color: "#D1D5DB" }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/academics" className="btn-primary">
                  Explore Programs
                </Link>
                <Link to="/admissions" className="btn-secondary">
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl transform rotate-3 scale-105 opacity-20"
                style={{
                  background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
                }}
              ></div>
              <img
                src="/images/band1.jpg"
                alt="School band"
                className="relative rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <div
                    className="text-2xl font-black"
                    style={{ color: "#3B82F6" }}
                  >
                    98%
                  </div>
                  <div className="text-xs" style={{ color: "#6B7280" }}>
                    University Admission
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <div
                    className="text-2xl font-black"
                    style={{ color: "#10B981" }}
                  >
                    A
                  </div>
                  <div className="text-xs" style={{ color: "#6B7280" }}>
                    Average Grade
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section
        className="section"
        style={{
          background: "linear-gradient(135deg, #F9FAFB, #EFF6FF)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-black mb-4"
              style={{ color: "#1F2937" }}
            >
              Recent Achievements
            </h2>
            <p className="text-xl" style={{ color: "#6B7280" }}>
              Celebrating continued excellence and recognition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="card-hover bg-white p-6 rounded-2xl shadow-lg border-2"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="text-center">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${
                        achievement.gradient.replace("from-", "#").split(" ")[0]
                      }, ${
                        achievement.gradient.replace("to-", "#").split(" ")[1]
                      })`,
                    }}
                  >
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#1F2937" }}>
                    {achievement.title}
                  </h3>
                  <div className="text-sm" style={{ color: "#6B7280" }}>
                    {achievement.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
                color: "#92400E",
              }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Upcoming Events
            </div>
            <h2
              className="text-4xl md:text-5xl font-black mb-6"
              style={{ color: "#1F2937" }}
            >
              Mark Your Calendar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-card">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${
                        event.color.replace("from-", "#").split(" ")[0]
                      }, ${event.color.replace("to-", "#").split(" ")[1]})`,
                    }}
                  >
                    <div className="text-xs">{event.date.split(" ")[1]}</div>
                    <div className="text-2xl">{event.date.split(" ")[0]}</div>
                  </div>
                  <div className="flex-1">
                    <div
                      className="inline-block px-2 py-1 rounded text-xs font-semibold mb-2"
                      style={{
                        background: "linear-gradient(135deg, #F3F4F6, #E5E7EB)",
                        color: "#374151",
                      }}
                    >
                      {event.type}
                    </div>
                    <h3 className="font-bold mb-1" style={{ color: "#1F2937" }}>
                      {event.title}
                    </h3>
                    <div
                      className="flex items-center text-sm"
                      style={{ color: "#6B7280" }}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {event.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section
        className="section"
        style={{
          background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
                color: "#1F2937",
              }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Latest Updates
            </div>
            <h2
              className="text-4xl md:text-6xl font-black mb-6"
              style={{ color: "#1F2937" }}
            >
              School News & Events
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto"
              style={{ color: "#6B7280" }}
            >
              Stay updated with our school activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Grade 7 Learners Excel in Agriculture Assessment",
                date: "July 12, 2025",
                category: "Academic Excellence",
                excerpt:
                  "Grade 7 students showcased creativity and hands-on skills during their CBC Agriculture assessment.",
                image: "/images/Grade 7 agric.jpg",
                categoryColor: "#8B5CF6",
              },
              {
                title: "Band Represents School at Catholic Youth Rally",
                date: "July 05, 2025",
                category: "Faith & Culture",
                excerpt:
                  "The school band proudly represented St. Mary's at the Catholic Diocese of Kericho Youth Rally 2025.",
                image: "/images/band2.jpg",
                categoryColor: "#10B981",
              },
              {
                title: "School Band Shines at Rift Valley Regional Sports",
                date: "March 27, 2025",
                category: "Co-Curricular",
                excerpt:
                  "Our talented school band added color and pride to the Rift Valley Regional Sports.",
                image: "/images/band1.jpg",
                categoryColor: "#3B82F6",
              },
            ].map((item, index) => (
              <article
                key={index}
                className="card-hover bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: item.categoryColor }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div
                    className="flex items-center text-sm mb-3"
                    style={{ color: "#6B7280" }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.date}
                  </div>

                  <h3
                    className="text-xl font-black mb-4"
                    style={{ color: "#1F2937" }}
                  >
                    {item.title}
                  </h3>

                  <p className="mb-6" style={{ color: "#6B7280" }}>
                    {item.excerpt}
                  </p>

                  <Link
                    to="/news"
                    className="inline-flex items-center font-bold hover:translate-x-2 transition-transform duration-300"
                    style={{ color: "#3B82F6" }}
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
              className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              }}
            >
              View All News
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ background: "white" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                background: "linear-gradient(135deg, #DBEAFE, #BFDBFE)",
                color: "#1E40AF",
              }}
            >
              <Target className="w-4 h-4 mr-2" />
              FAQ
            </div>
            <h2
              className="text-4xl md:text-6xl font-black mb-6"
              style={{ color: "#1F2937" }}
            >
              Got Questions?
            </h2>
            <p className="text-xl" style={{ color: "#6B7280" }}>
              Everything you need to know about St. Mary's
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ borderColor: "#E5E7EB" }}
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-8 py-6 text-left flex items-center justify-between"
                  style={{
                    background: expandedFaq === index ? "#F9FAFB" : "white",
                  }}
                >
                  <span
                    className="text-lg font-bold pr-8"
                    style={{ color: "#1F2937" }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: "#3B82F6",
                      transform:
                        expandedFaq === index
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  />
                </button>
                {expandedFaq === index && (
                  <div
                    className="px-8 py-6"
                    style={{
                      background: "#F9FAFB",
                      borderTop: "2px solid #E5E7EB",
                    }}
                  >
                    <p style={{ color: "#6B7280" }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="mb-4" style={{ color: "#6B7280" }}>
              Still have questions?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center font-bold"
              style={{ color: "#3B82F6" }}
            >
              Contact our admissions team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16" style={{ background: "#F9FAFB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-black mb-4"
              style={{ color: "#1F2937" }}
            >
              Our Partners & Accreditations
            </h2>
            <p style={{ color: "#6B7280" }}>
              Proud to be associated with leading organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="card-hover flex items-center justify-center p-6 bg-white rounded-xl border-2 shadow-lg"
                style={{ borderColor: "#E5E7EB" }}
              >
                <span
                  className="text-sm font-semibold text-center"
                  style={{ color: "#6B7280" }}
                >
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        className="section text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)",
        }}
      >
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: "#3B82F6" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: "#A855F7", animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{
                background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
              }}
            >
              <Bell className="w-8 h-8" style={{ color: "#1F2937" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Stay Updated
            </h2>
            <p className="text-xl" style={{ color: "#E5E7EB" }}>
              Subscribe to our newsletter for latest updates, events, and news
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="newsletter-input flex-1"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
                  color: "#1F2937",
                }}
              >
                <Send className="w-5 h-5" />
                Subscribe
              </button>
            </div>
          </form>

          {/* Social Media */}
          <div className="mt-12">
            <p className="mb-6 text-lg">Follow Us</p>
            <div className="flex justify-center gap-4">
              {[
                { icon: Facebook, bg: "#3B82F6" },
                { icon: Twitter, bg: "#0EA5E9" },
                { icon: Instagram, bg: "#EC4899" },
                { icon: Youtube, bg: "#EF4444" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="social-icon"
                  style={{ background: social.bg }}
                >
                  <social.icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="section text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)",
        }}
      >
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: "#3B82F6" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
            style={{ background: "#A855F7", animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center glass px-6 py-3 rounded-full text-sm font-medium mb-8"
            style={{
              color: "#FCD34D",
              border: "1px solid rgba(252, 211, 77, 0.3)",
            }}
          >
            <Shield className="w-4 h-4 mr-2" />
            Join Our Excellence Community
          </div>

          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
            Ready to Join Our
            <span className="block gradient-text">School Community?</span>
          </h2>

          <p
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto"
            style={{ color: "#E5E7EB" }}
          >
            Take the first step towards your child's bright future. From Junior
            School through Grade 10, our admissions team is ready to guide you.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/admissions" className="btn-primary text-lg px-10 py-5">
              Start Application
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link to="/contact" className="btn-secondary text-lg px-10 py-5">
              <Calendar className="w-6 h-6" />
              Schedule Visit
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-dark rounded-2xl p-6">
              <Phone
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "#FCD34D" }}
              />
              <div className="text-sm mb-1" style={{ color: "#D1D5DB" }}>
                Call Us
              </div>
              <div className="font-bold">+254 721 771 568</div>
            </div>
            <div className="glass-dark rounded-2xl p-6">
              <Mail
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "#FCD34D" }}
              />
              <div className="text-sm mb-1" style={{ color: "#D1D5DB" }}>
                Email Us
              </div>
              <div className="font-bold">stmaryssecbomet@gmail.com</div>
            </div>
            <div className="glass-dark rounded-2xl p-6">
              <MapPin
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "#FCD34D" }}
              />
              <div className="text-sm mb-1" style={{ color: "#D1D5DB" }}>
                Visit Us
              </div>
              <div className="font-bold">Bomet, Kenya</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
