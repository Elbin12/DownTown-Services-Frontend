import React, { Fragment, useState } from 'react'
import Navbar from '../../Components/User/Navbar/Navbar';
import Signin from '../../Components/User/Signin/Signin';
import OTP from '../../Components/User/OTP/OTP';
import Banner from '../../Components/User/Banner/Banner';
import TopServices from '../../Components/User/TopServices/TopServices';

function Homepage() {


  return (
    <Fragment>
      <Navbar />
      <Banner />
      <TopServices />
    </Fragment>
  )
}

export default Homepage
