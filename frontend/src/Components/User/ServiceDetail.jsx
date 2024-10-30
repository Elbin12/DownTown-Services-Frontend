import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import { useParams } from 'react-router-dom';
import profile from '../../images/profile1.png';

function ServiceDetail() {
    const { id } = useParams();
    const [service, setService] = useState();
    const [isWorkerImgLoading, setisWorkerImgLoading] = useState(true);
    const [isServiceImgLoading, setIsServiceImgLoading] = useState(true);
      
    const handleWorkerImgImageLoad = () => {
      setisWorkerImgLoading(false);
    };
  
    const handleWorkerImgImageErr = () => {
      setisWorkerImgLoading(false);
    };

    const handleServiceImgImageLoad = () => {
      setIsServiceImgLoading(false);
    };
  
    const handleServiceImgImageErr = () => {
      setIsServiceImgLoading(false);
    };

    useEffect(()=>{
        const fetchServiceDetails = async()=>{
            const res = await api.get(`service/${id}/`)
            if(res.status === 200){
                setService(res.data)
            }
        }
        fetchServiceDetails()
    }, [])

    console.log(service, 'serbice');
    
    
  return (
          <div className='w-full justify-center flex '>
            <div className='w-3/4 mt-28 bg-white py-6 flex flex-col gap-9'>
              <div className='w-full flex gap-4 px-9'>
                <div className='w-3/5 flex flex-col gap-9'>
                  <div className='flex flex-col gap-1'>
                    <div className='relative overflow-hidden'>
                      <div className={`bg-[#E9E9E9] absolute  opacity-30 w-full h-full ${isServiceImgLoading&& 'hidden'}`}></div>
                      {isServiceImgLoading && (
                          <div className=" w-full h-64 bg-neutral-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300 animate-shimmer"></div>
                        </div>
                        )}
                      <img src={service?.pic} alt="" onLoad={handleServiceImgImageLoad} onError={handleServiceImgImageErr} className={`h-64 w-full object-cover ${isServiceImgLoading&& 'hidden'}`}/>
                    </div>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                          <h2 className='text-2xl font-semibold'>{service?.service_name}</h2>
                          <p className='text-xs'>{service?.description}</p>
                        </div>
                        <div className='flex gap-4'>
                          <div className='bg-stone-200 text-xs py-1 px-6 rounded-full'>
                            <h2>{service?.category_name}</h2>
                          </div>
                          <div className='bg-stone-200 text-xs py-1 px-6 rounded-full'>
                            <h2>{service?.subcategory_name}</h2>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-end justify-end w-2/5'>
                        <h2 className='bg-[#3E6990] opacity-90 w-3/4 rounded-md text-center py-2 text-white font-bold text-2xl'> ₹ {service?.price}</h2>
                      </div>
                    </div>
                  </div>
                  {/* <div className='flex justify-around items-center w-full'>
                    <h2>Other services provided by <span className='font-semibold'>{service?.workerProfile.first_name}</span> :</h2>
                    <select name="" id="" className='w-1/2 outline-none py-1 px-2 rounded-md border border-stone-700'>
                      <option value="">sdf</option>
                    </select>
                  </div> */}
                </div>
                <div className='flex flex-col items-center mt-11 w-2/5'>
                  <div className='flex items-center justify-center w-full gap-9'>
                    <div className='rounded-full overflow-hidden'>
                      {isWorkerImgLoading && (
                        <div className="w-32 h-32 bg-neutral-300 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300 animate-shimmer"></div>
                      </div>
                      )}
                      <img className={`w-32 h-32 object-cover ${isWorkerImgLoading? 'hidden': ''}`} onLoad={handleWorkerImgImageLoad} onError={handleWorkerImgImageErr} src={service?.workerProfile.profile_pic} alt="" />
                    </div>
                    <div className='flex flex-col gap-6 w-1/3'>
                      <h2 className='font-light text-xl text-[#3E6990] text-center'>{service?.workerProfile?.first_name} {service?.workerProfile?.last_name}</h2>
                      <div>
                        <h1 className='text-xs text-stone-500 mb-1'>PHONE</h1>
                        <h2 className='font-semibold text-sm text-stone-600'>{service?.workerProfile.mob}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=' bg-[#e0d8b83a] py-4 flex items-center justify-center'>
                <div className='flex justify-center items-end w-full gap-6'>
                  <div className='w-1/3'>
                    <h4 className='text-sm pb-1'>Add a small description about your work</h4>
                    <input type="text" className='outline-none border py-1 w-full border-stone-500 px-2 rounded-sm bg-transparent'/>
                  </div>
                  <button className='py-2 bg-[#ef6b43d4] text-sm text-white px-4 rounded-lg'>Request {service?.workerProfile.first_name}</button>
                </div>
              </div>
          </div>
        </div>
  )
}

export default ServiceDetail