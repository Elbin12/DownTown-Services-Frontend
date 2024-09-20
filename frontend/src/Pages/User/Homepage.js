import React, { Fragment, useState } from 'react'
import Navbar from '../../Components/User/Navbar/Navbar';
import Signin from '../../Components/User/Signin/Signin';
import OTP from '../../Components/User/OTP/OTP';

function Homepage() {

  const [activePopup, setActivePopup] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showOTP, setshowOTP] = useState(false);


  return (
    <Fragment>
      {activePopup=='login' && <Signin setActivePopup={setActivePopup}/>}
      {activePopup=='otp' && <OTP setActivePopup={setActivePopup}/>}
      <Navbar setActivePopup={setActivePopup}/>
    </Fragment>
  )
}

export default Homepage
