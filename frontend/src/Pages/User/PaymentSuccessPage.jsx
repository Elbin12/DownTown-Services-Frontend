import React from 'react'
import Navbar from '../../Components/User/Navbar/Navbar'
import AcceptedService from '../../Components/Worker/AcceptedService/AcceptedService'
import Footer from '../../Components/User/Footer'

function PaymentSuccessPage() {
  return (
    <>
      <Navbar /> 
      <AcceptedService role={'user'}/>
      <Footer />
    </>
  )
}

export default PaymentSuccessPage
