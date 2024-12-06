import React, { useState } from 'react'
import ServiceDetail from '../../Components/User/ServiceDetail'
import Navbar from '../../Components/User/Navbar/Navbar'
import Footer from '../../Components/User/Footer'
import Chat from '../../Components/Chat/Chat';
import ChatDetails from '../../Components/Chat/ChatDetails';

function ServiceDetailsPage() {

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [recipient_id, setRecipient_id] = useState('');
  const [worker, setWorker] = useState();

  return (
    <>
        <Navbar />
        <ServiceDetail setIsChatOpen={setIsChatOpen} setRecipient_id={setRecipient_id} setWorker={setWorker}/>
        {isChatOpen&&
          <ChatDetails role='user' recipient_id={recipient_id} setIsChatOpen={setIsChatOpen} user={worker}/>
        }
        <Footer />
    </>
  )
}

export default ServiceDetailsPage
