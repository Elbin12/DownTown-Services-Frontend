import React, { Fragment, useState } from 'react'
import Navbar from '../../Components/User/Navbar/Navbar';
import Signin from '../../Components/User/Signin/Signin';
import OTP from '../../Components/User/OTP/OTP';
import Banner from '../../Components/User/Banner/Banner';
import TopServices from '../../Components/User/TopServices/TopServices';

function Homepage() {

  const [activePopup, setActivePopup] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showOTP, setshowOTP] = useState(false);


  return (
    <Fragment>
      {activePopup=='login' && <Signin setActivePopup={setActivePopup}/>}
      {activePopup=='otp' && <OTP setActivePopup={setActivePopup}/>}
      <Navbar setActivePopup={setActivePopup}/>
      <Banner />
      <TopServices />
    </Fragment>
  )
}

export default Homepage
