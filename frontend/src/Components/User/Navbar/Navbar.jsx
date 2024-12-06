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
import { IoIosNotifications } from 'react-icons/io';


function Navbar({setIsChatOpen, setWorker}) {

  const userinfo = useSelector(state => state.user.userinfo);
  const anonymous_user_location = useSelector(state=>state.anonymous_user.locationDetails)
  const [activePopup, setActivePopup] = useState(null);
  const [input, setInput] = useState();
  const [location, setLocation] = useState(userinfo? userinfo.location:anonymous_user_location? anonymous_user_location.location:'');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

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

  const socket = new WebSocket(`ws://localhost:8000/ws/notification/${userinfo.id}/`);

  useEffect(()=>{
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data, 'dadada')
      console.log("Notification received:", data.notification, data);
      setNotifications((prevNotifications) => [...prevNotifications, data.notification]);
    };
  }, [])
  

  socket.onopen = function () {
      console.log("WebSocket connection opened");
  };

  socket.onclose = function () {
      console.log("WebSocket connection closed");
  };

  const sendMessage = ()=>{
      socket.send(JSON.stringify({
        message: "Hello, Worker!",
    }));
  }


  console.log(notifications, 'notifications from state')
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
        <div className='flex flex-row items-center gap-6'>
          <div  className='location-button h-14 w-28 justify-center flex items-center bg-[#E9E3B4] rounded-lg text-white gap-3 cursor-pointer' onClick={()=>{setActivePopup('location')}}>
            <h4 className='text-[#313030] font-medium'>{location?.split(',')[0].slice(0,5)}</h4>
            <MdOutlineArrowDropDown className='text-black text-2xl'/>
          </div>
          {userinfo&&
            (
              <Link to='/profile/'>
              <div className='border h-14 flex items-center gap-1 px-2 rounded-lg border-[#d5d5d5] cursor-pointer'>
                {userinfo?.profile_pic?
                  <img src={userinfo?.profile_pic} alt="" className='w-8 h-8 rounded-full object-cover'/>
                  :
                  <MdAccountCircle className='text-4xl' />
                }
                <h6 className='text-[#303030]'>Hi, {userinfo.first_name? userinfo.first_name:'User'}</h6>
              </div>
              </Link>
            )
          }
          {userinfo&&
          <>
            <div className="relative flex">
              <IoIosNotifications className="text-xl cursor-pointer" onClick={()=>{setShowNotifications(showNotifications === true? false : true)}}/>
              {notifications?.length > 0 && (
                <span className="absolute top-0 right-0 bg-slate-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2">
                  {notifications.length}
                </span>
              )}
            </div>
            {showNotifications && (
              <div className='fixed top-[4.3rem] w-[23rem] z-20 bg-white shadow-sm flex flex-col rounded-lg border ' style={{left:'70%'}}>
                {notifications?.map((notification, index)=>(
                  <div key={index} className='flex gap-4 hover:bg-blue-50 p-3' onClick={()=>{setIsChatOpen(true); setWorker(notification.sender)}}>
                    <img src={notification?.sender?.profile_pic} alt="" className='w-9 h-9 object-cover rounded-full'/>
                    <div>
                      <h4 className='font-semibold text-sm'>{notification.sender?.first_name}</h4>
                      <p className='text-xs'>{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        }
        </div>
    </div>
  </>
  )
}

export default Navbar