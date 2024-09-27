import React from 'react'
import Logo from '../../images/LOGO.png';
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";

function Sidebar() {
  return (
    <div className='w-1/6 h-screen flex-col justify-center bg-[#CEE7E6]'>
      <div className='p-6'>
        <img src={Logo} alt="" />
      </div>
      <div className='w-full h-[1px] bg-black border border-dotted'></div>
      <div className='flex flex-col gap-6 items-center mt-11'>
        <div className='flex items-center gap-1 w-8/12 bg-[#BACBDF] py-4 pl-4 justify-start'>
            <MdSpaceDashboard />
            <li className='list-none '>Dashboard</li>
        </div>
        <div className='flex items-center gap-1 w-8/12 pl-4 justify-start'>
            <PiUsersThree />
            <li className='list-none '>Users</li>
        </div>
        <div className='flex items-center gap-1 w-8/12 pl-4 justify-start'>
            <FaUsers />
            <li className='list-none '>Workers</li>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
