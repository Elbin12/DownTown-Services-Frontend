import React, { useEffect, useState } from 'react'
import { api } from '../../axios';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ServiceDetail() {
    const { id } = useParams();
    const [service, setService] = useState();
    const [isWorkerImgLoading, setisWorkerImgLoading] = useState(true);
    const [isServiceImgLoading, setIsServiceImgLoading] = useState(true);
    const [description, setDescription] = useState();
    const [descriptionErr, setDescriptionErr] = useState();

    const [loading, setLoading] = useState(true);
      
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
      setTimeout(() => {
        const fetchServiceDetails = async()=>{
            const res = await api.get(`service/${id}/`)
            if(res.status === 200){
              setService(res.data)
              setDescription(()=>{
                if (res.data.request?.status !== 'rejected' && res.data.request?.status !== 'cancelled'){
                  return res.data.request?.description
                }
              })
              setLoading(false);
            }
        }
        fetchServiceDetails()
      }, 2000);
    }, [])

    console.log(service, 'serbice');

    const handleRequest =async()=>{
      const worker_id = service?.worker
      const service_id = service?.id

      if (!description || description.trim() === ''){
        setDescriptionErr('Give a small description about the service you want')
        return
      }

      const data = {
        worker_id,
        service_id, 
        description
      }

      try{
        const res = await api.post('service-request/', data)
        if (res.status === 201){
          console.log(res.data, 'dataaa');
          const req = res.data
          setService((prev)=>({
            ...prev,
            request: req, 
          }))
          toast.success('Request sent')
        }
      }catch(err){
        console.log(err, 'err');
        if(err.status === 401){
          toast.error('Please login to the site')
        }
      }
      
    }

    const cancelRequest =async()=>{
      const id = service?.request.id;
      try{
        const res = await api.post('cancel-request/', {'request_id':id})
        if (res.status === 200){
          toast.error('Request cancelled')
          const req = res.data.data
          setService((prev)=>({
            ...prev,
            request: req, 
            
          })) 
          setDescription('')
        }
      }catch(err){
        console.log(err, 'err');
      }
    }

    console.log(service?.request.status, 'status', service?.request.description, description);
    
  return (
          <div className='w-full justify-center relative flex '>
            {service?.request?.status === 'accepted' &&
            <div className='absolute w-full flex justify-center items-center h-screen z-20 bg-[#000000ad]'>
              <div className='bg-white rounded-lg w-3/4 h-3/4'>
                <div>
                  <h1>{service?.service_name}</h1>
                </div>
                <div></div>
              </div>
            </div>}
            {loading?
              <div className="absolute inset-0 mt-32 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-zinc-200 border-t-primary rounded-full animate-drop-spin"></div>
              </div>
              :
              <>
              <div className='w-3/4 mt-28 bg-white py-6 flex flex-col gap-3'>
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
                      <div className='flex flex-col gap-1 justify-between'>
                        <div className='flex flex-col gap-2'>
                          <h2 className='text-2xl font-semibold'>{service?.service_name}</h2>
                          <p className='text-xs'>{service?.description}</p>
                        </div>
                        <div className='flex justify-between'>
                          <div className='flex gap-4 items-end'>
                            <div className='bg-stone-200 text-xs py-1 px-6 rounded-full'>
                              <h2>{service?.category_name}</h2>
                            </div>
                            <div className='bg-stone-200 text-xs py-1 px-6 rounded-full'>
                              <h2>{service?.subcategory_name}</h2>
                            </div>
                          </div>
                          <div className='flex flex-col items-end justify-end w-2/5'>
                            <h2 className='bg-[#3E6990] opacity-90 w-3/4 rounded-md text-center py-2 text-white font-bold text-2xl'> ₹ {service?.price}</h2>
                          </div>
                        </div>
                        <div class="bg-slate-100 border-l-4 border-slate-500 text-gray-500 text-xs p-4 mt-4 rounded-md shadow-sm">
                          <p class="font-semibold text-gray-900">Note:</p>
                          <p>This is the base price. The final amount may vary if additional parts or replacements are needed.</p>
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
                    <div className='w-3/4'>
                      { service?.request?
                      service?.request?.status === 'request_sent' || service?.request?.status ==='accepted'?
                        <h4 className='text-sm pb-1'>Description added</h4>
                        :
                        <h4 className='text-sm pb-1'>Add a small description about your work</h4>
                        :
                        <h4 className='text-sm pb-1'>Add a small description about your work</h4>
                      }
                      <div className='flex gap-4'>
                        <input type="text" readOnly={service?.request? service.request.status === 'request_sent' || service.request.status=== 'accepted':false} className={`outline-none border py-1 w-1/2 border-stone-500 px-2 rounded-sm bg-transparent ${service?.request&& service.request.status === 'request_sent'|| service.request.status==='accepted'? 'border-none text-slate-600':''}`} value={description} onChange={(e)=>{setDescription(e.target.value); setDescriptionErr('')}}/>
                        {service?.request?
                          <>
                          {service?.request?.status === 'accepted'&& <button className='py-2 bg-[#398b47d4] text-sm text-white px-4 rounded-lg' >{service?.workerProfile.first_name} accepted your request</button>}
                          {(service?.request?.status === 'rejected'|| service?.request?.status === 'cancelled')&& <button className='py-2 bg-[#ef6b43d4] text-sm text-white px-4 rounded-lg' onClick={handleRequest}>Request {service?.workerProfile.first_name}</button>}
                            {service.request.status === 'request_sent'&&
                              <>
                                <button className='py-2 bg-[#398b47d4] text-sm text-white px-4 rounded-lg' >Request sent to {service?.workerProfile.first_name}</button>
                                <button className='py-2 bg-[#ef6b43d4] text-sm text-white px-4 rounded-lg' onClick={cancelRequest}>Cancel</button>
                              </> }
                          </>
                          :
                            <button className='py-2 bg-[#ef6b43d4] text-sm text-white px-4 rounded-lg' onClick={handleRequest}>Request {service?.workerProfile.first_name}</button>
                          }
                      </div>
                      <p className='text-red-500 text-xs'>{descriptionErr}</p>
                    </div>
                    
                  </div>
                </div>
              </div>
              </>
            }
        </div>
  )
}

export default ServiceDetail