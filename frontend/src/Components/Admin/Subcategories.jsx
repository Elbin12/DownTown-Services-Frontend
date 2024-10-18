import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../axios'
import Searchbar from './Searchbar';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineEdit } from 'react-icons/md';
import { IoIosAdd } from "react-icons/io";
import { setSelectedCategory } from '../../redux/admin';


function Subcategories() {

    const subcategories = useSelector(state=>state.admin.selectedCategory?.subcategories)
    const dispatch = useDispatch();

    console.log(subcategories, 'kkkh');

    useEffect(()=>{
        return () => {
            dispatch(setSelectedCategory([]))
        }
    }, [])
    

  return (
    <div className=' w-3/4 bg-white flex flex-col rounded-lg h-48'>
        <div className='w-full py-4 px-4 flex justify-between gap-9'>
            <h3 className='text-lg '>Sub Categories</h3>
            < Searchbar />
            <div className='flex items-center text-[#474747]'>
                <IoIosAdd className='text-3xl'/>
                <h2>Add a sub category</h2>
            </div>
        </div>
        <table className="table-auto w-full">
            <thead className="bg-[#EDF2F9] h-auto">
            <tr className="text-sm font-semibold text-[#505050]">
                <th className="px-8 py-1.5 text-left items-center">Sub category</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {!subcategories ? (
                        <tr>
                            <td className="px-8 py-3 flex gap-2 items-center">
                                Please select a category first
                            </td>
                        </tr>
                    ):
                subcategories.length === 0?
                <tr><td className="px-8 py-3 flex gap-2 font-semibold items-center text-[#505050]">No Sub categories</td></tr>:
                subcategories?.map((subcategory, index)=>(
                <tr key={index} className="text-sm font-semibold text-[#505050] py-6 border-b">
                    <td className="px-8 py-3 flex gap-2 items-center cursor-pointer">
                    {subcategory.subcategory_name}
                    </td>
                    <td><MdOutlineEdit /></td>
                </tr>
                ))
            }      
            </tbody>
        </table>
    </div>
  )
}

export default Subcategories
