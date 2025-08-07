import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const working = () => {
  const navigate = useNavigate();

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
  return (
    <div className="  px-5 lg:py-10 py-5 max-w-6xl mx-auto text-black">
      <div className=" leading-relaxed flex flex-col gap-3 lg:px-2 px-2 lg:py-5 py-0">
        <h1 className='lg:text-3xl text-lg font-bold'>How Our Loan Prediction Model Works</h1>
        <h1 className='text-base text-justify '>Our loan prediction model uses advanced machine learning techniques to assess your loan eligibility. It analyzes various factors to provide a personalized prediction. Here's a breakdown of the key criteria:</h1>
      </div>
      <div className=" flex flex-col gap-3 mt-5 lg:px-2 px-4 lg:py-0 py-0">
        <h1 className='text-lg font-semibold leading-6'>Key Criteria for Loan Prediction:</h1>
        <div className=" flex rounded-lg border border-[#d0dbe7] bg-slate-100 gap-3 lg:px-2 px-3 lg:py-5 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card "><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
          <div className="flex flex-col">
            <h1 className='text-lg font-medium '>Creditworthiness</h1>
            <h2 className="text-sm text-justify  text-gray-700">Credit score, payment history, and outstanding debts</h2>
          </div>
        </div>

        <div className=" flex rounded-lg border border-[#d0dbe7] bg-slate-100 gap-3 lg:px-2 px-3 lg:py-5 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign-icon lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          <div className="flex flex-col">
            <h1 className='text-lg font-medium '>Financial Stability</h1>
            <h2 className="text-sm text-justify  text-gray-700">Income, employment status, and stability</h2>
          </div>
        </div>

        <div className=" flex rounded-lg border border-[#d0dbe7] bg-slate-100 gap-3 lg:px-2 px-3 lg:py-5 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-minus-icon lucide-file-minus"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M9 15h6" /></svg>
          <div className="flex flex-col">
            <h1 className='text-lg font-medium '>Loan Details</h1>
            <h2 className="text-sm text-justify  text-gray-700">Loan amount, purpose, and repayment term</h2>
          </div>
        </div>

        <div className=" flex rounded-lg border border-[#d0dbe7] bg-slate-100 gap-3 lg:px-2 px-3 lg:py-5 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark-icon lucide-landmark"><path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/></svg>
          <div className="flex flex-col">
            <h1 className='text-lg font-medium '>Bankruptcy History</h1>
            <h2 className="text-sm text-justify  text-gray-700">Previous bankruptcies and their impact on loan eligibility </h2>
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-3 lg:mt-0 mt-7 lg:px-2 px-4 lg:py-5 py-1">
        <h1 className="text-2xl font-semibold">
          Data Privacy and Security
        </h1>
        <h2 className="text-base  text-gray-700 text-justify  ">We prioritize the privacy and security of your data. All information is encrypted and stored securely. We adhere to strict data protection policies and do not share your information with third parties without your consent. Our model is designed to provide accurate predictions while ensuring your data remains confidential.</h2>
      </div>
    </div>
  )
}

export default working

