import React, { useRef, useState } from 'react'
import './Signin.css'
import img from '../../../images/Mask group.png'
import { FcGoogle } from "react-icons/fc";
import { IoIosCloseCircle } from "react-icons/io";

function Signin({onLoginClick}) {

  const [Email, setEmail] = useState();
  const [Mob, setMob] = useState();
  const [Error, setError] = useState();
  const inputElement = useRef();

  const handlesubmit = ()=>{
    const val = inputElement.current.value
    
    if (Number.isInteger(parseInt(val))){
      if (val.length !== 10){
        setError('Mobile number should contain 10 digits.')
      }
      setMob(val)
    }
    else{
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (val.match(validRegex)){
        setEmail(val)
      }
      else{
        setError('Please give valid email.')
      }
    }
  }

  return (
    <div class='w-full flex justify-center p-5'>
      <div className="signin" class='p-5 bg-white flex rounded-xl'>
        <div className="left">
            <img src={img} alt="" />
        </div>
        <div className="right" class='p-20 flex flex-col gap-10'>
            <div>
                <div class='border gap-8 flex pl-4 pr-20 pt-2 pb-2 rounded-lg items-center m-2 cursor-pointer'>
                    <FcGoogle class='text-xl'/>
                    <h4 class='text-sm font-medium text-stone-950'>Continue with Google</h4>
                </div>
                <div class='flex items-center gap-2'>
                    <div class='line w-36 bg-gray-400'></div>
                    <h6 class='text-xs'>Or</h6>
                    <div class='line w-36 bg-gray-400'></div>
                </div>
            </div>
            <div class='flex flex-col gap-4'>
                <div class='flex flex-col gap-1'>
                    <label class='text-xs font-normal'>Email or Mobile Number</label>
                    <input type="text" ref={inputElement} onChange={()=>{setError('')}} class='border outline-none h-10 rounded-lg pl-3'/>
                    <p class='text-red-600 text-xs'>{Error}</p>
                </div>
                <button type='submit' class='h-10 rounded-full bg-[#F1C72C] text-white font-bold' onClick={handlesubmit}>CONTINUE</button>
            </div>
        </div>
      </div>
      <div class='pl-3'>
        <IoIosCloseCircle class='text-3xl cursor-pointer' onClick={onLoginClick}/>
      </div>
    </div>
  )
}

export default Signin
