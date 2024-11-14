import React from 'react'
import Navbar from '../../Components/Worker/Navbar';
import AcceptedService from '../../Components/Worker/AcceptedService/AcceptedService';

function AcceptedServicePage() {
  return (
    <>
        <Navbar />
        <AcceptedService role={'worker'}/>
    </>
  )
}

export default AcceptedServicePage
