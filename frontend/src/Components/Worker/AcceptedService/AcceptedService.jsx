import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { api } from '../../../axios';
import UserDetails from './UserDetails';

function AcceptedService({role}) {

    const { id } = useParams();
    const [accepted_service, setAcceptedService] = useState();

    useEffect(()=>{
        const fetchAcceptedService = async()=>{
            try{
                let url = ''
                if(role === 'user'){
                    url = `order/${id}/`
                }else if(role ==='worker'){
                    url = `worker/accepted-service/${id}/`
                }
                const res = await api.get(url)
                if (res.status === 200){
                    console.log('data', res.data)
                    setAcceptedService(res.data);
                }
            }catch(err){
                console.log('err', err)
            }
        }
        fetchAcceptedService();
    }, [])

    console.log(accepted_service, 'accepted_service')
  return (
    <div className=' w-full flex justify-center'>
        <div className='bg-white w-full mx-24 py-16 mt-28 gap-16 flex flex-col rounded-lg h-full'>
            <UserDetails role={role} user={role==='user'?accepted_service?.worker:accepted_service?.user} order={accepted_service}/>
            {role==='worker'&&
                <div className='flex flex-col items-center gap-3'>
                    <h1 className='text-lg font-semibold text-neutral-700'>Click the button once you've finished your work.</h1>
                    <button className='bg-amber-600 text-white px-4 py-1 rounded-sm font-semibold'>Mark as Completed</button>
                    <div className='border-b  w-1/2'></div>
                </div>
            }
        </div>
    </div>
  )
}

export default AcceptedService
