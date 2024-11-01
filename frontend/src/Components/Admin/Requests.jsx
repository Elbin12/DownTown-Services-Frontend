import React, { useEffect, useState } from 'react';
import img from '../../images/account.png';
import { api } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setRequests } from '../../redux/admin';
import { toast } from 'sonner';

function Requests() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    const workers = useSelector(state=>state.admin.requests)
    
    useEffect(()=>{
        const fetchRequests =async ()=>{
            try {
                const res = await api.get('admin/requests/');
                dispatch(setRequests(res.data)); 
                console.log(res.data); 
            } catch (err) {
                console.log(err); 
            }finally{
                setLoading(false);
            }
        }
        fetchRequests();
    },[])
    console.log(workers, 'workkk');

    const approveWorker = async(email, status)=>{
        const data = {
            'status':status,
            'email': email
        }
        try{
            const res = await api.post('admin/handle_requests/', data)
            console.log(res.data)
            if (res.status === 200){
                if (res.data.success){
                    const new_workers = [...workers.filter((worker)=>worker.id !== res.data.id)]
                    dispatch(setRequests(new_workers));
                    toast.success(res.data.success) 
                }else if(res.data.failure){                    
                    toast.error(res.data.failure    )
                }
            }
        }catch(err){
            toast.error('Something went wrong.')
            console.log(err, 'err');
        }

        
    }
    

  return (
    <div className='w-screen flex h-screen items-center justify-end overflow-y-auto pr-10'>
      <div className=' w-4/5 bg-white flex flex-col mt-16 gap-6 rounded-lg h-4/6 pl-9 py-9'>
        <h3 className='font-semibold text-lg'>All Requests</h3>
        <div className='flex flex-wrap gap-4'>
        {
            workers?.map((worker, index)=>(
                    <div className='bg-[#709663cc] px-8 py-4 rounded-lg gap-4 items-center flex flex-col'>
                        <img src={worker?.profile_pic} alt="" />
                        <div>
                            <h4>{worker?.first_name}</h4>
                            <h4>{worker?.email}</h4>
                            <h4>{worker?.mobile}</h4>
                        </div>
                        <div className='flex gap-6'>
                            <button className='bg-[#95ef999f] px-2 py-1 rounded-sm' onClick={()=>{approveWorker(worker?.email, 'verified')}}>APPROVE</button>
                            <button className='bg-[#e837378d] px-2 py-1 rounded-sm' onClick={()=>{approveWorker(worker?.email, 'rejected')}}>REJECT</button>
                        </div>
                    </div>
            ))
        }
        </div>
      </div>
    </div>
  )
}

export default Requests
