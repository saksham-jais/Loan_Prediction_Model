import React, { useState } from 'react';

const faq = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState({});

 
  const faqData = [
    {
      id: 1,
      category: 'General',
      question: 'What is the Loan Prediction Model?',
      description: 'Learn about the model\'s purpose and how it works.',
      answer: 'The Loan Prediction Model is an advanced machine learning system that analyzes your financial data, credit history, and personal information to predict the likelihood of loan approval. It uses algorithms trained on thousands of loan applications to provide accurate predictions and help you understand your chances before applying.'
    },
    {
      id: 2,
      category: 'General',
      question: 'What data does the model use?',
      description: 'Understand the data used to train the model.',
      answer: 'The model uses various data points including your annual income, loan amount, loan duration, age, credit score, credit card utilization rate, employment status, education level, marital status, and bankruptcy history. All data is processed securely and used only for prediction purposes.'
    },
    {
      id: 3,
      category: 'General',
      question: 'How does the model predict loan approval?',
      description: 'Find out how the model makes predictions.',
      answer: 'The model uses machine learning algorithms that have been trained on historical loan data. It analyzes patterns in successful and unsuccessful loan applications, considering factors like income-to-loan ratio, credit history, and demographic information to calculate a probability score for approval.'
    },
    {
      id: 4,
      category: 'Using the Model',
      question: 'How do I submit my information?',
      description: 'Step-by-step guide on submitting your information.',
      answer: 'Simply fill out the loan prediction form with your personal and financial information. The form includes fields for income, loan details, credit information, and personal demographics. Once completed, click the "Predict Loan" button to get your results instantly.'
    },
    {
      id: 5,
      category: 'Using the Model',
      question: 'What information do I need to provide?',
      description: 'What information is required for a prediction?',
      answer: 'You\'ll need to provide your annual income, desired loan amount, loan duration, age, credit score range, credit card utilization rate, gender, marital status, education level, employment status, bankruptcy history, and previous loan defaults information.'
    },
    {
      id: 6,
      category: 'Using the Model',
      question: 'How long does it take to get a prediction?',
      description: 'How long does it take to get a prediction?',
      answer: 'The prediction is generated instantly! Once you submit your information, our model processes your data in real-time and provides results within seconds. No waiting period or manual review is required.'
    },
    {
      id: 7,
      category: 'Understanding Predictions',
      question: 'How do I interpret the prediction?',
      description: 'What does the prediction result mean?',
      answer: 'The prediction result shows the likelihood of your loan being approved, typically as a percentage or probability score. A higher score indicates better chances of approval. The result also includes factors that positively or negatively impact your prediction.'
    },
    {
      id: 8,
      category: 'Understanding Predictions',
      question: 'What factors affect the prediction?',
      description: 'What factors influence the prediction?',
      answer: 'Key factors include your credit score, income-to-loan ratio, employment stability, credit history, existing debts, loan amount relative to income, and demographic factors. Higher income, better credit scores, and lower debt-to-income ratios generally improve your chances.'
    },
    {
      id: 9,
      category: 'Understanding Predictions',
      question: 'How can I improve my chances of approval?',
      description: 'Can I improve my chances of approval?',
      answer: 'You can improve your chances by increasing your credit score, reducing existing debts, increasing your income, choosing a smaller loan amount, extending the loan term to reduce monthly payments, and maintaining a stable employment history.'
    },
    {
      id: 10,
      category: 'Privacy and Security',
      question: 'Is my data secure?',
      description: 'How is my personal information protected?',
      answer: 'Yes, your data is completely secure. We use industry-standard encryption, secure servers, and follow strict data protection protocols. Your information is never shared with third parties and is used solely for generating your loan prediction.'
    },
    {
      id: 11,
      category: 'Privacy and Security',
      question: 'Who can see my information?',
      description: 'Who has access to my information?',
      answer: 'Only you have access to your submitted information and prediction results. Our system processes data automatically without human intervention. No staff members, third parties, or external organizations can view your personal data.'
    },
    {
      id: 12,
      category: 'Privacy and Security',
      question: 'How long is my data stored?',
      description: 'How long is my data stored?',
      answer: 'Your data is temporarily stored only during the prediction process and is automatically deleted from our servers within 24 hours. We do not maintain long-term storage of personal information submitted through the prediction form.'
    }
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter FAQ items based on search term
  const filteredFAQs = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered FAQs by category
  const groupedFAQs = filteredFAQs.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="px-4 lg:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Frequently Asked Questions</p>
        </div>
        
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div
                className="text-[#60758a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0"
                data-icon="MagnifyingGlass"
                data-size="24px"
                data-weight="regular"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input
                placeholder="Search FAQs"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60758a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </label>
        </div>

        {/* Display message if no results found */}
        {filteredFAQs.length === 0 && searchTerm && (
          <div className="px-4 py-8 text-center">
            <p className="text-[#60758a] text-lg">No FAQs found matching "{searchTerm}"</p>
          </div>
        )}

        {/* Render grouped FAQs */}
        {Object.entries(groupedFAQs).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              {category}
            </h2>
            
            {items.map((item) => (
              <div key={item.id} className="border-b border-gray-100">
                <div 
                  className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpanded(item.id)}
                >
                  <div className="flex flex-col justify-center flex-1">
                    <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
                      {item.question}
                    </p>
                    <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div 
                      className={`text-[#111418] flex size-7 items-center justify-center transition-transform duration-200 ${
                        expandedItems[item.id] ? 'rotate-90' : ''
                      }`}
                      data-icon="CaretRight" 
                      data-size="24px" 
                      data-weight="regular"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Expanded content */}
                {expandedItems[item.id] && (
                  <div className="bg-gray-50 px-4 py-4 border-t border-gray-200">
                    <p className="text-[#111418] text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default faq;
