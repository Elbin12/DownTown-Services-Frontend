import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../../Components/User/Navbar/Navbar';
import Signin from '../../Components/User/Signin/Signin';
import OTP from '../../Components/User/OTP/OTP';
import Banner from '../../Components/User/Banner/Banner';
import TopServices from '../../Components/User/TopServices/TopServices';
import Footer from '../../Components/User/Footer';

import { Toaster, toast } from 'sonner'
import Chat from '../../Components/Chat/Chat';
import ChatDetails from '../../Components/Chat/ChatDetails';
import { api } from '../../axios';
import { useSelector } from 'react-redux';


function Homepage() {

  const [isChatOpen, setIsChatOpen] = useState();
  const [recipient_id, setRecipient_id] = useState();
  const [worker, setWorker] = useState();

  const [chats, setChats] = useState();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const userinfo = useSelector(state=>state.user.userinfo)
  useEffect(()=>{
    const fetchChats = async()=>{
        try{
            const res = await api.get('chats/')
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
    <Fragment>
      <Navbar setChats={setChats} setIsChatOpen={setIsChatOpen} setWorker={setWorker}/>
      <Banner />
      <TopServices />
      {userinfo && 
        <Chat role='user' chats={chats} setIsChatOpen={setIsChatOpen} setWorker={setWorker} selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId}/>
      }
      {isChatOpen&&
        <ChatDetails setChats={setChats} role='user' setIsChatOpen={setIsChatOpen} recipient_id={recipient_id} user={worker} setSelectedChatId={setSelectedChatId}/>
      }
      <Footer />
    </Fragment>
  )
}

export default Homepage
