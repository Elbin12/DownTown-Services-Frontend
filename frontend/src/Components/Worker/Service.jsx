import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedService } from '../../redux/worker';
import { MdModeEdit } from 'react-icons/md';

function Service({service}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
      
    const handleImageLoad = () => {
        setIsLoading(false);
    };
    
    const handleImageError = () => {
        setIsLoading(false);
    };
  return (
    <div className='w-3/4 flex bg-white h-48'>
        <div className='flex flex-col justify-between w-3/4  py-6 px-6'>
        <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-semibold text-[#2A2A2A]'>{service.service_name}</h1>
            <p className='text-sm'>{service.description}</p>
        </div>
        <div className='flex justify-between w-4/5'>
            <h1 className='px-4 bg-[#E5E5E5] py-2 text-xs'>24/7 Availability</h1>
            <h1 className='px-4 bg-[#E5E5E5] py-2 text-xs'>24/7 Availability</h1>
            <h1 className='px-4 bg-[#E5E5E5] py-2 text-xs '>24/7 Availability</h1>
        </div>
        </div>
        <div className=' relative bg-cover w-3/6 fit overflow-hidden flex justify-end'>
            <div className='bg-[#E9E9E9] absolute  opacity-30 w-full h-full'></div>
            <MdModeEdit className='absolute m-2 cursor-pointer text-xl' onClick={()=>{dispatch(setSelectedService(service)); navigate('/worker/service-edit/')}}/>
            {isLoading&&
                <div className="w-full h-full bg-neutral-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300 animate-shimmer"></div>
                </div>
            }
            <img src={service.pic} alt="No pic available" onLoad={handleImageLoad} onError={handleImageError} className={`w-full h-full object-cover  ${isLoading ? 'hidden' : ''}`}/>
        </div>
    </div>
  )
}

export default Service
