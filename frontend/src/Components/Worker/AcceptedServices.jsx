import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import { useNavigate } from 'react-router-dom';

function AcceptedServices() {

    const [acceptedServices, setAcceptedServices] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchAcceptedServices = async ()=>{
            try{
                const res = await api.get('worker/accepted-requests/')
                if (res.status === 200){
                    console.log(res.data, 'data');
                    setAcceptedServices(res.data);
                }
            }catch(err){
                console.log(err, 'err');
            }
        }
    fetchAcceptedServices();
    }, [])

    console.log(acceptedServices, 'acc');
    
  return (
    <div className=' flex items-end'>
      <div className='bg-white'>
        <div className='flex gap-4 items-center py-2 px-4 border-b border-stone-200'>
            <h1 className='font-semibold'>Accepted Services</h1>
            <p className='text-xs font-semibold underline cursor-pointer'>View All</p>
        </div>
        <div className='flex flex-col gap-2 px-4 py-2'>
            {acceptedServices?.map((service)=>(
                <div className='flex gap-2'>
                    <img src={service?.service_image} alt="" className='w-16 h-16 object-cover'/>
                    <div className='cursor-pointer' onClick={()=>{navigate(`/worker/services/accepted/${service.id}/`)}}>
                        <h1 className='font-semibold hover:text-primary'>{service?.service_name}</h1>
                        <p className='text-xs'>{service?.user_description}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AcceptedServices
