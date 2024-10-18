import React from 'react'

function AddCategory() {
  return (
    <div className=' w-2/5 bg-white flex flex-col justify-between rounded-lg h-56'>
        <div className='border-b py-2 px-4'>
            <h3 className='text-lg '>Add a category</h3>
        </div>
        <div className='h-full flex flex-col justify-center w-full items-center'>
            <div className='flex flex-col gap-4'>
                <div>
                    <li className='list-none mb-1 text-sm'>Category Name</li>
                    <input type="text" className='outline-none border pl-2 py-1 rounded-sm'/>
                </div>
                <button className='border w-1/2 bg-[#fce7a9] py-1'>Add</button>
            </div>
        </div>
    </div>
  )
}

export default AddCategory
