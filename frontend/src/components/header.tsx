import { useEffect, useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check token on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Toggle login/logout
  const handleLoginToggle = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      navigate('/login');
    }
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-6">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
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
            className="lucide lucide-bc md:w-7 md:h-7"
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
              className="md:text-[14px]"
            >
              BC
            </text>
          </svg>
        </div>

        {/* Text */}
        <div>
          <h1 className="text-lg font-semibold text-purple-600 tracking-tight md:text-xl">
            Bandari <span className="text-gray-800">Constructions</span>
          </h1>
          <p className="text-gray-500 text-xs tracking-wide md:text-sm">
            Real Estate Excellence
          </p>
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
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

      {/* Middle Links and Right Buttons (Desktop and Mobile) */}
      <div
        className={`flex-col md:flex-row md:flex md:items-center md:space-x-6 ${isMobileMenuOpen ? 'flex' : 'hidden'
          } absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-10`}
      >
        {/* Middle Links */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-600 hover:border border-purple-500 rounded-md px-3 py-1.5 text-center"
          >
            Properties
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-purple-600 hover:border border-purple-500 rounded-md px-3 py-1.5 text-center"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-purple-600 hover:border border-purple-500 rounded-md px-3 py-1.5 text-center"
          >
            Contact
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
          {isLoggedIn && (
            <>
              <Link to="/adminpanel">
                <button className="flex items-center px-3 py-1.5 border border-purple-500 text-purple-600 rounded-md hover:bg-gradient-to-br from-purple-600 to-blue-600 hover:text-white w-full md:w-auto justify-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Panel
                </button>
              </Link>
              <Link to="/addproperty">
                <button className="flex items-center px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md shadow hover:scale-105 transition w-full md:w-auto justify-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </button>
              </Link>
            </>
          )}
          <button
            onClick={handleLoginToggle}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors duration-200 w-full md:w-auto text-center ${isLoggedIn
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
              }`}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
}
