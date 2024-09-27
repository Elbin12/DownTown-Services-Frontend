import React, { useEffect, useState } from 'react'
import { api } from '../../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserinfo } from '../../../redux/user';

function Login() {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userinfo = useSelector((state) => state.user.userinfo);

    useEffect(() => {
        console.log('useeffect', userinfo);
        if (userinfo.isAdmin === true) {
            console.log(userinfo.isAdmin, 'Admin access');
            navigate('/admin/');
        }
    }, [userinfo]);
    // console.log(userinfo.isAdmin, userinfo, 'lkjg');

    const handlesubmit = async()=>{
        var data = {email, password}
        try{
            const res = await api.post('login/', data)
            console.log(res, 'res')
            dispatch(setUserinfo(res.data))
            navigate('/admin/user-list/')
        }
        catch(err){
            console.log(err);
            
        }
    }
  return (
    <div className='w-full h-auto flex justify-center mt-14'>
      <div className='w-5/12 bg-white px-16 py-4 rounded-lg flex flex-col gap-20'>
        <div className='flex gap-1 items-center mt-4'>
            <h2 className='text-2xl text-[#504f4f] font-semibold'>Sign In</h2>
            <h4 className='text-xs pt-2.5 text-[#9A9A9A]'>To Admin</h4>
        </div>
        <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
                <h4 className='text-sm'>Email</h4>
                <input className='border rounded-lg w-3/4 h-10 focus:outline-none px-4' type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className='flex flex-col gap-1'>
                <h4 className='text-sm'>Password</h4>
                <input className='border rounded-lg w-3/4 h-10 focus:outline-none px-4' type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className='bg-blue-500 rounded-full w-3/4 h-10 flex justify-center items-center mb-20 cursor-pointer' onClick={handlesubmit}>
                <h4 className='text-white'>Sign In</h4>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
