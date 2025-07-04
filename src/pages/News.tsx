import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const News: React.FC = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Outstanding KCSE Results 2024",
      excerpt: "Our Form 4 Students(2024) students have achieved exceptional results in the Kenya Certificate of Secondary Education examinations, with 65% University Transition.",
      content: "We are proud to announce that our Form 4 candidates have excelled in the 2024 KCSE examinations. Out of 87 candidates, 45 students scored above C+, demonstrating the quality of education and dedication of our teaching staff.",
      date: "2024-03-15",
      author: "Academic Department",
      image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Academic"
    },
    {
      id: 2,
      title: "Science Fair Competition Winners",
      excerpt: "St. Mary's students dominated the county science fair, winning first place in three different categories including environmental science and technology innovation.",
      content: "Our students showcased their scientific prowess at the annual County Science Fair, bringing home multiple awards. The projects demonstrated creativity, innovation, and deep understanding of scientific principles.",
      date: "2024-03-10",
      author: "Science Department",
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Achievement"
    },
    {
      id: 3,
      title: "New Computer Lab Opening",
      excerpt: "State-of-the-art computer laboratory officially opened, featuring 40 modern computers and high-speed internet to enhance digital literacy education.",
      content: "The school has invested in modern technology infrastructure with the opening of our new computer laboratory. This facility will serve all students from Grade 4 to Grade 9, ensuring they develop essential digital skills.",
      date: "2024-03-05",
      author: "Principal",
      image: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Infrastructure"
    },
    {
      id: 4,
      title: "Inter-School Sports Championships",
      excerpt: "Our athletics team brought home 12 medals from the regional inter-school sports championships, including 5 gold medals in various track and field events.",
      content: "St. Mary's School athletes demonstrated exceptional performance at the regional championships. The team's dedication to training and sportsmanship has paid off with outstanding results across multiple disciplines.",
      date: "2024-02-28",
      author: "Sports Department",
      image: "https://images.pexels.com/photos/2105028/pexels-photo-2105028.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Sports"
    },
    {
      id: 5,
      title: "Parent-Teacher Conference Success",
      excerpt: "Record attendance at this term's parent-teacher conference with over 90% parent participation, strengthening the school-home partnership.",
      content: "The quarterly parent-teacher conference was a resounding success, with parents actively engaging in discussions about their children's progress. This collaboration is essential for student success.",
      date: "2024-02-20",
      author: "Administration",
      image: "https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Community"
    },
    {
      id: 6,
      title: "Environmental Conservation Project",
      excerpt: "Students launch tree planting initiative aimed at planting 500 trees around the school compound as part of environmental conservation efforts.",
      content: "Our students have taken the lead in environmental conservation by initiating a comprehensive tree planting project. This initiative aligns with global sustainability goals and teaches students the importance of environmental stewardship.",
      date: "2024-02-15",
      author: "Environmental Club",
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Environment"
    }
  ];

  const categories = ['All', 'Academic', 'Achievement', 'Infrastructure', 'Sports', 'Community', 'Environment'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedArticle, setSelectedArticle] = React.useState<number | null>(null);

  const filteredArticles = selectedCategory === 'All' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">School News</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Stay updated with the latest happenings, achievements, and events at St. Mary's School.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-indigo-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </div>
                    <button
                      onClick={() => setSelectedArticle(article.id)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-screen overflow-y-auto">
            {(() => {
              const article = newsArticles.find(a => a.id === selectedArticle);
              if (!article) return null;
              
              return (
                <div>
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="absolute top-4 right-4 bg-white text-gray-700 rounded-full p-2 hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h2>
                    <div className="flex items-center text-gray-500 text-sm mb-6">
                      <User className="h-4 w-4 mr-1" />
                      By {article.author}
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{article.content}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <section className="py-20 bg-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-200 mb-8">
            Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg text-gray-900 flex-1"
            />
            <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;