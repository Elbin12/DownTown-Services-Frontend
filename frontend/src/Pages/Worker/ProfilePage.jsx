import React from 'react'
import Navbar from '../../Components/Worker/Navbar'
import Profile from '../../Components/User/Profile/Profile'
import SecondNavbar from '../../Components/User/SecondNavbar/SecondNavbar'

function ProfilePage() {
  return (
    <>
        <Navbar />
        <SecondNavbar role='worker'/>
        <Profile role='worker'/>
    </>
  )
}

export default ProfilePage
