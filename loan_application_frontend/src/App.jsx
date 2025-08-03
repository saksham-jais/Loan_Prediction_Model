import React from 'react';
import Home from '../components/home';
import Contact from '../components/contact';
import About from '../components/about';
import Faq from '../components/faq';
import { Routes, Route, Link } from 'react-router-dom';
const App = () => {
  return (
   <>
  
    <nav className="w-full bg-gray-200 flex items-center justify-between px-5 py-2">
      
      <h1 className="text-black text-xl font-bold">LoanPredict</h1>
     
      <ul className="flex space-x-4 gap-5 text-black font-semibold">
        <li>
          <Link className='hover:text-emerald-800 transition duration-300 hover:underline'  to="/">Home</Link>
        </li>
        <li>
          <Link className='hover:text-emerald-800 transition duration-300 hover:underline' to="/about">About</Link>
        </li>
        <li>
          <Link className='hover:text-emerald-800 transition duration-300 hover:underline' to="/faq">FAQs</Link>
        </li>
        <li>
          <Link className='hover:text-emerald-800 transition duration-300 hover:underline' to="/contact">Contact</Link>
        </li>
      </ul>
 
      <button className="bg-blue-500 text-white px-4 py-2 rounded-[8px] hover:bg-blue-600 transition duration-300 cursor-pointer active:scale-90">
        Get started
      </button>
    </nav>
   
    
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/faq" element={<Faq/>}/>
    </Routes>

   </>
  );
};

export default App;
