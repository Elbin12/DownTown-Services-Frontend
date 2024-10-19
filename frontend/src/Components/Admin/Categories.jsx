import React, { useEffect, useState } from 'react'
import { api, BASE_URL } from '../../axios';
import Searchbar from './Searchbar';
import AddCategory from './AddCategory'
import Subcategories from './Subcategories';
import { MdOutlineEdit } from "react-icons/md";
import { setSelectedCategory } from '../../redux/admin';
import { useDispatch, useSelector } from 'react-redux';
import EditCat from './EditCat';
import AddSub from './AddSub';

function Categories() {

    const [loading, setLoading] = useState();
    const [categories, setCategories] = useState([]);

    const selectedCategory = useSelector(state=>state.admin.selectedCategory)
    const [popup, setPopup] = useState('');
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const fetchCategories = async () => {
          try {
            setLoading(true)
            const res = await api.get('admin/categories/');
            setCategories(res.data); 
            console.log(res.data); 
          } catch (err) {
            console.log(err); 
          }finally{
            setLoading(false);
          }
        };
        fetchCategories();
    },[])

    console.log(categories, 'catego', selectedCategory, 'lll');

    const handleClick = (category)=>{
        setPopup('cat');
        dispatch(setSelectedCategory(category))
    }
    

  return (
<>
    {popup&&
        <div onClick={()=>{setPopup(false)}}>
            <div className='bg-gray-200 opacity-40 w-screen h-screen n fixed top-0 left-0 z-10'>
            </div>
            {popup==='Addsub'&&<AddSub setPopup={setPopup}/>}
            {popup==='cat'&&<EditCat role={'cat'} setPopup={setPopup} setCategories={setCategories} categories={categories}/>}
            {popup==='sub'&&<EditCat role={'sub'} setPopup={setPopup}/>}
        </div>
    }
    <div className='w-screen flex justify-end overflow-y-auto pr-10'>
      <div className='w-4/5 mt-28 flex items-center flex-col gap-6 py-9'>
        <div className='flex w-full  items-center gap-14'>
            <div className=' w-3/4 bg-white flex flex-col justify-between rounded-lg h-full'>
                <div>
                    <div className='w-4/6 flex items-center px-6 justify-between py-4'>
                        <h3 className='text-lg'>Categories</h3>
                        < Searchbar />
                    </div>
                    <table className="table-auto w-full">
                        <thead className="bg-[#EDF2F9] h-auto">
                        <tr className="text-sm font-semibold text-[#505050]">
                            <th className="px-8 py-1.5 text-left items-center">Name</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading&&
                            <tr>
                            <td colSpan="4" className="text-center font-semibold py-8">
                                LOADING...
                            </td>
                            </tr>
                        }
                        {
                            categories?.map((category, index)=>(
                            <tr key={index} className="text-sm font-semibold text-[#505050] py-6 border-b">
                                <td className="px-8 py-3 flex gap-2 items-center cursor-pointer" onClick={()=>{dispatch(setSelectedCategory(category))}}>
                                {category.category_name}
                                </td>
                                <td className='cursor-pointer' onClick={()=>{handleClick(category)}}><MdOutlineEdit /></td>
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <AddCategory setCategories={setCategories} />
        </div>
        <Subcategories setPopup={setPopup} />
      </div>
    </div>
</>
  )
}

export default Categories
