import React, { Fragment, useState } from 'react'
import Navbar from '../../Components/User/Navbar/Navbar';
import Signin from '../../Components/User/Signin/Signin';
import OTP from '../../Components/User/OTP/OTP';
import Banner from '../../Components/User/Banner/Banner';
import TopServices from '../../Components/User/TopServices/TopServices';
import Footer from '../../Components/User/Footer';

import { Toaster, toast } from 'sonner'
import Chat from '../../Components/Chat/Chat';
import ChatDetails from '../../Components/Chat/ChatDetails';


function Homepage() {

  const [isChatOpen, setIsChatOpen] = useState();
  const [recipient_id, setRecipient_id] = useState();
  const [worker, setWorker] = useState();

  return (
    <Fragment>
      <Navbar setIsChatOpen={setIsChatOpen} setWorker={setWorker}/>
      <Banner />
      <TopServices />
      <Chat role='user' setIsChatOpen={setIsChatOpen} setWorker={setWorker}/>
      {isChatOpen&&
        <ChatDetails role='user' setIsChatOpen={setIsChatOpen} recipient_id={recipient_id} user={worker}/>
      }
      <Footer />
    </Fragment>
  )
}

export default Homepage
