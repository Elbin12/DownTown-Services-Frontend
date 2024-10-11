import React from 'react'
import Navbar from '../../Components/Worker/Navbar'
import Profile from '../../Components/User/Profile/Profile'

function ProfilePage() {
  return (
    <>
        <Navbar />
        <Profile role='worker'/>
    </>
  )
}

export default ProfilePage
