import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-400 to-blue-800 text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center">
      <div className="max-w-full sm:max-w-xl md:max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 sm:p-3 rounded-xl shadow-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bc"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="12"
                fill="none"
                stroke="white"
                strokeWidth="1"
              >
                BC
              </text>
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-white">Bandari</span>{' '}
            <span className="text-blue-200">Constructions</span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Coming <span className="text-blue-200">Soon</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
            We're building something amazing! Our website is under construction and will be launching shortly.
          </p>

          <div className="py-4 sm:py-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-white/20 hover:bg-white/20 transition text-sm sm:text-base md:text-lg"
            >
              <Home className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 animate-pulse" />
              <span className="font-medium">Back To Home</span>
            </Link>
          </div>
        </div>

        {/* Countdown (placeholder) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          {[['Days', '28'], ['Hours', '12'], ['Mins', '45'], ['Secs', '03']].map(([label, value]) => (
            <div
              key={label}
              className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-white/20"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">{value}</div>
              <div className="text-xs sm:text-sm opacity-80">{label}</div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-xs sm:text-sm text-white/60">
          © {new Date().getFullYear()} Bandari Constructions. All rights reserved.
        </div>
      </div>
    </div>
  );
}