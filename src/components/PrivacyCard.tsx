import React from 'react';
import { Shield, Lock, Users, FileText, Eye, AlertTriangle, CheckCircle, Heart, Scale, Globe } from 'lucide-react';

const PrivacyCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border border-slate-200/60 rounded-3xl p-8 mb-12 mx-4 mt-8 shadow-2xl backdrop-blur-sm">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>
      
      <div className="relative flex items-start space-x-8">
        {/* Icon Section */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Shield className="h-12 w-12 text-white drop-shadow-lg" />
              {/* Pulsing Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-700 opacity-20 animate-ping"></div>
            </div>
            {/* Floating Mini Icons */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full p-2 shadow-lg animate-bounce delay-300">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full p-2 shadow-lg animate-bounce delay-700">
              <Heart className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                🔒 Learner Privacy, Consent & Content Protection
              </h3>
            </div>
            <div className="flex space-x-2">
              <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm"></div>
              <div className="w-12 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-sm"></div>
              <div className="w-8 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Introduction */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Scale className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-slate-700 text-base leading-relaxed">
                    At <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg">St. Mary's Junior and Senior School – Bomet</span>, we are committed to protecting the privacy,
                    dignity, and safety of our students. In compliance with the <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">Children's Act of Kenya</span> and the
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg"> Data Protection Act, 2019</span>, all digital content involving learners is handled with utmost care.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Points Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Content Usage */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-2">Educational Purpose Only</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Photos, videos, academic work, and personal data displayed on this platform are used solely for
                      educational and institutional purposes. All content is securely stored, and unauthorized sharing,
                      copying, or reproduction is strictly prohibited.
                    </p>
                  </div>
                </div>
              </div>

              {/* Parental Consent */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-2">Verified Parental Consent</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      <span className="font-semibold text-purple-700">Consent has been obtained from parents or legal guardians</span> before publishing any student-related
                      media or content. We honor every child's right to privacy and ensure their identity is protected at all times.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer Section */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-amber-800 text-lg mb-2">Important Disclaimer</h4>
                  <p className="text-amber-700 text-sm leading-relaxed italic">
                    All media and student-related information are for educational reference only and
                    may not be used for commercial or unauthorized purposes. For any data access, correction, or removal requests,
                    please contact the school administration.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl p-6 border border-slate-300 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg">Contact Information</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div>
                  <p><span className="font-semibold">Email:</span> privacy@stmarysbomet.ac.ke</p>
                  <p><span className="font-semibold">Phone:</span> +254 700 123 456</p>
                </div>
                <div>
                  <p><span className="font-semibold">Address:</span> St. Mary's School, Bomet County</p>
                  <p><span className="font-semibold">Office Hours:</span> Mon-Fri, 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-4">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="w-3 h-3 bg-blue-200 rounded-full mr-3 animate-pulse"></div>
              <Heart className="h-4 w-4 mr-2" />
              Child-Centered Protection
            </div>

            <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm text-slate-700 text-sm font-semibold rounded-full border-2 border-emerald-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
              Parental Consent Verified
            </div>

            <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm text-slate-700 text-sm font-semibold rounded-full border-2 border-amber-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Eye className="h-4 w-4 mr-2 text-amber-500" />
              Educational Use Only
            </div>

            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Lock className="h-4 w-4 mr-2" />
              GDPR Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyCard;