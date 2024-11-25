import React from 'react'
import Navbar from '../../Components/User/Navbar/Navbar'
import SecondNavbar from '../../Components/User/SecondNavbar/SecondNavbar'
import Orders from '../../Components/User/Orders'
import Footer from '../../Components/User/Footer'

function Orderspage() {
  return (
    <>
      <Navbar />
      <SecondNavbar role='user'/>  
      <Orders role="user" />
      <Footer />
    </>
  )
}

export default Orderspage