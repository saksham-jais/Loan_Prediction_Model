import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const initialState = {
  Age: '',
  AnnualIncome: '',
  Creditscore: '',
  EmploymentStatus: '',
  EducationLevel: '',
  LoanAmount: '',
  LoanDuration: '',
  CreditCardUtilizationRate: '',
  BankruptcyHistory: 'false',
  PreviousLoanDefaults: 'false',
  LengthOfCreditHistory: '',
  TotalLiabilities: '',
  NetWorth: '',
  InterestRate: ''
};

const LoanPredictionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(true);
    const [predictionResult, setPredictionResult] = useState(null);
    const [riskScore, setRiskScore] = useState(null);
    const [showResults, setShowResults] = useState(false); // For animation
    const [isLoading, setIsLoading] = useState(false); // For loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/testdata/${id}`);
        if (response.ok) {
          const user = await response.json();
          setFormData({
            Age: user.Age ?? '',
            AnnualIncome: user.AnnualIncome ?? '',
            Creditscore: user.Creditscore ?? '',
            EmploymentStatus: user.EmploymentStatus ?? '',
            EducationLevel: user.EducationLevel ?? '',
            LoanAmount: user.LoanAmount ?? '',
            LoanDuration: user.LoanDuration ?? '',
            CreditCardUtilizationRate: user.CreditCardUtilizationRate ?? '',
            BankruptcyHistory: String(user.BankruptcyHistory ?? 'false'),
            PreviousLoanDefaults: String(user.PreviousLoanDefaults ?? 'false'),
            LengthOfCreditHistory: user.LengthOfCreditHistory ?? '',
            TotalLiabilities: user.TotalLiabilities ?? '',
            NetWorth: user.NetWorth ?? '',
            InterestRate: user.InterestRate ?? ''
          });
        } else {
          alert("Failed to load test user data.");
        }
      } catch (err) {
        alert("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const closePage = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // Start loading
      const baseUrl = "https://loan-prediction-model-1.onrender.com";
      const response = await fetch(`${baseUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        const result = await response.json();
        setPredictionResult(result.result);
        setRiskScore(result.risk_score);
        setShowResults(false); // Reset animation
        setTimeout(() => setShowResults(true), 50); // Trigger fade-in
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-4 relative">
      {/* Close (X) button */}
      <button
        onClick={closePage}
        className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>

      <div className="flex flex-col items-center w-full max-w-sm">
        <h2 className="text-[#0e141b] text-2xl font-bold text-center mb-1">Loan Prediction Form</h2>
        <p className="text-[#0e141b] text-base text-center mb-4">Fill the details below and submit application.</p>
        <form className="w-full" onSubmit={handleSubmit}>
          {/* Numeric Text Inputs */}
          {[
            { name: 'Age', placeholder: 'Enter your age' },
            { name: 'AnnualIncome', placeholder: 'Enter your annual income' },
            { name: 'Creditscore', placeholder: 'Credit score (300-850)' },
            { name: 'LoanAmount', placeholder: 'Loan amount' },
            { name: 'LoanDuration', placeholder: 'Duration (months)' },
            { name: 'CreditCardUtilizationRate', placeholder: 'Utilization rate (0-100%)' },
            { name: 'LengthOfCreditHistory', placeholder: 'Credit history (years)' },
            { name: 'TotalLiabilities', placeholder: 'Total liabilities' },
            { name: 'NetWorth', placeholder: 'Net worth' },
            { name: 'InterestRate', placeholder: 'Expected interest rate (%)' }
          ].map(field => (
            <div key={field.name} className="mb-3">
              <label className="block font-semibold text-gray-800 pb-1">{field.name.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="number"
                name={field.name}
                placeholder={field.placeholder}
                className="w-full border rounded-md px-3 py-2 text-gray-700 bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData[field.name]}
                disabled
                readOnly
              />
            </div>
          ))}

          {/* Select Inputs */}
          <div className="mb-3">
            <label className="block font-semibold text-gray-800 pb-1">Employment Status</label>
            <select
              name="EmploymentStatus"
              value={formData.EmploymentStatus}
              disabled
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-[#f8fafc]"
            >
              <option value="">Select</option>
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block font-semibold text-gray-800 pb-1">Education Level</label>
            <select
              name="EducationLevel"
              value={formData.EducationLevel}
              disabled
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-[#f8fafc]"
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Associate">Associate Degree</option>
              <option value="Bachelor">Bachelor's Degree</option>
              <option value="Master">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block font-semibold text-gray-800 pb-1">Bankruptcy History</label>
            <select
              name="BankruptcyHistory"
              value={formData.BankruptcyHistory}
              disabled
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-[#f8fafc]"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block font-semibold text-gray-800 pb-1">Previous Loan Defaults</label>
            <select
              name="PreviousLoanDefaults"
              value={formData.PreviousLoanDefaults}
              disabled
              readOnly
              className="w-full border rounded-md px-3 py-2 bg-[#f8fafc]"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="flex px-4 py-3 justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex min-w-[84px] max-w-[480px] items-center justify-center rounded-lg h-10 px-4 text-slate-50 text-sm font-bold transition-all ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#1978e5] hover:bg-[#1565c0]'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <span>Predicting...</span>
                  </div>
                ) : (
                  <span>Predict</span>
                )}
              </button>
            </div>
        </form>
                  {/* Loading State */}
          {isLoading && (
            <div className="mt-6 flex flex-col items-center justify-center space-y-3">
              <div className="w-20 h-20 border-5 border-blue-200 border-t-green-600 rounded-full animate-spin"></div>
              <p className="text-gray-600 text-sm">Analyzing your loan application...</p>
              <p className="text-gray-500 text-xs">This may take a few moments</p>
            </div>
          )}

          {/* Animated Results */}
          {!isLoading && riskScore !== null && predictionResult && (
            <div className={`mt-6 space-y-3 text-center transition-opacity duration-700 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
              <div className="p-4 bg-blue-100 text-blue-800 rounded-lg font-semibold">
                Risk Score: {riskScore}
              </div>
              <div
                className={`p-4 rounded-lg font-semibold ${
                  predictionResult === 'Approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                Loan Prediction: {predictionResult}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default LoanPredictionForm;
