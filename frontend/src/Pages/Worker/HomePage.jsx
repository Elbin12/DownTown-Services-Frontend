import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Worker/Navbar'
import Dashboard from '../../Components/Worker/Dashboard'
import Chat from '../../Components/Chat/Chat'
import ChatDetails from '../../Components/Chat/ChatDetails'
import { api } from '../../axios'

function HomePage() {

  const [isChatOpen, setIsChatOpen] = useState();
  const [recipient_id, setRecipient_id] = useState();
  const [user, setUser] = useState();
  const [selectedChatId, setSelectedChatId] = useState(null);

  const [chats, setChats] = useState();

  useEffect(()=>{
    const fetchChats = async()=>{
        try{
            const res = await api.get('worker/chats/')
            if (res.status===200){
                console.log(res.data, 'chatsss dataaas')
                setChats(res.data)
            }
        }catch(err){
            console.log(err, 'errr')
        }
    }
    fetchChats();
}, [])

  return (
    <>
        < Navbar setChats={setChats}/>
        < Dashboard />
        <Chat chats={chats} role='worker' setIsChatOpen={setIsChatOpen} setWorker={setUser} selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId}/>
        {isChatOpen&&
          <ChatDetails setChats={setChats} role='worker' recipient_id={recipient_id} setIsChatOpen={setIsChatOpen} user={user} setSelectedChatId={setSelectedChatId}  />
        }
    </>
  )
}

export default HomePage
