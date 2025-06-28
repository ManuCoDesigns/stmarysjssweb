import React from 'react';
import { BookOpen, Users, Clock, Award } from 'lucide-react';

const Academics: React.FC = () => {
  const subjects = [
    { name: "English Language", description: "Developing communication skills and literary appreciation" },
    { name: "Kiswahili", description: "National language proficiency and cultural understanding" },
    { name: "Mathematics", description: "Building analytical and problem-solving capabilities" },
    { name: "Science & Technology", description: "Integrated science with hands-on experiments" },
    { name: "Social Studies", description: "Understanding society, history, and geography" },
    { name: "Religious Education", description: "Moral and spiritual development" },
    { name: "Creative Arts", description: "Music, art, and creative expression" },
    { name: "Physical Education", description: "Health, fitness, and sports development" },
    { name: "Life Skills", description: "Practical skills for daily living and decision making" },
    { name: "Foreign Languages", description: "French and German language options" }
  ];

  const levels = [
    {
      title: "Pre-Primary (PP1 & PP2)",
      description: "Foundation years focusing on play-based learning and school readiness",
      features: ["Play-based learning", "Social skills development", "Basic literacy and numeracy", "Creative activities"]
    },
    {
      title: "Lower Primary (Grade 1-3)",
      description: "Building fundamental skills in literacy, numeracy, and life skills",
      features: ["CBC curriculum implementation", "Competency-based assessment", "Integrated learning", "Character development"]
    },
    {
      title: "Upper Primary (Grade 4-6)",
      description: "Advanced primary education preparing for junior secondary",
      features: ["Subject specialization", "Project-based learning", "Leadership opportunities", "Career guidance"]
    },
    {
      title: "Junior Secondary (Grade 7-9)",
      description: "Comprehensive secondary foundation with career pathways",
      features: ["Career pathways introduction", "Advanced projects", "Mentorship programs", "University preparation"]
    },
    {
      title: "Senior Secondary (Grade 10)",
      description: "Specialized learning in chosen career pathways with university preparation",
      features: ["Pathway specialization", "University entrance preparation", "Advanced research projects", "Industry partnerships"]
    }
  ];

  const pathways = [
    {
      title: "STEM Pathway",
      description: "Science, Technology, Engineering, and Mathematics focus",
      subjects: ["Advanced Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Engineering Design"],
      careers: ["Engineering", "Medicine", "Research", "Technology", "Architecture"]
    },
    {
      title: "Arts & Humanities",
      description: "Creative arts, languages, and social sciences emphasis",
      subjects: ["Literature", "History", "Geography", "Languages", "Philosophy", "Creative Arts"],
      careers: ["Law", "Journalism", "Teaching", "Arts", "Social Work"]
    },
    {
      title: "Business & Economics",
      description: "Commerce, entrepreneurship, and economic studies",
      subjects: ["Business Studies", "Economics", "Accounting", "Marketing", "Entrepreneurship", "Statistics"],
      careers: ["Business Management", "Finance", "Marketing", "Entrepreneurship", "Economics"]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Excellence</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Our comprehensive CBC curriculum spans from Pre-Primary to Grade 10, designed to develop critical thinking, creativity, 
              and practical skills that prepare students for success in higher education and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* CBC Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Competency-Based Curriculum (CBC)
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have fully embraced Kenya's CBC system from Pre-Primary through Grade 10, focusing on competency development 
              rather than content coverage, ensuring our students are well-prepared for university and career success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Competency-Based",
                description: "Focus on skills and abilities rather than just knowledge"
              },
              {
                icon: Users,
                title: "Learner-Centered",
                description: "Individualized learning paths for every student"
              },
              {
                icon: Clock,
                title: "Flexible Pacing",
                description: "Students progress at their own optimal pace"
              },
              {
                icon: Award,
                title: "Continuous Assessment",
                description: "Regular evaluation and feedback for improvement"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Levels</h2>
            <p className="text-xl text-gray-600">Comprehensive education from early years through senior secondary</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {levels.map((level, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-green-700 mb-4">{level.title}</h3>
                <p className="text-gray-600 mb-6">{level.description}</p>
                <ul className="space-y-2">
                  {level.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Pathways for Grade 10 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Grade 10 Career Pathways</h2>
            <p className="text-xl text-gray-600">Specialized tracks preparing students for university and career success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pathways.map((pathway, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-500">
                <h3 className="text-2xl font-bold text-green-700 mb-4">{pathway.title}</h3>
                <p className="text-gray-600 mb-6">{pathway.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Core Subjects:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {pathway.subjects.map((subject, subjectIndex) => (
                      <div key={subjectIndex} className="text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded">
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Career Opportunities:</h4>
                  <ul className="space-y-2">
                    {pathway.careers.map((career, careerIndex) => (
                      <li key={careerIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Subjects</h2>
            <p className="text-xl text-gray-600">Comprehensive curriculum covering all essential learning areas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{subject.name}</h3>
                <p className="text-gray-600">{subject.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment & Reporting */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Assessment & Reporting</h2>
              <p className="text-gray-200 mb-6">
                Our assessment system is designed to track student progress comprehensively, 
                focusing on competency development and preparing students for national examinations and university entrance.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-200">Continuous Assessment and Evaluation (CAE)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-200">Portfolio-based documentation of learning</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-200">Regular parent-teacher consultations</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-200">Detailed progress reports three times per year</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-200">University entrance exam preparation (Grade 10)</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Student assessment"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Academic Support */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Support Services</h2>
            <p className="text-xl text-gray-600">Comprehensive support to ensure every student succeeds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Support</h3>
              <p className="text-gray-600">
                Individualized support for students with different learning needs and styles.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Remedial Classes</h3>
              <p className="text-gray-600">
                Additional support classes for students who need extra help in specific subjects.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gifted Program</h3>
              <p className="text-gray-600">
                Enrichment activities and advanced learning opportunities for exceptional students.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">University Prep</h3>
              <p className="text-gray-600">
                Specialized preparation for university entrance exams and application processes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;