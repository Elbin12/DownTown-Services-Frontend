import React, { useState } from 'react'
import { api } from '../../../axios'
import { useNavigate } from 'react-router-dom';

function OTP({setActivePopup}) {

    const navigate = useNavigate();
    const [otp, setotp] = useState();

    const handlesubmit = async ()=>{
        console.log(otp);
        
        const data = {
            'otp':otp
        }

        try{
            const res = await api.post('verify_otp/', data);
            console.log(res);
            navigate('/',{'message':'Sign In successfully'})
            setActivePopup('')
        }
        catch(error){
            console.log('err',error);
        }
        
    }


  return (
    <div className='min-h-screen items-center fixed bg-[#7e7e7e90] w-full flex  justify-center p-4'>
      <div className='bg-white w-auto px-6 py-10 flex flex-col gap-9 rounded-lg drop-shadow-sm'>
        <div className='flex flex-col gap-1'>
            <h6 className='text-xs font-medium text-[#F1C72C] mb-4 hover:underline cursor-pointer' onClick={()=>{setActivePopup('login')}}>BACK</h6>
            <h1 className='font-medium text-[#414141] text-xl'>Enter OTP</h1>
            <h6 className='text-sm'>OTP has been sent to MOBILE</h6>
        </div>
        <div className='flex flex-col gap-3'>
            <h4>Enter OTP</h4>
            <div className='flex border items-center px-3 rounded-lg'>
                <input className='w-96 h-14 outline-none' type="text" onChange={(e)=>{setotp(e.target.value)}} placeholder='Enter OTP here'/>
                <h6 className='text-decoration-line: underline text-xs text-[#F1C72C]'>Resend OTP</h6>
            </div>
            <h6 className='text-sm'>Didn't receive the OTP? Resend in 59 Sec</h6>
        </div>
        <div onClick={handlesubmit} className='border bg-[#F1C72C] p-4 flex justify-center rounded-full mb-28 cursor-pointer'>
            <h3 className='text-white font-bold tracking-wide text-lg'>VERIFY & CREATE ACCOUNT</h3>
        </div>
      </div>
    </div>
  )
}

export default OTP
