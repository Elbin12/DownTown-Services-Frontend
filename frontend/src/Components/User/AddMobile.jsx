import React, { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { api } from '../../axios';
import EnterOTP from './EnterOTP';

function AddMobile() {

    const [mob, setMob] = useState();
    const navigate = useNavigate();

    const handleClick = async()=>{
        console.log('lgkgk');
        try{
            const res = await api.post('profile/',{'mob':mob},{
                headers: {
                  'Content-Type': 'multipart/form-data' 
                }
              })
            console.log('res', res.data);
          }catch(err){
            console.log(err.response.data);
          } 
        }
        

    

  return (
    <div className='w-full bg-[#919191] h-[40rem] flex justify-center items-center'>
        <div className='bg-white w-1/4 h-3/5 p-6 flex flex-col justify-between rounded-lg'>
            <IoChevronBack onClick={()=>{navigate('/profile/')}} className='text-lg cursor-pointer'/>
            <div className='flex flex-col gap-9'>
                <h1 className='text-lg'>Add Your Mobile Number</h1>
                <input onChange={(e)=>{setMob(e.target.value)}} type="tel" className='border outline-none w-full py-4 rounded-lg px-2' placeholder='Enter Your Mobile Number'/>
            </div>
            <div className='border bg-[#F1C72C] py-1 flex justify-center rounded-lg cursor-pointer' onClick={handleClick}>
                <h3 className='text-white font-bold tracking-wide text-lg'>CONTINUE</h3>
            </div>
      </div>
    </div>
  )
}

export default AddMobile
