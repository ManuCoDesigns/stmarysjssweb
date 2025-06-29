import React, { useState } from 'react';
import { Calendar, FileText, DollarSign, Clock, CheckCircle, Users } from 'lucide-react';

const Admissions: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    dateOfBirth: '',
    grade: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    previousSchool: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Application submitted successfully! We will contact you soon.');
  };

  const admissionSteps = [
    {
      icon: FileText,
      title: "Submit Application",
      description: "Complete and submit the online application form with required documents"
    },
    {
      icon: Calendar,
      title: "School Visit",
      description: "Schedule a visit to tour our facilities and meet with our admissions team"
    },
    {
      icon: Users,
      title: "Assessment",
      description: "Student assessment and parent interview (for certain grade levels)"
    },
    {
      icon: CheckCircle,
      title: "Admission Decision",
      description: "Receive admission decision and enrollment information"
    }
  ];

  const feeStructure = [
    { grade: "Junior Secondary (Grade 7-9)", term1Fee: "20,000", term2Fee: "20,000", term3Fee: "20,000", yearFee: "60,000" },
    { grade: "Senior Secondary (Grade 10)", term1Fee: "25,000", term2Fee: "25,000", term3Fee: "25,000", yearFee: "75,000" }
  ];

  const requirements = [
    "Completed application form",
    "Birth certificate (original and copy)",
    "Previous school report cards",
    "Transfer certificate (if applicable)",
    "Medical certificate",
    "Passport-size photographs (4 copies)",
    "Parent/Guardian ID copies",
    "Academic transcripts (for Grade 10 applicants)"
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Admissions</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Join our vibrant school community and give your child the foundation for a bright future. 
              We welcome applications for all grades from Pre-Primary through Grade 10.
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Admission Process</h2>
            <p className="text-xl text-gray-600">Simple steps to join our school community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Online Application Form</h2>
            <p className="text-xl text-gray-600">Start your child's journey with us</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Applying For *
                </label>
                <select
                  id="grade"
                  name="grade"
                  required
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Grade</option>
                  <option value="Grade7">Grade 7</option>
                  <option value="Grade8">Grade 8</option>
                  <option value="Grade9">Grade 9</option>
                  <option value="Grade10">Grade 10</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700 mb-2">
                    Previous School (if applicable)
                  </label>
                  <input
                    type="text"
                    id="previousSchool"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Home Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-purple-700 transition-colors duration-200"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fee Structure</h2>
            <p className="text-xl text-gray-600">Transparent and affordable education fees</p>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Grade Level</th>
                    <th className="px-6 py-4 text-left">Term 1 Fee (KES)</th>
                    <th className="px-6 py-4 text-left">Term 2 Fee (KES)</th>
                    <th className="px-6 py-4 text-left">Term 3 Fee (KES)</th>
                    <th className="px-6 py-4 text-left">Annual Fee (KES)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {feeStructure.map((fee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{fee.grade}</td>
                      <td className="px-6 py-4 text-gray-700">{fee.term1Fee}</td>
                      <td className="px-6 py-4 text-gray-700">{fee.term2Fee}</td>
                      <td className="px-6 py-4 text-gray-700">{fee.term3Fee}</td>
                      <td className="px-6 py-4 text-gray-700">{fee.yearFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Fee Information:</h3>
            <ul className="text-gray-700 space-y-1">
              <li>• Fees are payable at the beginning of each term</li>
              <li>• Registration fee: KES 10,000 (one-time payment)</li>
              <li>• Uniform and books are additional costs</li>
              <li>• Payment plans available upon request</li>
              <li>• Grade 10 fees include university preparation programs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents</h2>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Important Dates</h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <Calendar className="h-6 w-6 text-purple-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Application Deadline</p>
                    <p className="text-gray-600">Rolling admissions - Apply anytime</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <Clock className="h-6 w-6 text-purple-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Term Starts</p>
                    <p className="text-gray-600">January, May, and September</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <DollarSign className="h-6 w-6 text-purple-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">Grade 10 Entrance Exam</p>
                    <p className="text-gray-600">December and March sessions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade 10 Special Information */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Grade 10 - Senior Secondary</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Our Grade 10 program offers specialized pathways to prepare students for university entrance and career success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">STEM Pathway</h3>
              <p className="text-gray-200 mb-4">Advanced mathematics, sciences, and technology preparation for engineering and medical programs.</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Advanced Mathematics</li>
                <li>• Physics & Chemistry</li>
                <li>• Computer Science</li>
                <li>• Research Projects</li>
              </ul>
            </div>
            <div className="bg-purple-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Arts & Humanities</h3>
              <p className="text-gray-200 mb-4">Literature, languages, and social sciences for law, journalism, and teaching careers.</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Advanced Literature</li>
                <li>• History & Geography</li>
                <li>• Foreign Languages</li>
                <li>• Critical Writing</li>
              </ul>
            </div>
            <div className="bg-purple-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Business & Economics</h3>
              <p className="text-gray-200 mb-4">Commerce, economics, and entrepreneurship for business and finance careers.</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Business Studies</li>
                <li>• Economics & Accounting</li>
                <li>• Entrepreneurship</li>
                <li>• Market Research</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;