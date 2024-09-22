import React from 'react'
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


function Navbar() {

  const [activePopup, setActivePopup] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userinfo = useSelector(state => state.user.userinfo);
  console.log(userinfo, 'jjjj');
  

  const logout = ()=>{
    api.post('logout/').then((res)=>{
      console.log(res);
      dispatch(setUserinfo(''))
    })
  }

  return (
    <div>
      {activePopup=='login' && <Signin setActivePopup={setActivePopup}/>}
      {activePopup=='otp' && <OTP setActivePopup={setActivePopup}/>}
      <div className='flex justify-between w-full flex-column bg-white h-24 items-center px-20'>
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

        <div  className='location-button h-14 w-28 justify-center flex items-center bg-[#E9E3B4] rounded-lg text-white gap-3 cursor-pointer'>
          <h4 className='text-[#313030] font-medium'>KOCHI</h4>
          <MdOutlineArrowDropDown className='text-black'/>
        </div>
        {userinfo&&<button onClick={logout}>LOGOUT</button>}
        {userinfo&&
          (
            <Link to='profile/'>
            <div className='border h-14 flex items-center gap-1 px-2 rounded-lg border-[#d5d5d5] cursor-pointer'>
              <MdAccountCircle className='text-4xl' />
              <h6 className='text-[#303030]'>Hi, {userinfo&& userinfo.first_name}</h6>
            </div>
            </Link>
          )
        }
        </div>
    </div>
  </div>
  )
}

export default Navbar