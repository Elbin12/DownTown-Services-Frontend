import React, { useEffect, useRef, useState } from 'react'
import { api } from '../../axios';
import { SlPicture } from "react-icons/sl";


function AddServices() {

    const [service_name, setService_name] = useState();
    const [serviceErr, setServiceErr] = useState();

    const [isCategory, setIsCategory] = useState(false);
    const [isSubategory, setIsSubcategory] = useState(false);
    const [isImage, setIsImage] = useState(false);

    const [category, setCategory] = useState();
    const [categoryErr, setCategoryErr] = useState();

    const [subcategory, setSubcategory] = useState();
    const [subcategoryErr, setsubategoryErr] = useState();

    const [pic, setPic] = useState();

    const subCategoryRef = useRef(null);

    const [categories, setCategories] = useState();
    
    useEffect(()=>{
        const fetchCategories = async () => {
        try {
            const res = await api.get('categories/');
            if (res.status === 200) {
            setCategories(res.data);
            console.log(res.data, 'data');
             
            }
        } catch (err) {
            console.error("Error fetching categories", err);
        }
        };
        fetchCategories();
    },[])

    const scrollToSubcategory = () => {
        setIsSubcategory(true); 
        setTimeout(() => {
          if (subCategoryRef.current) {
            subCategoryRef.current.scrollIntoView({ behavior: 'smooth' }); 
          }
        }, 100);
      };

    const categoryClick = ()=>{
        if (!service_name){
            setServiceErr('Service name is Required')
            return
        }
        setIsImage(false);
        setIsCategory(true);
    }

    const subcategoryClick = ()=>{
        if (!service_name){
            setServiceErr('Service name is Required')
            return
        }else if (!category){
            setCategoryErr('Category is required')
            return
        }
        setIsImage(false);
        setIsSubcategory(true);
        scrollToSubcategory();
    }

  return (
    <div className='w-full mt-36 flex flex-col gap-1 items-center'>
        <div className='w-3/4 h-auto  bg-white rounded-lg z-10 shadow-lg'>
            <div className='px-9 bg-slate-300 flex rounded-t-lg gap-11'>
                <h1 className='text-xl py-6 font-bold'>Add a service</h1>
                {category?<h1 className='text-sm hover:bg-gray-700 font-semibold hover:text-gray-200 px-4 py-7 cursor-pointer' onClick={()=>{setIsCategory(true); setIsImage(false);}}>Edit Category</h1> 
                :<h1 className='text-sm hover:bg-gray-700 font-semibold hover:text-gray-200 px-4 py-7 cursor-pointer' onClick={categoryClick}>Add Category</h1>}

                {subcategory? <h1 className='text-sm hover:bg-gray-700 font-semibold hover:text-gray-200 cursor-pointer px-4 py-7 ' onClick={()=>{scrollToSubcategory(); setIsImage(false);}}>Edit Subcategory</h1> 
                :<h1 className='text-sm hover:bg-gray-700 font-semibold hover:text-gray-200 cursor-pointer px-4 py-7 ' onClick={subcategoryClick}>Add Subcategory</h1>} 
                <div className='text-sm hover:bg-gray-700 font-semibold hover:text-gray-200 cursor-pointer px-4 py-7 flex gap-2 items-center' onClick={()=>{setIsImage(true); setIsCategory(false); setIsSubcategory(false);}}> 
                    <SlPicture />
                    <h1>Add Picture</h1>
                </div>
            </div>
            <div className='flex py-9 gap-6 px-11'>
                <div className='w-1/2 flex flex-col gap-2'>
                    <li className='list-none font-semibold'>Service Name</li>
                    <input type="text" className='border rounded-sm w-3/4 text-2xl h-14 outline-none pl-4 focus:border-[#396682]' onChange={(e)=>{setService_name(e.target.value); setServiceErr('')}}/>
                    <p className='text-red-500 text-xs'>{serviceErr}</p>
                    <p className='text-red-500 text-xs'>{categoryErr}</p>
                </div>
                {category&& <div className=' w-1/2 flex flex-col gap-2'>
                    <li className='list-none font-semibold'>category</li>
                    <h1 className='text-lg h-14 '>{category}</h1>
                </div>}
                {subcategory&& <div className=' w-1/2 flex flex-col gap-2'>
                    <li className='list-none font-semibold'>sub category</li>
                    <h1 className='text-lg'>{subcategory}</h1>
                </div>}
            </div>
        </div>  
        <div className=' w-3/4 pt-[15.5rem] flex flex-col gap-2 h-[24rem] overflow-y-scroll fixed scrollbar-none'>
            {isCategory&&
            <div className=' px-9'>
                <div className=' px-11 bg-white py-6 rounded-lg flex flex-col gap-2'>
                    <li className='list-none font-semibold'>Category Name</li>
                    <div className='flex gap-6 items-end'>
                        {/* <input type="text" className='border rounded-sm w-3/6 text-lg h-11 outline-none pl-4 focus:border-[#396682]' value={catinput} onChange={(e)=>{setCatInput(e.target.value)}}/> */}
                        <select className='border rounded-sm w-3/6 text-lg h-11 outline-none px-4 focus:border-[#396682]' name="" id="" onChange={(e)=>{setCategory(e.target.value); setSubcategory(''); setIsCategory(false); setCategoryErr('') }}>
                        <option value=""  selected>Select a subcategory</option>
                        {categories?.map((category, index) => (
                            <option key={index} value={category.category_name}>{category.category_name}</option>
                        ))}
                        </select>
                        {/* {catinput&&<button className='bg-[#37454c] h-full px-4 font-semibold text-[#eaeaea] py-1 rounded-sm' onClick={()=>{setCategory(catinput); setIsCategory(false)}}>Done</button>} */}
                    </div>
                </div>
            </div>}
            {isSubategory&&
            <div className='px-9' ref={subCategoryRef}>
                <div className=' px-11 bg-white py-6 rounded-lg flex flex-col gap-2'>
                    <li className='list-none font-semibold'>Sub category Name</li>
                    <div className='flex gap-6 items-end'>
                        {/* <input type="text" className='border rounded-sm w-3/6 text-lg h-11 outline-none pl-4 focus:border-[#396682]' value={subcatInput} onChange={(e)=>{setSubCatInput(e.target.value)}}/> */}
                        {categories?.map((cat) => (
                            cat.category_name === category && (
                                <select 
                                    className='border rounded-sm w-3/6 text-lg h-11 outline-none px-4 focus:border-[#396682]' 
                                    name="subcategories"
                                    onChange={(e)=>{setSubcategory(e.target.value); setIsSubcategory(false);}}
                                >
                                    <option value="" selected>Select a subcategory</option>
                                    {cat.subcategories.map((subcategory, index) => (
                                        <option key={index} value={subcategory.subcategory_name}>{subcategory.subcategory_name}</option>
                                    ))}
                                </select>
                            )
                        ))}
                        {/* {subcatInput&&<button className='bg-[#37454c] h-full px-4 font-semibold text-[#eaeaea] py-1 rounded-sm' onClick={()=>{setSubcategory(subcatInput); setIsSubcategory(false)}}>Done</button>} */}
                    </div>
                </div>
            </div>}
        </div>
        {isImage&&<div className='w-3/4 px-11 py-4 gap-3 h-auto mt-1 rounded-lg items-center bg-white flex flex-col'>
            <li className='list-none font-semibold'>Add a picture</li>
            <input type="file" className='border rounded-sm w-3/4 py-2 outline-none pl-1  z-10' 
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    const cachedURL = URL.createObjectURL(file);
                    setPic(cachedURL);
                }
            }} />
            <img src={pic} alt="" accept="image/*" className={`${pic&&'h-24'}`}/>
        </div>}
    </div>
  )
}

export default AddServices
