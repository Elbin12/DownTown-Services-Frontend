import React from 'react'
import './Navbar.css'
import Logo from '../../../images/LOGO.png'
import Searchbar from '../../Searchbar/Searchbar'
import { MdOutlineArrowDropDown } from "react-icons/md";

function Navbar() {
  return (
    <div class='flex justify-between w-screen h-28 items-center pl-20 pr-20'>
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <Searchbar />
      <div className="login-button" class='p-4 h-14 items-center flex bg-gradient-to-r from-[#3E6990CC] to-[#3E6990] rounded-lg text-white'>
        <h4>Login or Create Account</h4>
      </div>
      <div className="location-button" class='p-4 flex items-center bg-[#E9E3B4] rounded-lg text-white gap-3'>
        <h4>KOCHI</h4>
        <MdOutlineArrowDropDown class='text-black'/>
      </div>
    </div>
  )
}

export default Navbar