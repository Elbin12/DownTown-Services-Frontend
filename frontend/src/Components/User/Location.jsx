import React from 'react';
import benglaru from '../../images/locations/benglaru.png';
import kochi from '../../images/locations/kochi.png';
import mumbai from '../../images/locations/mumbai.png';
import delhi from '../../images/locations/delhi.png';
import kolkata from '../../images/locations/kolkata.png';
import chennai from '../../images/locations/chennai.png';


function Location({setActivePopup}) {
  return (
    <div className='fixed bg-[#7e7e7e90] w-full h-screen flex justify-center min-h-screen items-center p-5 top-0 z-30' onClick={()=>{setActivePopup('')}}>
        <div className='bg-white w-3/5 py-9 flex flex-col justify-around gap-9 items-center' onClick={(e)=>e.stopPropagation()}>
            <h1 className='font-semibold'>SELECT YOUR CITY TO CONTINUE</h1>
            <div className='border w-1/2 py-2 rounded-lg'>
                <input type="text" className='outline-none w-full text-center' placeholder='Search Your City'/>
            </div>
            <div className='flex flex-col text-center px-36 gap-9'>
                <h2 className='font-semibold'>POPULAR CITIES</h2>
                <div className='flex gap-x-20 gap-y-6 justify-center flex-wrap'>
                    <div className='cursor-pointer'>
                        <img src={benglaru} alt="" />
                        <h4>Benglaru</h4>
                    </div>
                    <div className='cursor-pointer'>
                        <img src={kochi} alt="" />
                        <h4>Kochi</h4>
                    </div>
                    <div className='cursor-pointer'>
                        <img src={mumbai} alt="" />
                        <h4>Mumbai</h4>
                    </div>
                    <div className='cursor-pointer'>
                        <img src={delhi} alt="" />
                        <h4>Delhi NCR</h4>
                    </div>
                    <div className='cursor-pointer'>
                        <img src={kolkata} alt="" />
                        <h4>Kolkata</h4>
                    </div>
                    <div className='cursor-pointer'>
                        <img src={chennai} alt="" />
                        <h4>Chennai</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Location
