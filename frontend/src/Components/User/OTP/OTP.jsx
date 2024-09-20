import React from 'react'

function OTP({setActivePopup}) {
  return (
    <div class='min-h-screen items-center fixed bg-[#7e7e7e90] w-full flex  justify-center p-4'>
      <div class='bg-white w-auto px-6 py-10 flex flex-col gap-9 rounded-lg drop-shadow-sm'>
        <div class='flex flex-col gap-1'>
            <h6 class='text-xs font-medium text-[#F1C72C] mb-4 hover:underline cursor-pointer' onClick={()=>{setActivePopup('login')}}>BACK</h6>
            <h1 class='font-medium text-[#414141] text-xl'>Enter OTP</h1>
            <h6 class='text-sm'>OTP has been sent to MOBILE</h6>
        </div>
        <div class='flex flex-col gap-3'>
            <h4>Enter OTP</h4>
            <div class='flex border items-center px-3 rounded-lg'>
                <input class='w-96 h-14 outline-none' type="text" placeholder='Enter OTP here'/>
                <h6 class='text-decoration-line: underline text-xs text-[#F1C72C]'>Resend OTP</h6>
            </div>
            <h6 class='text-sm'>Didn't receive the OTP? Resend in 59 Sec</h6>
        </div>
        <div class='border bg-[#F1C72C] p-4 flex justify-center rounded-full mb-28 cursor-pointer'>
            <h3 class='text-white font-bold tracking-wide text-lg'>VERIFY & CREATE ACCOUNT</h3>
        </div>
      </div>
    </div>
  )
}

export default OTP
