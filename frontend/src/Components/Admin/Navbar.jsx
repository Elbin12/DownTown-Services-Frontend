import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../images/LOGO.png';

function Navbar() {

    const navigate = useNavigate();

  return (
    <div className='flex justify-between w-full flex-column bg-white h-24 items-center px-20'>
        <div className="logo cursor-pointer" onClick={()=>{navigate('/')}}>
          <img src={Logo} alt="" />
        </div>
    </div>
  )
}

export default Navbar
