import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const contact = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if user is an employee and redirect to dashboard
    const token = localStorage.getItem('authToken');
    const employeeData = localStorage.getItem('employeeData');
    
    if (token && employeeData) {
      try {
        const employee = JSON.parse(employeeData);
        if (employee.role === 'employee') {
          // Redirect employee to dashboard immediately
          navigate('/employee-dashboard', { replace: true });
          return;
        }
      } catch (error) {
        console.error('Error parsing employee data:', error);
      }
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="lg:max-w-6xl sm:max-w-[350px] md:max-w-3xl mx-auto relative ">
      <h1 className="text-2xl px-3 font-semibold py-5 mt-5">Contact Us</h1>

      <h2 className=" px-3 grow">We're here to help. Reach out to us through any of the methods below, or fill out the form for a quick response.</h2>
      <h1 className="text-lg px-3  font-semibold py-5 grow">Contact Information</h1>
      <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
        <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f5] shrink-0 size-12" data-icon="Phone" data-size="24px" data-weight="regular">

          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">Phone</p>
          <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">+91-9874651230</p>
        </div>
      </div>
      <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
        <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f5] shrink-0 size-12" data-icon="Envelope" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>

        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">Email</p>
          <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">support@loanpredictor.com</p>
        </div>
      </div>
      <h3 className="text-[#111418] text-lg font-semibold leading-tight  px-4 pb-2 pt-4">Send Us a Message</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Your Name</p>
            <input
              placeholder="Enter your name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Your Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] border border-[#dbe0e6] bg-white focus:border-[#dbe0e6] h-14 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] text-base font-medium leading-normal pb-2">Message</p>
            <textarea
              placeholder="Type your message here"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418]  border border-[#dbe0e6] bg-white focus:border-[#070707] min-h-36 placeholder:text-[#60758a] p-[15px] text-base font-normal leading-normal"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </label>
        </div>
        <div className="flex px-4  lg:pb-5 pb-8 ">
          <button onClick={(e) => {
            handleSubmit(e)
          }}
            type="submit"
            className=" min-w-[84px] max-w-[200px] cursor-pointer lg:relative lg:left-30 items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#0b79ee] text-white text-sm font-bold leading-normal hover:bg-[#0a6bd6] le-95 active:scale-95 duration-300"
          >
            <span className="text-lg font-sans">Submit</span>
          </button>
        </div>
      </form>


        <img src="/contact.png" alt="contactimage" className="w-[45vw] h-[62vh] absolute top-[16vh] left-[35vw] hidden sm:block " />

    </div>
  )
}

export default contact