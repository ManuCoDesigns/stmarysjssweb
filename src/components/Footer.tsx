import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">St. Mary's School</span>
            </div>
            <p className="text-gray-300 mb-4">
              Committed to academic excellence and character development since 1990.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/academics" className="text-gray-300 hover:text-white transition-colors">Academics</Link></li>
              <li><Link to="/admissions" className="text-gray-300 hover:text-white transition-colors">Admissions</Link></li>
              <li><Link to="/news" className="text-gray-300 hover:text-white transition-colors">News</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/cbc" className="text-gray-300 hover:text-white transition-colors">CBE Curriculum</Link></li>
              <li><Link to="/downloads" className="text-gray-300 hover:text-white transition-colors">Downloads</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/alumni" className="text-gray-300 hover:text-white transition-colors">Alumni</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Student Portal</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">329-20400, Bomet, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">+254 721 771 568</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">stmaryssecbomet@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} St. Mary's School. All rights reserved. | Developed and managed by{' '}
            <a
              href="https://manuwebdesigns.vercel.app/" // Replace with your actual website link
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Manuwebdesign
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
