import React from 'react'
import Navbar from '../../Components/User/Navbar/Navbar'
import SecondNavbar from '../../Components/User/SecondNavbar/SecondNavbar'
import Orders from '../../Components/User/Orders'

function Orderspage() {
  return (
    <>
      <Navbar />
      <SecondNavbar role='user'/>  
      <Orders role="user" />
    </>
  )
}

export default Orderspage
