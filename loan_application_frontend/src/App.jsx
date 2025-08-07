import React, { useState, useEffect } from 'react';
import Home from '../components/home';
import Contact from '../components/contact';
import Working from '../components/HowItWorks';
import Faq from '../components/faq';
import Result from '../components/result';
import Prediction from '../components/prediction';
import AuthLogin from '../components/AuthLogin';
import EmployeeDashboard from '../components/EmployeeDashboard';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on the employee dashboard route
  const isEmployeeDashboard = location.pathname === '/employee-dashboard';

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    const employeeData = localStorage.getItem('employeeData');
    
    // More robust validation
    if (token && token.trim() !== '' && (userData || employeeData)) {
      try {
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          if (parsedUserData && Object.keys(parsedUserData).length > 0) {
            setIsAuthenticated(true);
            setUser(parsedUserData);
            return;
          }
        } else if (employeeData) {
          const parsedEmployeeData = JSON.parse(employeeData);
          if (parsedEmployeeData && Object.keys(parsedEmployeeData).length > 0) {
            setIsAuthenticated(true);
            setUser({ ...parsedEmployeeData, role: 'employee' });
            return;
          }
        }
      } catch (error) {
        console.error('Error parsing user/employee data:', error);
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('employeeData');
      }
    }
    
    // If we reach here, user is not authenticated
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('employeeData');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Show navigation - different styles for employee dashboard vs regular pages */}
      <nav className="w-full bg-gray-200 flex items-center justify-between px-5 py-2">
        <h1 className="text-black text-xl flex items-center gap-2 font-bold">
          <Link to="/" className='flex items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-newspaper-icon lucide-newspape  "><path d="M15 18h-5" /><path d="M18 14h-8" /><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" /><rect width="8" height="4" x="10" y="6" rx="1" /></svg>
            LoanPredict 
          </Link>
        </h1>

        {/* Show different navigation based on current page */}
        {!isEmployeeDashboard ? (
          <ul className="flex space-x-4 gap-5 text-black font-semibold ">
            <li>
              <Link className='hover:text-emerald-800 transition duration-300 hover:underline hidden sm:block' to="/">Home</Link>
            </li>
            <li>
              <Link className='hidden sm:block hover:text-emerald-800 transition duration-300 hover:underline' to="/working">How It Works</Link>
            </li>
            <li>
              <Link className='hidden sm:block hover:text-emerald-800 transition duration-300 hover:underline' to="/faq">FAQs</Link>
            </li>
            <li>
              <Link className='hidden sm:block hover:text-emerald-800 transition duration-300 hover:underline' to="/contact">Contact</Link>
            </li>
          </ul>
        ) : (
          <div className="hidden sm:flex items-center">
            <span className="text-sm text-gray-600 font-medium">Employee Dashboard</span>
          </div>
        )}
    
        {/* Authentication buttons - always show */}
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user?.name || user?.userid}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/AuthLogin">
              <button className="hidden sm:block bg-emerald-500 text-white px-2 py-1 sm:px-4 sm:py-2 h-8 sm:h-10 min-w-[100px] text-base rounded-[6px] sm:rounded-[8px] hover:bg-emerald-600 active:scale-90 transition-all duration-300 cursor-pointer">
                Login
              </button>
            </Link>
          )}
        </div>

        <svg
          onClick={toggleMobileMenu}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block sm:hidden lucide lucide-menu-icon lucide-menu cursor-pointer hover:text-emerald-800 transition-colors "
        >
          <path d="M4 12h16" />
          <path d="M4 18h16" />
          <path d="M4 6h16" />
        </svg>
      </nav>

      {/* for Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`fixed left-0 top-0 h-full w-64 bg-gray-100 z-50 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <ul className="flex flex-col py-2">
            {!isEmployeeDashboard && (
              <>
                <li>
                  <Link
                    className="flex px-5 py-3 text-black font-semibold hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex px-5 py-3 text-black font-semibold hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
                    to="/working"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex px-5 py-3 text-black font-semibold hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
                    to="/faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex px-5 py-3 text-black font-semibold hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </>
            )}
            <li className="px-5 py-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 mb-2">
                    Welcome, <span className="font-medium">{user?.name || user?.userid}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-[6px] hover:bg-red-600 active:scale-95 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/AuthLogin">
                  <button
                    className="w-full bg-emerald-500 text-white px-4 py-2 rounded-[6px] hover:bg-emerald-600 active:scale-95 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/working" element={<Working />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/result" element={<Result />} />
        <Route path="/AuthLogin" element={<AuthLogin />} />
        <Route path="/auth" element={<AuthLogin />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>

    </>
  );
};

export default App;
