import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Prediction = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Check if user is authenticated
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      alert('Please login to access the prediction feature');
      navigate('/auth');
      return;
    }
    
    try {
      const user = JSON.parse(storedUserData);
      setUserData(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/auth');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    Age: '',
    AnnualIncome: '',
    Creditscore: '',
    EmploymentStatus: '',
    EducationLevel: '',
    LoanAmount: '',
    LoanDuration: '',
    CreditCardUtilizationRate: '',
    BankruptcyHistory: false,
    PreviousLoanDefaults: false,
    LengthOfCreditHistory: '',
    TotalLiabilities: '',
    NetWorth: '',
    InterestRate: ''
    // LoanApproved and RiskScore are not user inputs
  });

  // Handle input and input area changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle boolean fields
    if (name === 'BankruptcyHistory' || name === 'PreviousLoanDefaults') {
      setFormData(prev => ({
        ...prev,
        [name]: value === 'true'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/auth');
  };

  // Handle button for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    
    // Validate required fields
    const requiredFields = ['Age', 'AnnualIncome', 'Creditscore', 'EmploymentStatus', 'EducationLevel', 'LoanAmount', 'LoanDuration', 'CreditCardUtilizationRate', 'LengthOfCreditHistory', 'TotalLiabilities', 'NetWorth', 'InterestRate'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field] === '');
    
    if(missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Additional validation
    if(parseInt(formData.Age) < 18 || parseInt(formData.Age) > 100) {
      alert('Age must be between 18 and 100');
      return;
    }
    
    if(parseInt(formData.Creditscore) < 300 || parseInt(formData.Creditscore) > 850) {
      alert('Credit score must be between 300 and 850');
      return;
    }
    
    if(parseFloat(formData.CreditCardUtilizationRate) < 0 || parseFloat(formData.CreditCardUtilizationRate) > 100) {
      alert('Credit card utilization rate must be between 0 and 100');
      return;
    }

    try {
      const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://loan-prediction-model-eight.vercel.app';
      
      // Prepare data for submission
      const submissionData = {
        ...formData,
        Age: parseInt(formData.Age),
        AnnualIncome: parseFloat(formData.AnnualIncome),
        Creditscore: parseInt(formData.Creditscore),
        LoanAmount: parseFloat(formData.LoanAmount),
        LoanDuration: parseInt(formData.LoanDuration),
        CreditCardUtilizationRate: parseFloat(formData.CreditCardUtilizationRate),
        LengthOfCreditHistory: parseInt(formData.LengthOfCreditHistory),
        TotalLiabilities: parseFloat(formData.TotalLiabilities),
        NetWorth: parseFloat(formData.NetWorth),
        InterestRate: parseFloat(formData.InterestRate),
        submittedBy: userData?.name || 'User',
        status: 'pending'
        // LoanApproved and RiskScore will be set by the system later
      };

      const response = await fetch(`${baseUrl}/user/testdata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Data saved successfully:', result);
        alert('Loan prediction submitted successfully!');
        
        // Reset form
        setFormData({
          Age: '',
          AnnualIncome: '',
          Creditscore: '',
          EmploymentStatus: '',
          EducationLevel: '',
          LoanAmount: '',
          LoanDuration: '',
          CreditCardUtilizationRate: '',
          BankruptcyHistory: false,
          PreviousLoanDefaults: false,
          LengthOfCreditHistory: '',
          TotalLiabilities: '',
          NetWorth: '',
          InterestRate: ''
        });
        
        navigate('/result');
      } else {
        const errorData = await response.json();
        console.error('Error saving data:', errorData);
        alert('Error submitting prediction. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  return (
    <>
      {/* Header */}
      {userData && (
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Hide LoanPredict text on small devices */}
                <h1 className="hidden sm:block text-xl sm:text-2xl font-bold text-gray-900">LoanPredict</h1>
                <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 text-xs sm:text-sm font-medium rounded-full">
                  <span className="sm:hidden">Portal</span>
                  <span className="hidden sm:inline">User Portal</span>
                </span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="text-xs sm:text-sm text-gray-600">
                  <span className="hidden sm:inline">Welcome, </span>
                  <span className="font-medium text-xs sm:text-sm">{userData.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">Exit</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className="lg:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-[512px]  py-5 max-w-[960px] flex-1">
          <h2 className="text-[#0e141b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Loan Prediction Form</h2>
          <p className="text-[#0e141b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">Please fill in the following details to get a loan prediction.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Age</p>
                <input
                  name="Age"
                  type="number"
                  placeholder="Enter your age"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.Age}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Annual Income</p>
                <input
                  name="AnnualIncome"
                  type="number"
                  placeholder="Enter your annual income"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.AnnualIncome}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Credit Score</p>
                <input
                  name="Creditscore"
                  type="number"
                  placeholder="Enter your credit score (300-850)"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.Creditscore}
                  onChange={handleInputChange}
                  min="300"
                  max="850"
                  required
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Employment Status</p>
                <select
                  name="EmploymentStatus"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.EmploymentStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select employment status</option>
                  <option value="Employed">Employed</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Retired">Retired</option>
                  <option value="Student">Student</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Education Level</p>
                <select
                  name="EducationLevel"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.EducationLevel}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select education level</option>
                  <option value="High School">High School</option>
                  <option value="Associate">Associate Degree</option>
                  <option value="Bachelor">Bachelor's Degree</option>
                  <option value="Master">Master's Degree</option>
                  <option value="PhD">PhD</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Loan Amount</p>
                <input
                  name="LoanAmount"
                  type="number"
                  placeholder="Enter loan amount"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.LoanAmount}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Loan Duration (months)</p>
                <input
                  name="LoanDuration"
                  type="number"
                  placeholder="Enter loan duration in months"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.LoanDuration}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Credit Card Utilization Rate (%)</p>
                <input
                  name="CreditCardUtilizationRate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="Enter credit card utilization rate (0-100%)"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.CreditCardUtilizationRate}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Bankruptcy History</p>
                <select
                  name="BankruptcyHistory"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.BankruptcyHistory}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select bankruptcy history</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Previous Loan Defaults</p>
                <select
                  name="PreviousLoanDefaults"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.PreviousLoanDefaults}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select previous loan defaults</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Length of Credit History (years)</p>
                <input
                  name="LengthOfCreditHistory"
                  type="number"
                  placeholder="Enter length of credit history in years"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.LengthOfCreditHistory}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Total Liabilities</p>
                <input
                  name="TotalLiabilities"
                  type="number"
                  placeholder="Enter total liabilities"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.TotalLiabilities}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Net Worth</p>
                <input
                  name="NetWorth"
                  type="number"
                  placeholder="Enter net worth"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.NetWorth}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Interest Rate (%)</p>
                <input
                  name="InterestRate"
                  type="number"
                  step="0.01"
                  placeholder="Enter expected interest rate (%)"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.InterestRate}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <div className="flex px-4 py-3 justify-center">
              <button onClick={(e)=>{
                handleSubmit(e)
              }}
                type="submit"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1978e5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
              >
               <span>Submit</span>

              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Prediction;
