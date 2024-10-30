import React, { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";

function EditEmail({setActivePopup, setEmail}) {

  const [input, setInput] = useState('');
  const [emailError, setEmailError] = useState();
  
  const handleClick =()=>{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!input.match(validRegex)){
    setEmailError('Please give valid email.')
    return; 
    }
    setEmail(input)
    setActivePopup('otp')
  }
        

    

  return (
    <div className='w-full  z-10 fixed bg-[#39393999] h-full top-0 left-0 items-center flex justify-center'>
        <div className='bg-white w-1/4 h-3/5 p-6 flex flex-col justify-between rounded-lg'>
            <IoChevronBack onClick={()=>{setActivePopup('')}} className='text-lg cursor-pointer'/>
            <div className='flex flex-col gap-9'>
                <h1 className='text-lg'>Edit your Email Address</h1>
                <div>
                  <input onChange={(e)=>{setInput(e.target.value)}} type="tel" className='border outline-none w-full py-4 rounded-lg px-2' placeholder='Enter Your Email Address'/>
                  <p className='text-red-600 text-xs px-2'>{emailError}</p>
                </div>
            </div>
            <div className='border bg-[#F1C72C] py-1 flex justify-center rounded-lg cursor-pointer' onClick={handleClick}>
                <h3 className='text-white font-bold tracking-wide text-lg'>CONTINUE</h3>
            </div>
      </div>
    </div>
  )
}

export default EditEmail
