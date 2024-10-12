import React from 'react'

function SecondNavbar() {
  return (
    <div className='bg-[#ede9dc] z-10 justify-center mt-24 gap-9 fixed w-full flex flex-row text-[#4F4E4E] text-sm font-normal'>
        <h6 className='bg-[#dcce9b65] p-3 cursor-pointer'>Profile</h6>
        <h6 className='p-3 cursor-pointer'>Your Orders</h6>
        <h6 className='p-3 cursor-pointer'>Your Bookings</h6>
        <h6 className='p-3 cursor-pointer'>Wallet</h6>
        <h6 className='p-3 cursor-pointer'>Chat</h6>
    </div>
  )
}

export default SecondNavbar
