import React, { Fragment, useState } from 'react'
import Navbar from '../../Components/User/Navbar/Navbar'
import Signin from '../../Components/User/Signin/Signin'

function Homepage() {

  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = ()=>{
    if (showLogin){
      setShowLogin(false);
    }
    else{
      setShowLogin(true);
    }
  }
  console.log(showLogin)

  return (
    <Fragment>
        <Navbar onLoginClick={handleLoginClick}/>
        {showLogin && <Signin onLoginClick={handleLoginClick}/>}
    </Fragment>
  )
}

export default Homepage
