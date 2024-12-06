import React, { useState } from 'react'
import Navbar from '../../Components/Worker/Navbar'
import Dashboard from '../../Components/Worker/Dashboard'
import Chat from '../../Components/Chat/Chat'
import ChatDetails from '../../Components/Chat/ChatDetails'

function HomePage() {

  const [isChatOpen, setIsChatOpen] = useState();
  const [recipient_id, setRecipient_id] = useState();
  const [user, setUser] = useState();

  return (
    <>
        < Navbar />
        < Dashboard />
        <Chat role='worker' setIsChatOpen={setIsChatOpen} setWorker={setUser}/>
        {isChatOpen&&
          <ChatDetails role='worker' recipient_id={recipient_id} setIsChatOpen={setIsChatOpen} user={user}/>
        }
    </>
  )
}

export default HomePage
