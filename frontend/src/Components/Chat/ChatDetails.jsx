import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IoCloseOutline } from "react-icons/io5";
import { api } from '../../axios';

function ChatDetails({ role, recipient_id, setIsChatOpen, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userinfo = useSelector((state) => state.user.userinfo);
  const workerinfo = useSelector((state) => state.worker.workerinfo);

  console.log(userinfo, 'usserrrinfo')

  const sender_id = role === "user" ? userinfo?.id || "" : workerinfo?.id || "";

  useEffect(() => {
    // Fetch initial chat history
    const fetchMessages = async () => {
      const url =
        role === "user"
          ? `/chat/history/${userinfo?.id}/${user.id}/`
          : `worker/chat/history/${user.id}/${workerinfo?.id}/`;
      try {
        const response = await api.get(url);
        setMessages(response.data); // Assuming response data is an array of messages
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
    // Initialize WebSocket
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${role}/${chatGroupId}/`);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received:", data.message, data);
      if(data.type === 'chat'){
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
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

  return (
    <div className="fixed right-1/4 bottom-4 flex flex-col bg-white h-1/2 w-1/2 rounded-lg">
      {/* Chat Header */}
      <div className="py-2 px-4 flex items-center justify-between shadow border-b">
        <div className="flex items-center gap-2">
          <img
            src={user?.profile_pic}
            alt=""
            className="w-9 h-9 object-cover rounded-full"
          />
          <h1 className="text-lg">{user?.first_name}</h1>
        </div>
        <IoCloseOutline
          className="text-2xl font-bold cursor-pointer"
          onClick={() => setIsChatOpen(false)}
        />
      </div>

      {/* Chat Body */}
      <div className="flex-1 px-4 py-2 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender_type === role ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 my-1 rounded-md max-w-xs ${
                msg.sender_type === role
                  ? "bg-blue-400 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="bg-white w-full px-7 py-2 border-t flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="h-10 bg-amber-50 flex-grow outline-none px-2 rounded"
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-400 text-white rounded ml-5 px-3 py-1"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatDetails;

