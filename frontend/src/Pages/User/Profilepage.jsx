import React from 'react'
import Profile from '../../Components/User/Profile/Profile'
import Navbar from '../../Components/User/Navbar/Navbar'
import SecondNavbar from '../../Components/User/SecondNavbar/SecondNavbar'

function Profilepage() {
  return (
    <>
      <Navbar />
      <SecondNavbar />
      <Profile role='user'/>
    </>
  )
}

export default Profilepage
