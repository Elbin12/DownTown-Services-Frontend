import React, { useEffect, useState } from 'react';
import wires_jpg from '../../images/services_images/wires.jpg';
import { api, BASE_URL } from '../../axios';
import { MdModeEdit } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setSelectedService } from '../../redux/worker';
import { useNavigate } from 'react-router-dom';

function Services() {

    const [services, setServices] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchServices = async () => {
        try {
            const res = await api.get('worker/services/');
            if (res.status === 200) {
                setServices(res.data);
                console.log(res.data, 'data');
            }
        } catch (err) {
            console.error("Error fetching services", err);
        }
        };
        fetchServices();
    },[])

  return (
    <div className='min-h-screen pb-9'>
        <div className='flex flex-col items-center px-32 pt-32  gap-6' >
        {services?.map((service) => (
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
                        <div className='bg-[#E9E9E9] absolute  opacity-40 w-full h-full'></div>
                        <MdModeEdit className='absolute m-2 cursor-pointer text-xl' onClick={()=>{dispatch(setSelectedService(service)); navigate('/worker/service-edit/')}}/>
                        <img src={`${BASE_URL}${service.pic}`} alt="" className=' w-full h-full object-cover'/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Services
