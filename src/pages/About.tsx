import React from 'react';
import { Award, Heart, Target, Users } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, fostering a culture of continuous improvement and achievement."
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We nurture empathy, kindness, and understanding, creating a caring community where everyone feels valued."
    },
    {
      icon: Target,
      title: "Integrity",
      description: "We uphold honesty, transparency, and moral principles in all our actions and decisions."
    },
    {
      icon: Users,
      title: "Community",
      description: "We build strong partnerships between students, families, teachers, and the wider community."
    },

  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About St. Mary's School - Bomet</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Founded in 1996, St. Mary's School has been a beacon of educational excellence in Bomet Region for over five decades,
              shaping young minds and building character from Junior School through Grade 10 in a nurturing Christian environment.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
              <p className="text-gray-600 mb-6">
                St. Mary's School was established in 1996 by the Congregation of the Fransiscan Sisters of St. Joseph (FSSJ) Asumbi, who recognized the need for quality education in our region. What started as a small institution with just 50 students has grown into one of the most respected schools in Kenya.
              </p>
              <p className="text-gray-600 mb-6">
                Over the years, we have maintained our commitment to academic excellence while adapting to modern
                educational approaches. We were among the first schools to fully embrace Kenya's Competency-Based
                Education (CBE) and have successfully extended our program through Grade 10, preparing students
                for university entrance and career success.
              </p>
              <p className="text-gray-600 mb-6">
                Our graduates have gone on to excel in universities worldwide and have become leaders in various
                fields including medicine, engineering, law, business, and public service. Many of our Grade 10
                graduates have gained admission to top universities both locally and internationally.
              </p>
              <p className="text-gray-600">
                Today, St. Mary's School serves over 500 students from diverse backgrounds, united by our shared
                commitment to learning, growth, and service to others. Our complete Pre-Primary through Grade 10
                program ensures continuity and excellence throughout each student's educational journey.
              </p>
            </div>
            <div>
              <img
                src={`/images/OurHistory.jpg`}
                alt="Principal"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide exceptional education from Pre-Primary through Grade 10 that nurtures academic excellence,
                character development, and spiritual growth in a supportive Christian environment, preparing students
                to be responsible global citizens, future leaders, and successful university candidates.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading educational institution that transforms lives through holistic education from
                early childhood through senior secondary, fostering innovation, critical thinking, and moral
                integrity to create positive change in our communities and prepare students for university
                and career success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide everything we do and shape the character of our school community
              across all grade levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Excellence */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Excellence Across All Levels</h2>
            <p className="text-xl text-gray-600">Our comprehensive approach to education from early years through senior secondary</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">PP1-PP2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pre-Primary</h3>
              <p className="text-gray-600 text-sm">Foundation years with play-based learning and school readiness preparation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1-6</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Primary School</h3>
              <p className="text-gray-600 text-sm">Strong foundation in core subjects with CBC methodology and competency development</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">7-9</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Junior Secondary</h3>
              <p className="text-gray-600 text-sm">Career pathway introduction and advanced skill development with mentorship</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Senior Secondary</h3>
              <p className="text-gray-600 text-sm">University preparation with specialized pathways and advanced research projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={`/images/principal.jpg`}
                alt="Principal"
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Message from Our Principal</h2>
              <blockquote className="text-lg italic mb-6 text-gray-200">
                "At St. Mary's School, we believe that every child has unique talents and potential waiting to be
                discovered and nurtured. Our dedicated team of educators works tirelessly to create an environment
                where students can thrive academically, socially, and spiritually from their earliest years through
                Grade 10."
              </blockquote>
              <p className="text-gray-200 mb-4">
                We are committed to preparing our students not just for examinations, but for life and university success.
                Through our comprehensive curriculum spanning Pre-Primary through Grade 10, extracurricular activities,
                and character development programs, we ensure that our graduates are well-rounded individuals ready to
                make positive contributions to society and excel in higher education.
              </p>
              <p className="text-gray-200 mb-6">
                Our Grade 10 program represents the culmination of our educational excellence, providing specialized
                pathways that prepare students for university entrance and career success in an increasingly competitive world.
              </p>
              <div>
                <p className="font-semibold">Dr. Sr. Mary Gabriel C.</p>
                <p className="text-gray-300">Principal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Leadership */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the dedicated professionals leading our school community</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { name: "Dr. Sr. Mary Gabriel C.", position: "Principal", image: "principal.jpg" },
              { name: "Md. Kiama M.W", position: "Deputy Principal", image: "deputy.jpg" },
              { name: "Md. Bevaline C.", position: "Head of JSS", image: "head_of_jss.jpg" },
              { name: "Mr. Emmanuel O.", position: "Examination Officer", image: "Exams.jpg" },
              { name: "Mr. Emmanuel O.", position: "Examination Officer", image: "Exams.jpg" },
              { name: "Mr. Emmanuel O.", position: "Examination Officer", image: "Exams.jpg" }
            ].map((leader, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                <img
                  src={`/images/${leader.image}`}
                  alt={leader.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{leader.name}</h3>
                <p className="text-blue-600 font-medium">{leader.position}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">Celebrating excellence across all educational levels</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-700">University Admission Rate (Grade 10)</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <p className="text-gray-700">KJSEA & KPLEA Excellence Rate</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-700">Awards & Recognition</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-700">CBE Implementation</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;