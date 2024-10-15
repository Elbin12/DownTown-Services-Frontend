import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../images/LOGO.png';
import { IoIosArrowDown } from "react-icons/io";
import { AiFillPauseCircle, AiOutlineUser } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setWorkerinfo } from '../../redux/worker';
import {api} from '../../axios'





function Navbar() {
  const workerinfo = useSelector(state=>state.worker.workerinfo)
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout  = async ()=>{
    const res = await api.post('worker/logout/')
    if(res.status == 205){
      dispatch(setWorkerinfo(''))
      navigate('/')
    }
  }

  return (
    <div className='flex justify-between w-full flex-column fixed top-0 z-10 bg-[#eff8f4] h-24 items-center px-5 sm:px-20 md:px-20'>
      <div className="logo cursor-pointer items-center flex gap-4" onClick={() => { navigate('/worker/dashboard/') }}>
        <img src={Logo} alt="Logo" />
      </div>

      <div className='flex w-1/2 items-center gap-4 justify-end'>
        <div className='md:flex hidden'>
          <div className='border-r cursor-pointer border-[#25252557] w-24 text-center h-6 flex items-center justify-center'>
            <h4 className='text-sm font-semibold'>Wallet</h4>
          </div>
          <div className='border-r cursor-pointer border-[#25252557] w-24 text-center h-6 flex items-center justify-center'>
            <h4 className='text-sm font-semibold'>Requests</h4>
          </div>
        </div>
        
        <div
          className='relative flex border  px-2 h-9 justify-center items-center rounded-sm cursor-pointer'
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
        >
          <div className='bg-green-400 w-6 h-6 rounded-full font-bold mr-1 text-white text-xs flex justify-center items-center'>
            <h4>{workerinfo?.first_name && workerinfo.first_name[0]}</h4>
          </div>
          <h1 className='font-semibold md:block hidden text-sm mr-3'>Hi, {workerinfo?.first_name}</h1>
          <IoIosArrowDown className='mt-1 md:block hidden' />

          {showPopup && (
            <div className='fixed top-[4.3rem] w-[23rem] bg-white shadow-sm flex flex-col rounded-lg border ' style={{left:'70%'}}>
              <div className='flex gap-4 hover:bg-blue-50 p-3' onClick={()=>{navigate('/worker/profile/')}}>
                <AiOutlineUser className='text-2xl'/>
                <div>
                  <h4 className='font-semibold text-sm'>My Profile</h4>
                  <p className='text-xs'>Manage your profile, login details and password</p>
                </div>
              </div>
              <div className='flex gap-4 hover:bg-blue-50 p-3'>
                <CiWallet className='text-2xl'/>
                <div>
                  <h4 className='font-semibold text-sm'>My Wallet</h4>
                  <p className='text-xs'>Use your wallet money to avail even greater discounts</p>
                </div>
              </div>
              <div className='flex gap-4 hover:bg-blue-50 p-3' onClick={logout}>
                <CiLogout className='text-2xl'/>
                <div>
                  <h4 className='font-semibold text-sm'>Sign Out</h4>
                  <p className='text-xs'>Log out from Downtown services</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <IoIosNotifications className='text-lg' />
      </div>
    </div>
  );
};

export default Navbar;
