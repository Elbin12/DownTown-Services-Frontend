import React, { useEffect } from 'react'
import './Navbar.css'
import Logo from '../../../images/LOGO.png'
import Searchbar from '../../Searchbar/Searchbar'
import { MdOutlineArrowDropDown } from "react-icons/md";
import Signin from '../Signin/Signin';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { MdAccountCircle } from "react-icons/md";
import OTP from '../OTP/OTP';
import { setUserinfo } from '../../../redux/user';
import Location from '../Location';
import { useLoadScript } from "@react-google-maps/api";


function Navbar() {

  const userinfo = useSelector(state => state.user.userinfo);
  const anonymous_user_location = useSelector(state=>state.anonymous_user.locationDetails)
  const [activePopup, setActivePopup] = useState(null);
  const [input, setInput] = useState();
  const [location, setLocation] = useState(userinfo? userinfo.location:anonymous_user_location? anonymous_user_location.location:'');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userinfo, 'jjjj', anonymous_user_location);
  

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_LOCATION_API,
    libraries: ["places"],
  });

  useEffect(()=>{
    if (!location){
      setActivePopup('location');
    }
  })

  return (
    <>
      {activePopup=='login' && <Signin setActivePopup={setActivePopup} input={input} setInput={setInput}/>}
      {activePopup=='otp' && <OTP  setActivePopup={setActivePopup} input={input}/>}
      {activePopup=='location' && <Location role={'user'} location={location} setLocation={setLocation} setActivePopup={setActivePopup}/>}
      <div className='flex justify-between w-full flex-column bg-white h-24 items-center px-20 fixed top-0 z-20'>
        <div className="logo cursor-pointer" onClick={()=>{navigate('/')}}>
          <img src={Logo} alt="" />
        </div>
        <Searchbar />
        {!userinfo&&
          (<div className='login-button w-56 justify-center h-14 items-center flex bg-gradient-to-r from-[#3E6990CC] to-[#3E6990] rounded-lg text-white cursor-pointer' onClick={()=>{setActivePopup('login')}}>
            <h4>Login or Create Account</h4>
          </div>)
        }
        <div className='flex flex-row gap-6'>

        <div  className='location-button h-14 w-28 justify-center flex items-center bg-[#E9E3B4] rounded-lg text-white gap-3 cursor-pointer' onClick={()=>{setActivePopup('location')}}>
          <h4 className='text-[#313030] font-medium'>{location?.split(',')[0].slice(0,5)}</h4>
          <MdOutlineArrowDropDown className='text-black text-2xl'/>
        </div>
        {userinfo&&
          (
            <Link to='/profile/'>
            <div className='border h-14 flex items-center gap-1 px-2 rounded-lg border-[#d5d5d5] cursor-pointer'>
              <MdAccountCircle className='text-4xl' />
              <h6 className='text-[#303030]'>Hi, {userinfo.first_name? userinfo.first_name:'User'}</h6>
            </div>
            </Link>
          )
        }
        </div>
    </div>
  </>
  )
}

export default Navbar