import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import { useSelector } from 'react-redux';
import Service from './Service';

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
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <input type="checkbox" />
                  <h4 className='text-sm'>Home Cleaning</h4>
                </div>
                <div className='flex gap-2'>
                  <input type="checkbox" />
                  <h4 className='text-sm'>Home Cleaning</h4>
                </div>
              </div>
            </div>
            <div className='bg-white rounded-lg px-5 py-6 flex flex-col gap-9'>
                {categories?.map((category) => (
                  <div key={category.category_name} className="flex flex-col gap-4">
                    <h1 className="font-semibold">{category.category_name}</h1>
                    {category.subcategories.length > 0 ? (
                      <div className='flex gap-2 flex-col'>
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
                <Service key={service.id} service={service} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Servies
