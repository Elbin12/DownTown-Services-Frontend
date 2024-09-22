import React from 'react'
import { IoAdd } from "react-icons/io5";

function AddMobile() {
  return (
    <div className='flex items-center gap-3 text-lg text-[#434343] bg-[#f5f0cc] p-3 w-[445px] cursor-pointer rounded-md'>
      <IoAdd className='text-2xl'/>
      <h3>Add Mobile Number</h3>
    </div>
  )
}

export default AddMobile
