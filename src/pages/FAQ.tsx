import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      category: "Admissions",
      question: "What is the admission process for new students?",
      answer: "The admission process involves: 1) Submitting a completed application form with required documents, 2) Scheduling a campus visit and interview, 3) Assessment for certain grade levels, and 4) Receiving admission decision. We accept applications throughout the year, with three intake periods in January, May, and September."
    },
    {
      id: 2,
      category: "Admissions",
      question: "What documents are required for admission?",
      answer: "Required documents include: birth certificate (original and copy), previous school report cards, transfer certificate (if applicable), medical certificate, passport-size photographs (4 copies), and parent/guardian ID copies. Additional documents may be required based on specific circumstances."
    },
    {
      id: 3,
      category: "Academic",
      question: "What curriculum does St. Mary's School follow?",
      answer: "We follow Kenya's Competency-Based Curriculum (CBC) from Pre-Primary to Grade 9. Our curriculum focuses on developing competencies and skills rather than just content coverage, preparing students for the demands of the 21st century through integrated learning approaches."
    },
    {
      id: 4,
      category: "Academic",
      question: "How is student progress assessed?",
      answer: "We use Continuous Assessment and Evaluation (CAE) methods including formative and summative assessments, project-based evaluations, and portfolio documentation. Progress reports are issued three times per year, and we conduct regular parent-teacher conferences to discuss student development."
    },
    {
      id: 5,
      category: "Fees",
      question: "What are the school fees and payment terms?",
      answer: "Fees vary by grade level, ranging from KES 135,000 to 195,000 per year. Payment can be made termly (three times per year) or annually. We offer flexible payment plans upon request, and fees cover tuition, meals, and most school activities. Registration fee is KES 10,000 (one-time payment)."
    },
    {
      id: 6,
      category: "Fees",
      question: "Are there any additional costs apart from school fees?",
      answer: "Additional costs may include school uniforms, textbooks, stationery, transport services (if used), and optional extracurricular activities. We provide a detailed breakdown of all potential costs during the admission process to ensure transparency."
    },
    {
      id: 7,
      category: "Facilities",
      question: "What facilities are available at the school?",
      answer: "Our facilities include modern classrooms, well-equipped science laboratories, computer laboratory with high-speed internet, library, sports fields, art and music rooms, dining hall, and medical room. We continuously invest in upgrading our infrastructure to support quality education."
    },
    {
      id: 8,
      category: "Transport",
      question: "Does the school provide transport services?",
      answer: "Yes, we offer safe and reliable transport services covering various routes within Nairobi and surrounding areas. Our buses are maintained to high safety standards with qualified drivers and conductors. Transport fees are charged separately based on the distance from school."
    },
    {
      id: 9,
      category: "Academic",
      question: "What support is available for students with learning difficulties?",
      answer: "We provide comprehensive learning support through our trained special needs teachers, individualized learning plans, remedial classes, and close collaboration with parents. Our inclusive education approach ensures every child receives appropriate support to reach their potential."
    },
    {
      id: 10,
      category: "Extracurricular",
      question: "What extracurricular activities are offered?",
      answer: "We offer diverse activities including sports (football, basketball, athletics, swimming), clubs (debate, science, environmental, drama), music and arts programs, and leadership opportunities. These activities help develop well-rounded students and discover hidden talents."
    },
    {
      id: 11,
      category: "Safety",
      question: "What safety measures are in place at the school?",
      answer: "Safety is our priority with 24/7 security guards, CCTV monitoring, controlled access points, emergency response procedures, qualified first aid personnel, and regular safety drills. We maintain a secure environment where students can learn and grow safely."
    },
    {
      id: 12,
      category: "Communication",
      question: "How does the school communicate with parents?",
      answer: "We maintain regular communication through progress reports, parent-teacher conferences, SMS updates, email newsletters, school website updates, and our parent portal system. We encourage active parent involvement in their child's education journey."
    }
  ];

  const categories = ['All', ...new Set(faqData.map(faq => faq.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-800 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Find answers to common questions about admissions, academics, facilities, and school life at St. Mary's School.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md border border-gray-200">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <div>
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {openFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No questions found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-orange-600 hover:text-orange-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-orange-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Can't find what you're looking for? Our admissions team is here to help you with any specific questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Contact Us
            </a>
            <a
              href="tel:+254712345678"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-900 transition-colors duration-200"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;