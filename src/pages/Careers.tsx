import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Users, GraduationCap, Heart, Send } from 'lucide-react';

const Careers: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    education: '',
    coverLetter: ''
  });

  const jobOpenings = [
    {
      id: 1,
      title: "Mathematics Teacher",
      department: "Academic",
      type: "Full-time",
      location: "Nairobi",
      salary: "KES 80,000 - 120,000",
      posted: "2024-03-10",
      description: "We are seeking a passionate Mathematics teacher to join our team and inspire students in Grades 4-9.",
      requirements: [
        "Bachelor's degree in Mathematics or Education (Mathematics)",
        "Teaching certificate from a recognized institution",
        "Minimum 2 years teaching experience",
        "Strong knowledge of CBC curriculum",
        "Excellent communication and interpersonal skills"
      ],
      responsibilities: [
        "Plan and deliver engaging mathematics lessons",
        "Assess student progress and provide feedback",
        "Participate in curriculum development",
        "Collaborate with colleagues and parents",
        "Maintain accurate student records"
      ]
    },
    {
      id: 2,
      title: "Science Laboratory Technician",
      department: "Academic Support",
      type: "Full-time",
      location: "Nairobi",
      salary: "KES 50,000 - 70,000",
      posted: "2024-03-08",
      description: "Join our team as a Science Laboratory Technician to support hands-on learning in our modern science facilities.",
      requirements: [
        "Diploma in Science Laboratory Technology",
        "Experience in school laboratory management",
        "Knowledge of laboratory safety procedures",
        "Ability to maintain and calibrate equipment",
        "Strong organizational skills"
      ],
      responsibilities: [
        "Prepare laboratory equipment and materials",
        "Assist teachers during practical sessions",
        "Maintain laboratory safety standards",
        "Manage laboratory inventory",
        "Train students on equipment usage"
      ]
    },
    {
      id: 3,
      title: "School Counselor",
      department: "Student Services",
      type: "Full-time",
      location: "Nairobi",
      salary: "KES 70,000 - 100,000",
      posted: "2024-03-05",
      description: "We are looking for a qualified counselor to support student mental health and academic success.",
      requirements: [
        "Master's degree in Counseling Psychology or related field",
        "Licensed counselor with valid practicing certificate",
        "Experience working with children and adolescents",
        "Knowledge of educational psychology",
        "Strong empathy and communication skills"
      ],
      responsibilities: [
        "Provide individual and group counseling",
        "Develop student support programs",
        "Collaborate with teachers and parents",
        "Conduct psychological assessments",
        "Maintain confidential student records"
      ]
    },
    {
      id: 4,
      title: "ICT Coordinator",
      department: "Technology",
      type: "Full-time",
      location: "Nairobi",
      salary: "KES 90,000 - 130,000",
      posted: "2024-03-01",
      description: "Lead our technology initiatives and support digital learning across all grade levels.",
      requirements: [
        "Bachelor's degree in Computer Science or IT",
        "Minimum 3 years experience in educational technology",
        "Knowledge of learning management systems",
        "Network administration skills",
        "Training and presentation abilities"
      ],
      responsibilities: [
        "Manage school technology infrastructure",
        "Train teachers on educational technology",
        "Support digital learning initiatives",
        "Maintain computer labs and equipment",
        "Develop technology policies and procedures"
      ]
    },
    {
      id: 5,
      title: "Librarian",
      department: "Academic Support",
      type: "Full-time",
      location: "Nairobi",
      salary: "KES 60,000 - 85,000",
      posted: "2024-02-25",
      description: "Manage our school library and promote reading culture among students and staff.",
      requirements: [
        "Bachelor's degree in Library Science or related field",
        "Experience in library management",
        "Knowledge of digital cataloging systems",
        "Passion for reading and literature",
        "Strong organizational skills"
      ],
      responsibilities: [
        "Manage library collections and resources",
        "Assist students and teachers with research",
        "Organize reading programs and events",
        "Maintain library database and records",
        "Promote information literacy skills"
      ]
    },
    {
      id: 6,
      title: "Sports Coach",
      department: "Extracurricular",
      type: "Part-time",
      location: "Nairobi",
      salary: "KES 30,000 - 50,000",
      posted: "2024-02-20",
      description: "Coach various sports teams and promote physical fitness among our students.",
      requirements: [
        "Diploma in Sports Science or Physical Education",
        "Coaching certification in relevant sports",
        "Experience coaching youth sports",
        "First aid certification preferred",
        "Enthusiasm for sports and fitness"
      ],
      responsibilities: [
        "Train school sports teams",
        "Organize sports events and competitions",
        "Develop fitness programs for students",
        "Ensure sports equipment maintenance",
        "Promote sportsmanship and teamwork"
      ]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Market-competitive compensation packages with annual reviews"
    },
    {
      icon: Heart,
      title: "Health Insurance",
      description: "Comprehensive medical coverage for employees and dependents"
    },
    {
      icon: GraduationCap,
      title: "Professional Development",
      description: "Continuous training opportunities and career advancement support"
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description: "Flexible schedules and generous leave policies"
    },
    {
      icon: Users,
      title: "Collaborative Environment",
      description: "Supportive team culture focused on student success"
    },
    {
      icon: Briefcase,
      title: "Career Growth",
      description: "Clear pathways for professional advancement within the school"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    });
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', applicationData);
    alert('Application submitted successfully! We will review your application and contact you soon.');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Be part of an exceptional educational community dedicated to shaping young minds 
              and making a positive impact on the future of education.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Work at St. Mary's?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a school community that values excellence, innovation, and the professional growth of our staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-slate-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Job Openings</h2>
            <p className="text-xl text-gray-600">Explore exciting career opportunities at our school</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-slate-600 font-medium">{job.department}</p>
                  </div>
                  <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm">
                    {job.type}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    Posted {new Date(job.posted).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{job.description}</p>

                <button
                  onClick={() => setSelectedJob(job.id)}
                  className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 transition-colors duration-200"
                >
                  View Details & Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-screen overflow-y-auto">
            {(() => {
              const job = jobOpenings.find(j => j.id === selectedJob);
              if (!job) return null;
              
              return (
                <div>
                  <div className="p-8 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
                        <p className="text-slate-600 font-medium mb-4">{job.department}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedJob(null)}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
                        <p className="text-gray-700 mb-6">{job.description}</p>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                        <ul className="space-y-2 mb-6">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-slate-500 rounded-full mr-3 mt-2"></div>
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h3>
                        <ul className="space-y-2">
                          {job.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-slate-500 rounded-full mr-3 mt-2"></div>
                              <span className="text-gray-700">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Apply for this Position</h3>
                        <form onSubmit={handleApplicationSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              value={applicationData.name}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={applicationData.email}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={applicationData.phone}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Years of Experience
                            </label>
                            <select
                              name="experience"
                              value={applicationData.experience}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                              <option value="">Select Experience</option>
                              <option value="0-1">0-1 years</option>
                              <option value="2-5">2-5 years</option>
                              <option value="6-10">6-10 years</option>
                              <option value="10+">10+ years</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Highest Education Level
                            </label>
                            <select
                              name="education"
                              value={applicationData.education}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                              <option value="">Select Education</option>
                              <option value="diploma">Diploma</option>
                              <option value="bachelor">Bachelor's Degree</option>
                              <option value="master">Master's Degree</option>
                              <option value="phd">PhD</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cover Letter *
                            </label>
                            <textarea
                              name="coverLetter"
                              required
                              rows={4}
                              value={applicationData.coverLetter}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                              placeholder="Tell us why you're interested in this position..."
                            ></textarea>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-slate-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center"
                          >
                            <Send className="h-5 w-5 mr-2" />
                            Submit Application
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Application Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Process</h2>
            <p className="text-xl text-gray-600">Simple steps to join our team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Apply Online", description: "Submit your application through our online portal" },
              { step: "2", title: "Initial Review", description: "Our HR team reviews your application and qualifications" },
              { step: "3", title: "Interview", description: "Selected candidates are invited for an interview" },
              { step: "4", title: "Welcome Aboard", description: "Successful candidates join our team and begin orientation" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-slate-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact HR */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Careers?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Our HR team is here to help you with any questions about career opportunities at St. Mary's School.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hr@stmarysschool.ac.ke"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Email HR Department
            </a>
            <a
              href="tel:+254712345678"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-colors duration-200"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;