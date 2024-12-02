import React from 'react'
import Navbar from '../../Components/User/Navbar/Navbar'
import SecondNavbar from '../../Components/User/SecondNavbar/SecondNavbar'
import Wallet from '../../Components/User/Wallet'
import Footer from '../../Components/User/Footer'

function WalletPage() {
  return (
    <>
      <Navbar />
      <SecondNavbar role="user"/>  
      <Wallet role="user" />  
      <Footer />
    </>
  )
}

export default WalletPage