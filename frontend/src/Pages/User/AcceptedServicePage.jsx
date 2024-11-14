import React from 'react'
import Navbar from '../../Components/User/Navbar/Navbar'
import AcceptedService from '../../Components/Worker/AcceptedService/AcceptedService'

function AcceptedServicePage() {
  return (
    <>
        <Navbar />
        <AcceptedService role={'user'}/>
    </>
  )
}

export default AcceptedServicePage
