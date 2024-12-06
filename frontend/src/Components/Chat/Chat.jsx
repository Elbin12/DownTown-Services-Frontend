import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RiArrowDownWideFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { api } from '../../axios';


function Chat({role, setIsChatOpen, setWorker}) {

    const userinfo = useSelector(state=>state.user.userinfo)
    const workerinfo = useSelector(state=>state.worker.workerinfo)
    const user = role === 'user'? userinfo : workerinfo
    
    const [chats, setChats] = useState();
    console.log(userinfo, 'uuuu');


    useEffect(()=>{
        const fetchChats = async()=>{
            const url = role ==='user'? 'chats/' : 'worker/chats/'
            try{
                const res = await api.get(url)
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
    
console.log(chats, 'cahaaa')
  return (
    <div className="fixed bottom-4 right-0 h-1/2 w-1/5 mr-10 bg-white shadow-lg rounded-lg">
        <div className='flex items-center justify-between px-9 py-2 border-b border-stone-300'>
            <img src={user.profile_pic} alt="" className='w-8 h-8 object-cover rounded-full'/>
            <h1 className='text-sm font-semibold'>Messaging</h1>
            <RiArrowDownWideFill className='text-2xl cursor-pointer'/>
        </div>
        <div className='flex bg-slate-100 border mx-4 my-1 items-center px-1 py-1 gap-1 rounded'>
            <CiSearch className='text-xl'/>
            <input type="search" placeholder='Search Messages' className='outline-none text-sm bg-transparent'/>
        </div>
        <div className='px-4'>
            {chats?.map((chat, index)=>{
                const dateObject = new Date(chat.timestamp);
                const time = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                    <div className='flex items-center gap-2 mb-1 cursor-pointer' onClick={()=>{setIsChatOpen(true); setWorker(role==='user'?chat.worker:chat.user)}}>
                        <img src={role === 'user' ?chat?.worker.profile_pic : chat?.user?.profile_pic} alt="" className='w-10 h-10 object-cover rounded-full'/>
                        <div className='border-b flex w-3/4 justify-between items-center py-2'>
                            <div>
                                <h1 className='text-sm'>{role === 'user' ?chat?.worker.first_name : chat?.user?.first_name}</h1>
                                <p className={`text-xs ${role === 'user'?chat.sender_type === 'user'? 'text-stone-500' :'font-bold':chat.sender_type === 'worker'? 'text-stone-500' :'font-bold'}`}>{chat.message}</p>
                            </div>
                            <p className='text-xs'>{time}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Chat
