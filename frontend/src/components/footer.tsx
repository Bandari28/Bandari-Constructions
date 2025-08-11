export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">

          {/* Company Info */}
          <div className="space-y-4 text-center sm:text-left col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg shadow-lg flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24" width="24" height="24" fill="none"
                  stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <text
                    x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                    fontFamily="Arial, sans-serif" fontSize="12" fill="none" stroke="white" strokeWidth="1">
                    BC
                  </text>
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-base sm:text-lg">
                  Bandari <span className="text-purple-400">Constructions</span>
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">Real Estate Excellence</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Building dreams into reality with premium construction services and exceptional real estate solutions across Hyderabad.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="font-semibold text-base sm:text-lg text-purple-400 border-b border-purple-600 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm sm:text-base block py-1">
                  Properties
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm sm:text-base block py-1">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm sm:text-base block py-1">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="font-semibold text-base sm:text-lg text-purple-400 border-b border-purple-600 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-gray-300">
              <li className="hover:text-purple-400 transition-colors cursor-pointer text-sm sm:text-base py-1">
                Residential Independent Constructions
              </li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer text-sm sm:text-base py-1">
                Property Development
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="font-semibold text-base sm:text-lg text-purple-400 border-b border-purple-600 pb-2">
              Follow Us
            </h4>
            <div className="flex space-x-3 justify-center sm:justify-start">
              <a 
                href="/comingsoon" 
                className="bg-purple-600 hover:bg-purple-700 p-2 sm:p-3 rounded-lg transition-colors transform hover:scale-105 duration-200"
                aria-label="Follow us on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a 
                href="/comingsoon" 
                className="bg-purple-600 hover:bg-purple-700 p-2 sm:p-3 rounded-lg transition-colors transform hover:scale-105 duration-200"
                aria-label="Follow us on Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a 
                href="/comingsoon" 
                className="bg-purple-600 hover:bg-purple-700 p-2 sm:p-3 rounded-lg transition-colors transform hover:scale-105 duration-200"
                aria-label="Follow us on Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left order-2 sm:order-1">
              © 2025 Bandari Constructions. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm order-1 sm:order-2">
              <a href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors text-center">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors text-center">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}