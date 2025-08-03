import React from 'react'

const home = () => {
  return (
     <div className=" w-full flex justify-center items-center h-[600px]   relative">
      <img src="https://plus.unsplash.com/premium_photo-1661775362620-fc541ec56625?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='h-[80vh] w-[70vw] object-cover object-center  rounded-2xl ' />
      
      <div className='absolute h-[80vh] w-[70vw] bg-gradient-to-b from-black/30 via-black/40 to-black/60 rounded-2xl'></div>
      
      <div className='absolute flex flex-col items-center text-center z-10'>
        <h1 className='text-4xl font-bold text-white max-w-[600px] leading-[1.3]'>Predict Your Loan Approval with Precision</h1>
        <h2 className='text-gray-50 text-sm py-5  max-w-[700px]'>Our advanced machine learning model analyzes your financial data to provide accurate loan approval predictions, helping you make informed decisions.</h2>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer active:scale-90 relative top-8 '>Get a Loan Prediction</button>
      </div>

     </div>
  )
}

export default home