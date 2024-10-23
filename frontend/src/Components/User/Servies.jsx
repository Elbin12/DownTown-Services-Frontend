import React, { useEffect, useState } from 'react';
import wires_jpg from '../../images/services_images/wires.jpg';
import { api, BASE_URL } from '../../axios';
import { useSelector } from 'react-redux';

function Servies() {

  const [categories, setCategories] = useState();
  const [services, setServices] = useState();
  const [loading, setLoading] = useState(true);

  const search_key = useSelector(state=>state.user.search_key)

  useEffect(()=>{
    const fetchCategories = async () => {
      try {
        const res = await api.get('categories/');
        if (res.status === 200) {
          setCategories(res.data); 
        }
      } catch (err) {
        console.error("Error fetching categories", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchCategories();
  },[])

  useEffect(()=>{
      const fetchServices = async () => {
        if (search_key){
          try {
            const res = await api.get(`services/`, {
              params: {
                search_key: search_key
              }
            });
            if (res.status === 200) {
              setServices(res.data);
              console.log(res.data, 'search', search_key);
            }
          } catch (error) {
            console.error('Error fetching services:', error);
          }
        }else{
          try {
            const res = await api.get('services/');
            if (res.status === 200) {
                setServices(res.data);
                console.log(res.data, 'data');
            }
        } catch (err) {
            console.error("Error fetching services", err);
        }
      }
      };
      fetchServices();
  },[search_key])

  return (
    <div className='min-h-screen py-6'>
      <div className='w-full fixed h-1/2 bg-[#1d3045]'></div>
      <div className='w-full flex px-32 pt-24  gap-16' >
        <div className=' w-1/4 z-10  flex flex-col gap-4'>
          <div className='sticky top-16 flex flex-col gap-4'>
            <div className='bg-white rounded-lg px-4 py-5 flex flex-col gap-4'>
              <h1 className='font-semibold'>Popular Services</h1>
              <div className='flex gap-2'>
                <input type="checkbox" />
                <h4 className='text-sm'>Home Cleaning</h4>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" />
                <h4 className='text-sm'>Home Cleaning</h4>
              </div>
            </div>
            <div className='bg-white rounded-lg px-5 py-6 flex flex-col gap-9'>
                {categories?.map((category) => (
                  <div key={category.category_name} className="flex flex-col gap-4">
                    <h1 className="font-semibold">{category.category_name}</h1>
                    {category.subcategories.length > 0 ? (
                      <div>
                        {category.subcategories.map((sub) => (
                          <div key={sub.id} className="flex gap-2">   
                            <input type="checkbox" />
                            <h4 className="text-sm">{sub.subcategory_name}</h4>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm">No subcategories available</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className=' h-auto z-10 mt-14  scrollbar-none overflow-y-auto flex flex-col w-3/4 gap-4 '>
        {services?.map((service) => (
                <div className='flex bg-white h-48'>
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
                    <div className=' relative bg-cover  w-3/6 fit overflow-hidden'>
                      <div className='bg-[#E9E9E9] absolute  opacity-40 w-full h-full'></div>
                      <div className='absolute w-full h-full flex items-center justify-center'>
                        <h1 className='text-xl font-bold text-slate-800 bg-white px-6 py-2'>Rs. {service.price}</h1>
                      </div>
                      <img src={`${BASE_URL}${service.pic}`} alt="" className=' w-full h-full object-cover'/>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Servies
