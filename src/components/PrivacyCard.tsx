import type React from "react"
import {
  Shield,
  Lock,
  Users,
  FileText,
  Eye,
  AlertTriangle,
  CheckCircle,
  Heart,
  Scale,
  Globe,
  Sparkles,
} from "lucide-react"

const PrivacyCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 border-2 border-blue-100/60 rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 lg:mb-12 mx-2 sm:mx-4 mt-6 sm:mt-8 shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating sparkles */}
        <div className="absolute top-8 right-12 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-indigo-500 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-pulse delay-500"></div>
        <div className="absolute bottom-8 left-8 w-1 h-1 bg-emerald-500 rounded-full opacity-60 animate-pulse delay-700"></div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
      </div>

      <div className="relative flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6 xl:space-x-8">
        {/* Enhanced Icon Section */}
        <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start">
          <div className="relative group">
            <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-3xl p-4 sm:p-5 lg:p-6 shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white drop-shadow-lg" />
              {/* Enhanced pulsing ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-600 opacity-30 animate-ping"></div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-300 to-purple-500 opacity-20 animate-ping delay-1000"></div>
            </div>

            {/* Enhanced floating mini icons */}
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full p-1.5 sm:p-2 shadow-xl animate-bounce delay-300 group-hover:animate-spin">
              <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full p-1.5 sm:p-2 shadow-xl animate-bounce delay-700 group-hover:animate-pulse">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <div className="absolute top-1/2 -right-3 sm:-right-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-1 sm:p-1.5 shadow-lg animate-pulse delay-500">
              <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
            </div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="flex-1 space-y-6 sm:space-y-7 lg:space-y-8 w-full">
          {/* Enhanced Header */}
          <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-3">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent leading-tight drop-shadow-sm">
                🔒 Learner Privacy, Consent & Content Protection
              </h3>
            </div>
            <div className="flex justify-center lg:justify-start space-x-2">
              <div className="w-16 sm:w-20 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-md animate-pulse"></div>
              <div className="w-10 sm:w-12 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md animate-pulse delay-300"></div>
              <div className="w-6 sm:w-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-md animate-pulse delay-600"></div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Enhanced Introduction */}
            <div className="bg-gradient-to-r from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-blue-100/80 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex-shrink-0 mx-auto sm:mx-0 sm:mt-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    At{" "}
                    <span className="font-bold text-indigo-700 bg-gradient-to-r from-indigo-100 to-blue-100 px-3 py-1 rounded-lg shadow-sm">
                      St. Mary's Junior and Senior School – Bomet
                    </span>
                    , we are committed to protecting the privacy, dignity, and safety of our students. In compliance
                    with the{" "}
                    <span className="font-semibold text-emerald-700 bg-gradient-to-r from-emerald-100 to-teal-100 px-2 py-1 rounded-lg shadow-sm">
                      Children's Act of Kenya
                    </span>{" "}
                    and the
                    <span className="font-semibold text-blue-700 bg-gradient-to-r from-blue-100 to-cyan-100 px-2 py-1 rounded-lg shadow-sm">
                      {" "}
                      Data Protection Act, 2019
                    </span>
                    , all digital content involving learners is handled with utmost care.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Key Points Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {/* Enhanced Content Usage */}
              <div className="bg-gradient-to-br from-white to-emerald-50/30 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-emerald-100/60 shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold text-slate-800 text-base sm:text-lg mb-2 flex items-center justify-center sm:justify-start">
                      Educational Purpose Only
                      <Sparkles className="h-4 w-4 ml-2 text-emerald-500 animate-pulse" />
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Photos, videos, academic work, and personal data displayed on this platform are used solely for
                      educational and institutional purposes. All content is securely stored, and unauthorized sharing,
                      copying, or reproduction is strictly prohibited.
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Parental Consent */}
              <div className="bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-purple-100/60 shadow-lg hover:shadow-xl hover:border-purple-200 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold text-slate-800 text-base sm:text-lg mb-2 flex items-center justify-center sm:justify-start">
                      Verified Parental Consent
                      <Heart className="h-4 w-4 ml-2 text-pink-500 animate-pulse" />
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-md">
                        Consent has been obtained from parents or legal guardians
                      </span>{" "}
                      before publishing any student-related media or content. We honor every child's right to privacy
                      and ensure their identity is protected at all times.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Disclaimer Section */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-20">
                <AlertTriangle className="h-8 w-8 text-amber-400" />
              </div>
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 relative">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-amber-800 text-base sm:text-lg mb-2">⚠️ Important Disclaimer</h4>
                  <p className="text-amber-700 text-xs sm:text-sm leading-relaxed italic">
                    All media and student-related information are for educational reference only and may not be used for
                    commercial or unauthorized purposes. For any data access, correction, or removal requests, please
                    contact the school administration.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Information */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 text-base sm:text-lg text-center sm:text-left flex items-center">
                  📞 Contact Information
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600">
                <div className="text-center sm:text-left space-y-1">
                  <p className="flex items-center justify-center sm:justify-start">
                    <span className="font-semibold">📧 Email:</span>
                    <span className="ml-1 text-blue-600">manuwebdesigns@gmail.com</span>
                  </p>
                  <p className="flex items-center justify-center sm:justify-start">
                    <span className="font-semibold">📱 Phone:</span>
                    <span className="ml-1 text-green-600">+254 714 749 123</span>
                  </p>
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <p className="flex items-center justify-center sm:justify-start">
                    <span className="font-semibold">📍 Location:</span>
                    <span className="ml-1">St. Mary's School, Bomet County</span>
                  </p>
                  <p className="flex items-center justify-center sm:justify-start">
                    <span className="font-semibold">🕒 Hours:</span>
                    <span className="ml-1">Mon-Fri, 8:00 AM - 5:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Status Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4">
            <div className="inline-flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 hover:-rotate-1 transition-all duration-300">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-200 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Child-Centered Protection</span>
              <span className="sm:hidden">Child Protection</span>
            </div>
            <div className="inline-flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-white text-slate-700 text-xs sm:text-sm font-semibold rounded-full border-2 border-emerald-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:rotate-1 transition-all duration-300">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-emerald-500" />
              <span className="hidden sm:inline">Parental Consent Verified</span>
              <span className="sm:hidden">Consent Verified</span>
            </div>
            <div className="inline-flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-white text-slate-700 text-xs sm:text-sm font-semibold rounded-full border-2 border-amber-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-rotate-1 transition-all duration-300">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-amber-500" />
              <span className="hidden sm:inline">Educational Use Only</span>
              <span className="sm:hidden">Educational Use</span>
            </div>
            <div className="inline-flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 hover:rotate-1 transition-all duration-300">
              <Lock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 mr-1 animate-pulse" />
              GDPR Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyCard