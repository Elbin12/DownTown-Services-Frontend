import React from 'react'

function SentRequest() {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-3/4 bg-white flex flex-col gap-4 px-16 py-9 rounded-lg mt-8'>
        <h2 className='font-semibold text-[#000000c6]'>Select the services that you are good at:</h2>
        <div className='bg-[#e9e3b43f] rounded-lg'>
            <div className='p-9 flex flex-wrap gap-4'>
              <div className='p-3 bg-[#bcbbbb] '>Regular Home Cleaning</div>
              <div className='p-3 bg-[#bcbbbb] '>Regular Home Cleaning</div>
              <div className='p-3 bg-[#bcbbbb] '>Regular Home Cleaning</div>
              <div className='p-3 bg-[#bcbbbb] '>Regular Home Cleaning</div>
              <div className='p-3 bg-[#bcbbbb] '>Regular Home Cleaning</div>
            </div>
        </div>
        <div  className='flex flex-col gap-5'>
          <div className='flex justify-between px-6'>
            <div className='w-2/6'>
              <li className='list-none mb-1'>Aadhaar Number</li>
              <input type="text" className='border rounded-lg py-1 w-full outline-none px-2' />
            </div>
            <div className='w-2/6'> 
              <li className='list-none mb-1'>Upload your certificate</li>
              <input type="file" className='border rounded-lg py-1 w-full outline-none px-2' />
            </div>
          </div>
          <div className='flex justify-between px-6'>
            <div className='w-2/6'>
              <li className='list-none mb-1'>How much experience do you have ?</li>
              <input type="text" className='border rounded-lg py-1 w-full outline-none px-2' />
            </div>
            <div className='w-2/6'> 
              <li className='list-none mb-1'>Your location</li>
              <input type="text" className='border rounded-lg py-1 w-full outline-none px-2' />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 items-center mt-9'>
            <h3 className='rounded-full bg-[#3c5267de] w-2/6 py-2 text-center text-white font-semibold tracking-wider'>Sent a Request</h3>
            <p className='text-sm'>You will gain access to additional pages once approved by the admin</p>
        </div>
      </div>
    </div>
  )
}

export default SentRequest
