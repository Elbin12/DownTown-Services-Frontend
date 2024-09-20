import React from 'react'
import './Navbar.css'
import Logo from '../../../images/LOGO.png'
import Searchbar from '../../Searchbar/Searchbar'
import { MdOutlineArrowDropDown } from "react-icons/md";


function Navbar({onLoginClick}) {
  return (
    <div class='flex justify-between w-screen bg-white h-28 items-center pl-20 pr-20'>
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <Searchbar />
      <div className="login-button" class='w-56 justify-center h-14 items-center flex bg-gradient-to-r from-[#3E6990CC] to-[#3E6990] rounded-lg text-white cursor-pointer' onClick={onLoginClick}>
        <h4>Login or Create Account</h4>
      </div>
      <div className="location-button" class='h-14 w-28 justify-center flex items-center bg-[#E9E3B4] rounded-lg text-white gap-3'>
        <h4>KOCHI</h4>
        <MdOutlineArrowDropDown class='text-black'/>
      </div>
    </div>
  )
}

export default Navbar