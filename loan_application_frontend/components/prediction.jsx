import React, { useState } from 'react';

const Prediction = () => {

  const [formData, setFormData] = useState({
    applicantIncome: '',
    coapplicantIncome: '',
    loanAmount: '',
    loanAmountTerm: '',
    creditHistory: '',
    gender: '',
    married: '',
    dependents: '',
    education: '',
    selfEmployed: '',
    propertyArea: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    if(!formData.applicantIncome || !formData.loanAmount || !formData.loanAmountTerm) {
      alert('Please fill in all required fields');
      return;
    }
    else alert('Loan prediction submitted!');
    
  };

  return (
    <>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-[512px]  py-5 max-w-[960px] flex-1">
          <h2 className="text-[#0e141b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Loan Prediction Form</h2>
          <p className="text-[#0e141b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">Please fill in the following details to get a loan prediction.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Applicant Income</p>
                <input
                  name="applicantIncome"
                  type="number"
                  placeholder="Enter your annual income"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.applicantIncome}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Coapplicant Income</p>
                <input
                  name="coapplicantIncome"
                  type="number"
                  placeholder="Enter coapplicant's annual income"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.coapplicantIncome}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Loan Amount</p>
                <input
                  name="loanAmount"
                  type="number"
                  placeholder="Enter loan amount"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Loan Amount Term (in days)</p>
                <input
                  name="loanAmountTerm"
                  type="number"
                  placeholder="Enter loan term in days"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.loanAmountTerm}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Credit History</p>
                <select
                  name="creditHistory"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.creditHistory}
                  onChange={handleInputChange}
                >
                  <option value="">Select credit history</option>
                  <option value="1">Good Credit History</option>
                  <option value="0">No Credit History</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Gender</p>
                <select
                  name="gender"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Married</p>
                <select
                  name="married"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.married}
                  onChange={handleInputChange}
                >
                  <option value="">Select marital status</option>
                  <option value="Yes">Married</option>
                  <option value="No">Not Married</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Dependents</p>
                <select
                  name="dependents"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.dependents}
                  onChange={handleInputChange}
                >
                  <option value="">Select number of dependents</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3+">3+</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Education</p>
                <select
                  name="education"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.education}
                  onChange={handleInputChange}
                >
                  <option value="">Select education level</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Not Graduate">Not Graduate</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Self Employed</p>
                <select
                  name="selfEmployed"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.selfEmployed}
                  onChange={handleInputChange}
                >
                  <option value="">Select employment status</option>
                  <option value="Yes">Self Employed</option>
                  <option value="No">Not Self Employed</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e141b] text-base font-medium leading-normal pb-2">Property Area</p>
                <select
                  name="propertyArea"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border border-[#d0dbe7] bg-slate-50 focus:border-[#d0dbe7] h-14 bg-[image:--select-button-svg] placeholder:text-[#4e7097] p-[15px] text-base font-normal leading-normal"
                  value={formData.propertyArea}
                  onChange={handleInputChange}
                >
                  <option value="">Select property area</option>
                  <option value="Urban">Urban</option>
                  <option value="Semiurban">Semiurban</option>
                  <option value="Rural">Rural</option>
                </select>
              </label>
            </div>

            <div className="flex px-4 py-3 justify-center">
              <button
                type="submit"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1978e5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Predict Loan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Prediction;
