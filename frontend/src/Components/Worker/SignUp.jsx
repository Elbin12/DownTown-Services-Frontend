import React from 'react';
import img from '../../images/worker_signup.png'
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const navigate = useNavigate()

  return (
    <div className='w-full mt-7 flex justify-center items-center gap-9'>
      <div className='w-1/2 justify-center flex'>
        <img src={img} alt="" />
      </div>
      <div className='h-full w-2/5 rounded-xl bg-white flex flex-col gap-11 pl-14 py-9'>
        <h2 className='text-2xl'>Sign Up</h2>
        <div className='flex flex-col gap-4'>
            <div className=''>
                <li className='list-none font-semibold text-[#585858] text-sm mb-1'>Email</li>
                <input type="text" className='border outline-[#3C5267]  w-3/5 py-2 rounded-lg pl-4' />
            </div>
            <div>
                <li className='list-none font-semibold text-[#585858] text-sm mb-1'>Mobile Number</li>
                <input type="text" className='border outline-[#3C5267]  w-3/5 py-2 rounded-lg pl-4' />
            </div>
            <div>
                <li className='list-none font-semibold text-[#585858] text-sm mb-1'>Password</li>
                <input type="password" className='border outline-[#3C5267]  w-3/5 py-2 rounded-lg pl-4'/>
            </div>
            <div>
                <li className='list-none font-semibold text-[#585858] text-sm mb-1'>Confirm Password</li>
                <input type="password" className='border outline-[#3C5267]  w-3/5 py-2 rounded-lg pl-4'/>
            </div>
        </div>
        <div className='rounded-full bg-[#3c5267de] w-3/5 py-2 text-center cursor-pointer' onClick={()=>{navigate('/worker/sent-request/')}}>
            <h3 className='text-white font-semibold tracking-wider'>Continue</h3>
        </div>
      </div>
    </div>
  )
}

export default SignUp
