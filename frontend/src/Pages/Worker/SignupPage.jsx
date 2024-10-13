import React, { useState } from 'react'
import Navbar from '../../Components/Worker/Navbar'
import SignUp from '../../Components/Worker/SignUp'

function SignupPage() {
  const [poputp, setPopup] = useState();
  return (
    <>
        <Navbar />
        <SignUp />
    </>
  )
}

export default SignupPage