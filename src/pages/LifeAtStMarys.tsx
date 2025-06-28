import React from 'react';
import { Heart, Users, Star, Globe, Music, Palette, Trophy, Book } from 'lucide-react';

const LifeAtStMarys: React.FC = () => {
  const schoolLife = [
    {
      icon: Users,
      title: "Inclusive Community",
      description: "A diverse and welcoming environment where every student feels valued and supported in their journey."
    },
    {
      icon: Heart,
      title: "Pastoral Care",
      description: "Comprehensive support system focusing on emotional, social, and spiritual development of each child."
    },
    {
      icon: Star,
      title: "Leadership Development",
      description: "Opportunities for students to develop leadership skills through prefect systems and student council."
    },
    {
      icon: Globe,
      title: "Global Citizenship",
      description: "Preparing students to be responsible global citizens with understanding of diverse cultures."
    }
  ];

  const clubs = [
    {
      name: "Debate Club",
      description: "Developing critical thinking and public speaking skills",
      image: "https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Science Club",
      description: "Hands-on experiments and scientific discovery",
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Environmental Club",
      description: "Conservation projects and environmental awareness",
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Drama Club",
      description: "Creative expression through theater and performance",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Chess Club",
      description: "Strategic thinking and competitive chess playing",
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Computer Club",
      description: "Technology skills and coding fundamentals",
      image: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const sports = [
    {
      name: "Football",
      description: "Boys and girls teams competing at regional level"
    },
    {
      name: "Basketball",
      description: "Indoor court with professional coaching"
    },
    {
      name: "Athletics",
      description: "Track and field events with modern facilities"
    },
    {
      name: "Swimming",
      description: "Swimming lessons and competitive teams"
    },
    {
      name: "Volleyball",
      description: "Both indoor and beach volleyball training"
    },
    {
      name: "Table Tennis",
      description: "Regular tournaments and skill development"
    }
  ];

  const traditions = [
    {
      event: "Founders' Day",
      description: "Annual celebration of our school's heritage and achievements"
    },
    {
      event: "Sports Week",
      description: "Inter-house competitions fostering teamwork and school spirit"
    },
    {
      event: "Cultural Festival",
      description: "Celebration of Kenya's diverse cultures through music, dance, and art"
    },
    {
      event: "Science Fair",
      description: "Student innovations and scientific discoveries on display"
    },
    {
      event: "Academic Awards",
      description: "Recognition of outstanding academic achievements and character"
    },
    {
      event: "Graduation Ceremony",
      description: "Formal celebration of student achievements and transitions"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-800 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Life at St. Mary's</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Experience a vibrant school community where learning extends beyond the classroom, 
              fostering personal growth, lasting friendships, and unforgettable memories.
            </p>
          </div>
        </div>
      </section>

      {/* School Life Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Our Community Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At St. Mary's School, we create an environment where every student can thrive academically, 
              socially, and personally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schoolLife.map((aspect, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <aspect.icon className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{aspect.title}</h3>
                <p className="text-gray-600">{aspect.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs and Activities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Clubs and Activities</h2>
            <p className="text-xl text-gray-600">Discover your passion and develop new skills through our diverse range of clubs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{club.name}</h3>
                  <p className="text-gray-600">{club.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Program */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sports & Athletics</h2>
              <p className="text-gray-600 mb-8">
                Our comprehensive sports program promotes physical fitness, teamwork, and competitive spirit. 
                Students can participate in various sports with professional coaching and modern facilities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sports.map((sport, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Trophy className="h-6 w-6 text-pink-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{sport.name}</h4>
                      <p className="text-sm text-gray-600">{sport.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/2105028/pexels-photo-2105028.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Students playing sports"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Arts & Creativity */}
      <section className="py-20 bg-pink-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Students in art class"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Arts & Creativity</h2>
              <p className="text-gray-200 mb-8">
                We believe in nurturing creativity and artistic expression. Our arts program includes visual arts, 
                music, drama, and creative writing, providing students with outlets for self-expression and cultural appreciation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Palette className="h-8 w-8 text-pink-400" />
                  <div>
                    <h4 className="font-semibold">Visual Arts</h4>
                    <p className="text-gray-300 text-sm">Drawing, painting, sculpture, and digital art</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Music className="h-8 w-8 text-pink-400" />
                  <div>
                    <h4 className="font-semibold">Music Program</h4>
                    <p className="text-gray-300 text-sm">Choir, instrumental music, and music theory</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Book className="h-8 w-8 text-pink-400" />
                  <div>
                    <h4 className="font-semibold">Drama & Literature</h4>
                    <p className="text-gray-300 text-sm">Theater productions and creative writing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Traditions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">School Traditions & Events</h2>
            <p className="text-xl text-gray-600">Annual celebrations that bring our community together</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {traditions.map((tradition, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-pink-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{tradition.event}</h3>
                <p className="text-gray-600">{tradition.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-xl text-gray-600">Hear from our current students about their experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Wanjiku",
                grade: "Grade 8",
                quote: "St. Mary's has helped me discover my passion for science and given me confidence to pursue my dreams.",
                image: "3184339"
              },
              {
                name: "David Ochieng",
                grade: "Grade 7",
                quote: "The teachers here really care about us and help us grow not just academically but as good people.",
                image: "3184338"
              },
              {
                name: "Grace Mutiso",
                grade: "Grade 9",
                quote: "I love being part of the debate club and student council. It's taught me leadership skills I'll use forever.",
                image: "3184337"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <img
                  src={`https://images.pexels.com/photos/${testimonial.image}/pexels-photo-${testimonial.image}.jpeg?auto=compress&cs=tinysrgb&w=200`}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <blockquote className="text-gray-600 italic mb-4">"{testimonial.quote}"</blockquote>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Community CTA */}
      <section className="py-20 bg-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Become Part of Our Family</h2>
          <p className="text-xl text-gray-200 mb-8">
            Experience the vibrant community life at St. Mary's School. Schedule a visit to see our facilities 
            and meet our wonderful students and staff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admissions"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Apply Now
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-900 transition-colors duration-200"
            >
              Schedule Visit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifeAtStMarys;