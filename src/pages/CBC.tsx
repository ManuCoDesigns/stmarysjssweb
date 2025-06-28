import React from 'react';
import { Target, Users, Lightbulb, Globe, CheckCircle, BookOpen } from 'lucide-react';

const CBC: React.FC = () => {
  const cbcPrinciples = [
    {
      icon: Target,
      title: "Competency-Based",
      description: "Focus on what learners can do with knowledge and skills rather than just what they know"
    },
    {
      icon: Users,
      title: "Learner-Centered",
      description: "Education tailored to individual learning styles, interests, and abilities"
    },
    {
      icon: Lightbulb,
      title: "Skills Development",
      description: "Emphasis on critical thinking, creativity, communication, and collaboration"
    },
    {
      icon: Globe,
      title: "Global Relevance",
      description: "Preparing learners for the demands of the 21st century global economy"
    }
  ];

  const learningAreas = [
    {
      name: "Languages",
      subjects: ["English", "Kiswahili", "Kenya Sign Language (Optional)", "Foreign Languages (Grade 10)"],
      description: "Developing communication skills and cultural understanding"
    },
    {
      name: "Mathematics",
      subjects: ["Mathematics", "Advanced Mathematics (Grade 10)"],
      description: "Building logical thinking and problem-solving abilities"
    },
    {
      name: "Science & Technology",
      subjects: ["Integrated Science", "Health Education", "Specialized Sciences (Grade 10)"],
      description: "Understanding the natural world and technological applications"
    },
    {
      name: "Social Studies",
      subjects: ["Social Studies", "Advanced Social Sciences (Grade 10)"],
      description: "Exploring society, history, geography, and citizenship"
    },
    {
      name: "Religious Education",
      subjects: ["Christian Religious Education", "Islamic Religious Education", "Hindu Religious Education"],
      description: "Moral and spiritual development"
    },
    {
      name: "Creative Arts",
      subjects: ["Visual Arts", "Performing Arts", "Digital Arts (Grade 10)"],
      description: "Fostering creativity and artistic expression"
    },
    {
      name: "Physical & Health Education",
      subjects: ["Physical Education", "Sports", "Health Sciences (Grade 10)"],
      description: "Promoting physical fitness and healthy living"
    }
  ];

  const coreCompetencies = [
    {
      name: "Communication and Collaboration",
      description: "Ability to convey information effectively and work well with others"
    },
    {
      name: "Critical Thinking and Problem Solving",
      description: "Analyzing situations and developing innovative solutions"
    },
    {
      name: "Creativity and Imagination",
      description: "Generating new ideas and expressing them in various forms"
    },
    {
      name: "Citizenship",
      description: "Understanding rights, responsibilities, and contributing to society"
    },
    {
      name: "Digital Literacy",
      description: "Effective use of technology for learning and communication"
    },
    {
      name: "Learning to Learn",
      description: "Developing strategies for continuous self-improvement"
    },
    {
      name: "Self-Efficacy",
      description: "Confidence in one's ability to achieve goals and overcome challenges"
    }
  ];

  const assessmentMethods = [
    "Formative Assessment - Ongoing evaluation during learning",
    "Summative Assessment - Evaluation at the end of learning periods",
    "Portfolio Assessment - Collection of student work over time",
    "Project-Based Assessment - Evaluation through practical projects",
    "Peer Assessment - Students evaluating each other's work",
    "Self-Assessment - Students reflecting on their own learning",
    "University Entrance Preparation - Grade 10 specialized assessments"
  ];

  const pathways = [
    {
      title: "Arts and Sports Science",
      description: "For students interested in creative arts, sports, and related sciences",
      careers: ["Professional Sports", "Arts and Design", "Entertainment Industry", "Sports Science"],
      grade10Focus: "Advanced arts, sports science, and creative technologies"
    },
    {
      title: "Social Sciences",
      description: "For students interested in humanities and social studies",
      careers: ["Law", "Journalism", "Social Work", "Public Administration", "International Relations"],
      grade10Focus: "Advanced social sciences, research methods, and critical analysis"
    },
    {
      title: "Science, Technology, Engineering and Mathematics (STEM)",
      description: "For students interested in technical and scientific fields",
      careers: ["Engineering", "Medicine", "Information Technology", "Research", "Architecture"],
      grade10Focus: "Advanced mathematics, sciences, and technology applications"
    }
  ];

  const grade10Features = [
    {
      title: "University Preparation",
      description: "Specialized courses designed to prepare students for university entrance examinations and higher education requirements."
    },
    {
      title: "Career Pathway Specialization",
      description: "Students choose from STEM, Arts & Humanities, or Business & Economics pathways based on their interests and career goals."
    },
    {
      title: "Research Projects",
      description: "Independent research projects that develop critical thinking, analysis, and presentation skills essential for university success."
    },
    {
      title: "Industry Partnerships",
      description: "Collaborations with universities and industries to provide real-world experience and mentorship opportunities."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-800 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Competency-Based Curriculum</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Understanding Kenya's transformative education system that focuses on developing competencies 
              and skills for the 21st century learner, from Pre-Primary through Grade 10.
            </p>
          </div>
        </div>
      </section>

      {/* CBC Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What is CBC?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              The Competency-Based Curriculum (CBC) is Kenya's new education system that emphasizes the development 
              of competencies, skills, and values rather than just knowledge acquisition. It prepares learners 
              to be productive and competitive in the global economy, with Grade 10 serving as the bridge to higher education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cbcPrinciples.map((principle, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{principle.title}</h3>
                <p className="text-gray-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade 10 Special Section */}
      <section className="py-20 bg-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Grade 10 - Senior Secondary Excellence</h2>
            <p className="text-xl text-gray-600">The culmination of CBC education, preparing students for university and career success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {grade10Features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-cyan-700 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Learning Areas</h2>
            <p className="text-xl text-gray-600">Comprehensive curriculum covering all essential areas of learning through Grade 10</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningAreas.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-cyan-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{area.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <div className="space-y-2">
                  {area.subjects.map((subject, subjectIndex) => (
                    <div key={subjectIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 text-sm">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Competencies</h2>
            <p className="text-xl text-gray-600">Essential skills and abilities developed through CBC</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreCompetencies.map((competency, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-cyan-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{competency.name}</h3>
                <p className="text-gray-600">{competency.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Methods */}
      <section className="py-20 bg-cyan-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Assessment in CBC</h2>
              <p className="text-gray-200 mb-8">
                CBC uses diverse assessment methods to evaluate learner progress holistically, 
                focusing on competency development rather than just test scores. Grade 10 includes 
                specialized university preparation assessments.
              </p>
              
              <div className="space-y-4">
                {assessmentMethods.map((method, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-200">{method}</span>
                  </div>
                ))}
              </div>
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

      {/* Career Pathways */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Pathways</h2>
            <p className="text-xl text-gray-600">CBC prepares students for diverse career opportunities through specialized pathways, culminating in Grade 10</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pathways.map((pathway, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-cyan-700 mb-4">{pathway.title}</h3>
                <p className="text-gray-600 mb-6">{pathway.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Career Opportunities:</h4>
                  <ul className="space-y-2">
                    {pathway.careers.map((career, careerIndex) => (
                      <li key={careerIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-cyan-800 mb-2">Grade 10 Focus:</h4>
                  <p className="text-cyan-700 text-sm">{pathway.grade10Focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation at St. Mary's */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">CBC Implementation at St. Mary's</h2>
            <p className="text-xl text-gray-600">How we bring the CBC vision to life in our school through Grade 10</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trained Teachers</h3>
              <p className="text-gray-600">Our faculty has undergone comprehensive CBC training, including Grade 10 specialization, to effectively implement the new curriculum.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Modern Facilities</h3>
              <p className="text-gray-600">State-of-the-art classrooms and laboratories designed to support competency-based learning through all grade levels.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrated Learning</h3>
              <p className="text-gray-600">Cross-curricular projects that connect different learning areas for holistic understanding, culminating in Grade 10 research projects.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Continuous Assessment</h3>
              <p className="text-gray-600">Regular evaluation methods that track competency development, including university entrance preparation assessments.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Parent Partnership</h3>
              <p className="text-gray-600">Active involvement of parents in understanding and supporting their child's CBC journey through Grade 10.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">University Partnerships</h3>
              <p className="text-gray-600">Collaborations with universities to ensure Grade 10 graduates are well-prepared for higher education success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cyan-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for the Future?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Give your child the advantage of a complete CBC education at St. Mary's School, from Pre-Primary through Grade 10. 
            Our experienced team is ready to guide them on their learning journey to university and beyond.
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
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-cyan-900 transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CBC;