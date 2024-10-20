import React from 'react'

function Location() {
  return (
    <div className='fixed bg-[#7e7e7e90] w-full h-screen flex justify-center min-h-screen items-center p-5 top-0 z-30'>
        <div className='bg-white w-3/5 h-3/5 flex flex-col justify-around items-center'>
            <h1>SELECT YOUR CITY TO CONTINUE</h1>
            <div className='border px-24 py-2 rounded-lg'>
                <input type="text" placeholder='Search Your City'/>
            </div>
            <div>
                <h2>POPULAR CITIES</h2>
                <div>
                    <div>
                        <img src="" alt="" />
                        <h4>Chennai</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Location
