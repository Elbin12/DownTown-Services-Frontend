import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseOutline } from "react-icons/io5";
import { api } from '../../axios';
import { IoCall } from "react-icons/io5";



function ChatDetails({ setChats, role, recipient_id, setIsChatOpen, user, setSelectedChatId={setSelectedChatId} }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userinfo = useSelector((state) => state.user.userinfo);
  const workerinfo = useSelector((state) => state.worker.workerinfo);
  const dispatch = useDispatch();

  console.log(userinfo, 'usserrrinfo')

  const sender_id = role === "user" ? userinfo?.id || "" : workerinfo?.id || "";

  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const url =
        role === "user"? `/chat/history/${userinfo?.id}/${user.id}/`: `worker/chat/history/${user.id}/${workerinfo?.id}/`;
      try {
        const response = await api.get(url);
        setMessages(response.data); 
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchMessages();
  }, [userinfo?.id, workerinfo?.id, role, user?.id]);

  const chatGroupId =
    role === "user"
      ? `${sender_id}/${user.id}`
      : `${user.id}/${sender_id}`;

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${role}/${chatGroupId}/`);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data);
      if(data.type === 'chat'){
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    return () => {
      socket.close();
    };
  }, [chatGroupId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const socket = new WebSocket(`ws://localhost:8000/ws/chat/${role}/${chatGroupId}/`);
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            message: newMessage,
            sender_type: role === "user" ? "user" : "worker",
          })
        );
        setNewMessage("");
      };
    }
  };
  console.log(messages, 'all messages,')

  const getRelativeDateLabel = (timestamp) => {
    const messageDate = new Date(timestamp);
    const now = new Date();
  
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    if (messageDate >= today) {
      return 'Today';
    } else if (messageDate >= yesterday) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
    }
  };
  

  return (
    <div className="fixed right-1/4 -mr-12 bottom-4 flex flex-col bg-white h-1/2 w-1/2 rounded-lg">
      <div className="py-2 px-4 flex items-center justify-between shadow border-b">
        <div className="flex items-center gap-2">
          <img src={user?.profile_pic} alt="" className="w-9 h-9 object-cover rounded-full" />
          <h1 className="text-lg">{user?.first_name}</h1>
        </div>
        <div className='flex gap-1 items-center'>
          <IoCall className='text-green-600'/>
          <p>{user?.mob}</p>
        </div>
        <IoCloseOutline className="text-2xl font-bold cursor-pointer" onClick={() => {setIsChatOpen(false); setSelectedChatId(null);}} />
      </div>

      <div className="flex-1 px-4 py-2 overflow-y-auto">
        {messages.map((msg, index) => {
          const dateObject = new Date(msg.timestamp);
          const time = new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', hour12: false }).format(dateObject);

          const currentLabel = getRelativeDateLabel(msg.timestamp);
          const previousLabel = index > 0 ? getRelativeDateLabel(messages[index - 1].timestamp) : null;
          return (
            <>
              {currentLabel !== previousLabel && (
                <div className="text-center text-sm text-gray-500 my-2">{currentLabel}</div>
              )}
              <div key={index} className={`flex ${msg.sender_type === role ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 px-3 py-0.5 my-0.5 text-sm rounded max-w-xs ${msg.sender_type === role? "bg-primary text-white": "bg-gray-200 text-black"}`}>
                  {msg.message}
                  <p className='text-[8px] pt-2'>{time}</p>
                </div>
              </div>
            </>
          )
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="bg-white w-full px-7 py-4 border-t flex items-center rounded-b-lg">
        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
          className="py-2 bg-amber-50 flex-grow outline-none px-2 rounded resize-none overflow-hidden" placeholder="Type your message..." rows="1"/>
        <button className={`rounded ml-5 px-3 py-1 ${newMessage?.trim() ? "bg-primary text-white" : "bg-gray-400 text-white cursor-not-allowed"}`}
          onClick={newMessage?.trim() ? sendMessage : null} disabled={!newMessage?.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatDetails;

