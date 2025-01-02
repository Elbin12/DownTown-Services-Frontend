import React, { useEffect, useState } from 'react'
import AcceptedServices from './AcceptedServices'
import ServiceChart from './ServiceChart';
import SalesChart from './SalesChart';
import { api } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkerinfo } from '../../redux/worker';

function Dashboard() {
  const workerinfo = useSelector(state=>state.worker.workerinfo)

  const [isAvailable, setIsAvailable] = useState(workerinfo?.is_available);
  const [revenue, setRevenue] = useState();
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchDashboardData = async()=>{
      try{
        const res = await api.get('worker/dashboard/')
        if (res.status === 200){
          console.log(res, 'response')
          setIsAvailable(res.data.status);
          setRevenue(res.data.revenue);
        }
      }catch(err){
        console.log(err, 'err')
      }
    }
    fetchDashboardData();
  }, [])


  const toggleWorkerStatus = async () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus); 
    try {
      const res = await api.post('worker/dashboard/', { status: newStatus });
      console.log(res, 'datataa');
      if (res.status === 200) {
        dispatch(setWorkerinfo({
          ...workerinfo,
          is_available: res.data.status,
        }));
      }
    } catch (err) {
      console.error(err, 'err');
      setIsAvailable(!newStatus);
    }
  };

  return (
    <div className='mt-24 mx-28 py-2 flex flex-col gap-2'>
      <div className='flex w-full justify-end'>
        <div className="flex fixed items-center justify-center gap-6 bg-white px-4 py-2 rounded-md shadow-md">
          <div className="flex items-center gap-2">
            <input type="radio" id="available" name="availability" checked={isAvailable} onChange={toggleWorkerStatus} className="h-4 w-4 text-blue-500 focus:ring-blue-500"/>
            <label htmlFor="available" className="text-lg font-medium text-gray-700"> Available </label>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" id="notAvailable" name="availability" checked={!isAvailable} onChange={toggleWorkerStatus} className="h-4 w-4 text-gray-500 focus:ring-gray-500"/>
            <label htmlFor="notAvailable" className="text-lg font-medium text-gray-500"> Not Available </label>
          </div>
        </div>
      </div>
      <div className='flex gap-3 items-start mt-11'>
        <div className="bg-white p-6 rounded-md shadow-md flex flex-col gap-3 w-1/2">
          <div className='px-4 '>
            <h1 className='text-lg font-semibold text-stone-600'>Revenue</h1>
            <h1 className='text-3xl font-mono font-bold text-stone-700'><span className='text-2xl font-semibold'>INR</span> {revenue}</h1>
          </div>
          <SalesChart />
        </div>
        <div className="bg-white p-6 rounded-md shadow-md w-1/4">
          <AcceptedServices/>
        </div>
      </div>
      <div className="bg-white p-6 rounded-md shadow-md w-1/2">
        <ServiceChart />
      </div>
    </div>
  )
}

export default Dashboard
