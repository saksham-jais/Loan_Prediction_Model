import React, { useState } from 'react';
import Home from '../components/home';
import Contact from '../components/contact';
import About from '../components/about';
import Faq from '../components/faq';
import  Prediction from '../components/prediction';
import { Routes, Route, Link } from 'react-router-dom';
const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
   <>
  
    <nav className="w-full bg-gray-200 flex items-center justify-between px-5 py-2">
      
      <h1 className="text-black text-xl font-bold">
        <Link to="/">LoanPredict </Link>
        </h1>
     
      <ul className="flex space-x-4 gap-5 text-black font-semibold ">
        <li>
          <Link className='hover:text-emerald-800 transition duration-300 hover:underline hidden sm:block'  to="/">Home</Link>
        </li>
        <li>
          <Link className='hidden sm:block hover:text-emerald-800 transition duration-300 hover:underline' to="/about">About</Link>
        </li>
        <li>
          <Link className='hidden sm:block hover:text-emerald-800 transition duration-300 hover:underline' to="/prediction">Prediction</Link>
        </li>
        <li>
          <Link className='hidden sm:block hover:text-emerald-800 transition duration-300 hover:underline' to="/faq">FAQs</Link>
        </li>
        <li>
          <Link className='hidden sm:block hover:text-emerald-800 transition duration-300 hover:underline' to="/contact">Contact</Link>
        </li>
      </ul>

      <button className="hidden sm:block bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 h-8 sm:h-10  min-w-[100px] text-base rounded-[6px] sm:rounded-[8px] hover:bg-blue-600 active:scale-90 transition-all duration-300 cursor-pointer">
        Get started
      </button>

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
        <path d="M4 12h16"/>
        <path d="M4 18h16"/>
        <path d="M4 6h16"/>
      </svg>
    </nav>

    {/* for Mobile Menu */}
    {isMobileMenuOpen && (
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-100 z-50 transition-transform duration-300 ease-in-out ${
  isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
}`}>
        <ul className="flex flex-col py-2">
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
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              className="flex px-5 py-3 text-black font-semibold hover:bg-emerald-100 hover:text-emerald-800 transition-colors" 
              to="/prediction"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Prediction
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
          <li className="px-5 py-3">
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-[6px] hover:bg-blue-600 active:scale-95 transition-all duration-300">
              Get started
            </button>
          </li>
        </ul>
      </div>
    )}
   
    
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/prediction" element={<Prediction/>}/>
        <Route path="/faq" element={<Faq/>}/>
        <Route path="/contact" element={<Contact/>}/>
    </Routes>

   </>
  );
};

export default App;

