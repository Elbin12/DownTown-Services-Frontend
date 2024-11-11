import React from 'react';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";


function ServiceAcceptedPopup({service}) {
  return (
    <div className='absolute w-full flex justify-center items-center h-screen z-20 bg-[#000000ad]'>
        <div className='bg-white rounded-lg w-3/4 justify-center gap-9 flex flex-col h-3/4'>
            <div className='flex h-1/3 gap-2 items-center w-full justify-center'>
                <div className='w-1/2 h-full overflow-hidden'>
                    <img src={service.pic} alt="" className=' w-full h-full object-cover'/>
                </div>
                <div className='h-full'>
                    <h1 className='text-primary text-2xl font-semibold'>{service?.service_name}</h1>
                    <p className='text-sm mb-2'>{service?.description}</p>
                    <div className='bg-primary inline-flex rounded-sm'>
                        <h1 className='text-white text-xl font-bold px-9 py-1'>{service?.price}</h1>
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-9 items-center'>
                <div className='flex flex-col items-center'>
                    <div className='w-28 h-28 rounded-full overflow-hidden'>
                        <img src={service?.workerProfile?.profile_pic} alt="" className='w-full h-full object-cover'/>
                    </div>
                    <h1 className='text-xl font-semibold text-stone-800'>{service?.workerProfile?.first_name}</h1>
                    <IoChatbubbleEllipsesSharp />   
                </div>
                <div className='w-1/2 '>
                    <div className='w-full border h-full flex justify-between items-center py-3 px-3'>
                        <div>
                            <h1 className='mb-1 text-slate-500'>Description you gave:</h1>
                            <p className='text-sm px-5'>{service.request.description}</p>
                        </div>
                        {/* <p className='bg-lime-50 px-3 py-1 font-semibold text-green-700'>Accepted</p> */}
                    </div>
                    
                </div>
            </div>
            <div className="text-center p-4 mb-2 bg-green-50">
                <p className="text-lg font-semibold text-green-800">
                    Your request has been accepted.
                </p>
                <p className="text-sm text-gray-700 mt-2">
                    <strong>{service?.workerProfile?.first_name}</strong> is on their way and will be arriving shortly to assist you.
                    Please make sure to keep your phone handy in case they need to reach out for any further instructions.
                </p>
            </div>
        </div>
    </div>
  )
}

export default ServiceAcceptedPopup
