import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, BookOpen, Globe } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Consistently high performance in national examinations with personalized learning approaches through Grade 10."
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description: "Dedicated teachers with years of experience in nurturing young minds and character development at all levels."
    },
    {
      icon: BookOpen,
      title: "Complete CBC Program",
      description: "Full Competency-Based Curriculum from Pre-Primary through Grade 10, preparing students for university success."
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "Preparing students for success in an interconnected world with international partnerships and university preparation."
    }
  ];

  const stats = [
    { number: "500+", label: "Students" },
    { number: "25+", label: "Teachers" },
    { number: "30+", label: "Years of Excellence" },
    { number: "98%", label: "University Admission Rate" }
  ];

  const gradeHighlights = [
    {
      title: "Junior Secondary",
      description: "Career pathway introduction and advanced skill development",
      grades: "Grade 7 - 9"
    },
    {
      title: "Senior Secondary",
      description: "University preparation with specialized pathway focus",
      grades: "Grade 10"
    },
    {
      title: "High School - Girls",
      description: "The 8-4-4 system cohort, currently Form 2-4",
      grades: "8-4-4"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Shaping Tomorrow's
              <span className="block text-yellow-400">Leaders Today</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              At St. Mary's School, we provide exceptional education from Junior School (Grade 7-9) through Grade 10, 
              nurturing academic excellence, character development, and lifelong learning in a supportive Christian environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 flex items-center justify-center"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Levels Highlight */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Educational Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From early childhood through senior secondary, we provide a seamless educational experience 
              that prepares students for university and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gradeHighlights.map((highlight, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                  {highlight.grades}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose St. Mary's School?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive educational experience that prepares students for success in academics and life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade 10 Spotlight */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Grade 10 - Senior Secondary Excellence
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Our Grade 10 program represents the pinnacle of CBE education, offering specialized pathways 
                that prepare students for university entrance and career success.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></div>
                  <span className="text-gray-200">STEM, Sports & Arts, and Social Sciences</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></div>
                  <span className="text-gray-200">Center for ICT and Innovation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></div>
                  <span className="text-gray-200">University entrance exam preparation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></div>
                  <span className="text-gray-200">Industry partnerships and mentorship</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></div>
                  <span className="text-gray-200">Advanced research projects</span>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  to="/academics"
                  className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
                >
                  Explore Grade 10 Programs
                </Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Grade 10 students"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
            <p className="text-xl text-gray-600">Stay updated with our school activities and achievements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Grade 10 Students Excel in University Entrance Exams",
                date: "March 20, 2024",
                excerpt: "Our first cohort of Grade 10 students achieved outstanding results in university entrance examinations, with 98% gaining admission to top universities.",
                image: "5905709"
              },
              {
                title: "New STEM Laboratory Opens for Grade 10",
                date: "March 15, 2024",
                excerpt: "State-of-the-art STEM laboratory equipped with advanced technology to support our Grade 10 science and technology pathway students.",
                image: "2280571"
              },
              {
                title: "Student Excellence Awards Ceremony",
                date: "March 10, 2024",
                excerpt: "Celebrating our outstanding students across all grade levels who have shown exceptional performance in academics and extracurricular activities.",
                image: "159844"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={`https://images.pexels.com/photos/${item.image}/pexels-photo-${item.image}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                  alt="School news"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-blue-600 mb-2">{item.date}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.excerpt}
                  </p>
                  <Link to="/news" className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/news"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our School Community?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Take the first step towards your child's bright future. From Pre-Primary through Grade 10, 
            our admissions team is ready to guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admissions"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Start Application
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200"
            >
              Schedule Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;