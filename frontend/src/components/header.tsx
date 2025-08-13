import { useEffect, useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { Plus, Settings } from 'lucide-react';

export default function Header() {
    let navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Check token on load (using state instead of localStorage for demo)
  useEffect(() => {
    // Simulating token check - in real app this would be localStorage.getItem('token')
    setIsLoggedIn(true); // Set to true for demo purposes
  }, []);

  // ✅ Toggle login/logout
  const handleLoginToggle = () => {
    if (isLoggedIn) {
      // In real app: localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu when link is clicked
  };

  return (
    <nav className="relative bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Icon */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-xl shadow-lg flex items-center justify-center md:p-3">
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
              className="w-6 h-6 md:w-7 md:h-7"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="12"
                fill="white"
                className="md:text-sm font-semibold"
              >
                BC
              </text>
            </svg>
          </div>

          {/* Text */}
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-purple-600 tracking-tight md:text-xl whitespace-nowrap">
              Bandari <span className="text-gray-800">Constructions</span>
            </h1>
            <p className="text-gray-500 text-xs tracking-wide md:text-sm whitespace-nowrap">
              Real Estate Excellence
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 hover:border border-purple-500 rounded-md px-3 py-1.5 transition-all duration-200"
            >
              Properties
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 hover:border border-purple-500 rounded-md px-3 py-1.5 transition-all duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-purple-600 hover:border border-purple-500 rounded-md px-3 py-1.5 transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {isLoggedIn && (
              <>
                <Link
                  to="/adminpanel"
                  className="flex items-center px-3 py-1.5 border border-purple-500 text-purple-600 rounded-md hover:bg-gradient-to-br from-purple-600 to-blue-600 hover:text-white transition-all duration-200"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Panel
                </Link>
                <Link
                  to="/addproperty"
                  className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md shadow hover:scale-105 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </Link>
              </>
            )}
            <button
              onClick={handleLoginToggle}
              className={`px-4 py-1.5 rounded-md font-medium transition-all duration-200 ${isLoggedIn
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                }`}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none p-1"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
          }`}
      >
        <div className="bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-3">
            {/* Navigation Links */}
            <div className="space-y-2">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md px-3 py-2 transition-all duration-200"
              >
                Properties
              </Link>
              <Link
                to="/about"
                onClick={handleLinkClick}
                className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md px-3 py-2 transition-all duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md px-3 py-2 transition-all duration-200"
              >
                Contact
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              {isLoggedIn && (
                <>
                  <Link
                    to="/adminpanel"
                    onClick={handleLinkClick}
                    className="w-full flex items-center justify-center px-3 py-2 border border-purple-500 text-purple-600 rounded-md hover:bg-gradient-to-br from-purple-600 to-blue-600 hover:text-white transition-all duration-200"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Link>
                  <Link
                    to="/addproperty"
                    onClick={handleLinkClick}
                    className="w-full flex items-center justify-center px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md shadow hover:scale-105 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Property
                  </Link>
                </>
              )}
              <button
                onClick={handleLoginToggle}
                className={`w-full px-3 py-2 rounded-md font-medium transition-all duration-200 ${isLoggedIn
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}