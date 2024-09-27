import React, { useRef, useState } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import { BsFillCameraFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendar } from "react-icons/fa";
import AddMobile from './AddMobile';
import { api, BASE_URL } from '../../../axios';
import { setUserinfo } from '../../../redux/user';

import { FaEdit } from "react-icons/fa";

function Profile() {

  const fileuploadRef = useRef();
  const [img, setImg] = useState(null);
  
  const [activePopup, setActivePopup] = useState(false);
  
  
  const userinfo = useSelector(state=>state.user.userinfo)
  console.log(userinfo, 'userrrrr');
  

  const [first_name, setFirst_name] = useState(userinfo ? userinfo.first_name : '');
  const [last_name, setLast_name] = useState(userinfo ? userinfo.last_name : '');
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();
  const [first_name_err, setFirst_name_Error] = useState('');
  const [pic, setPic] = useState();

  const dispatch = useDispatch();

  
  
  const imageUpload = ()=>{
    setActivePopup(true)
    fileuploadRef.current.click()
  }

  const uploadImageDisplay = (e) => {
    console.log(e, 'Event object from uploadImageDisplay');

    console.log((e.target.files[0], 'from function'));
    
    const uploadedFile = e.target.files[0]
    console.log(uploadedFile, 'file uploaded');
    
    if (uploadedFile){
      setPic(uploadedFile)
      const cachedURL = URL.createObjectURL(uploadedFile);
      setImg(cachedURL );
      console.log(cachedURL, 'cached');
      
    }
}
  console.log(img, 'img');
  
  const handlefirst_name = (e)=>{
    setActivePopup(true)
    setFirst_name(e.target.value)
    if (e.target.value == userinfo.first_name){
      setActivePopup(false)
    }
  }

  const handleimg = ()=>{
    setActivePopup(true)
  }

  const handlesubmit = async()=>{
    let data = {
      first_name,
      last_name,
      dob,
      gender,
      profile_pic:pic
    }
    try{
      const res = await api.post('profile/', data,{
        headers: {
          'Content-Type': 'multipart/form-data'  // Necessary for file uploads
        }
      })
      console.log(res, 'res', res.data);
      dispatch(setUserinfo(res.data))
    }catch(err){
      console.log(err);
    } 
  }

  return (
    <div>
      <div className='bg-white h-96 mx-[20rem] rounded-lg'>
      <div className='bg-[#233e56d2] h-20 my-11 rounded-t-lg'>
        <div className='flex items-center gap-4 py-8 px-16'>
          <div className='flex flex-col items-center justify-center bg-white rounded-full w-[6rem] h-[6rem] drop-shadow-lg overflow-hidden' onClick={imageUpload}>

            {img? <img src={img?img:''} alt="" className='object-cover kkk w-full h-full p-[2px] rounded-full'/>
            : (userinfo?.profile_pic&&<img src={userinfo.profile_pic?`${BASE_URL}${userinfo.profile_pic}`:''} alt="" className='object-cover jjj w-full h-full p-[2px] rounded-full'/>)}
            {/* {userinfo?.profile_pic?
            <img src={userinfo.profile_pic?userinfo.profile_pic:''} alt="" className='object-cover w-full h-full p-[2px] rounded-full'/>
            :(img&&<img src={img} alt="" className='object-cover w-full hh h-full p-[2px] rounded-full' />)} */}
            
            <input type="file" ref={fileuploadRef} id="file" hidden accept="image/*" onChange={uploadImageDisplay} />
            {!userinfo?.profile_pic && !img&&(<>
            <BsFillCameraFill onClick={handleimg} className='text-3xl opacity-30'/>
            <h5 className='text-[9px] opacity-80' onClick={handleimg}>+ Add</h5>
            </>)}
            {(img || userinfo?.profile_pic) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <FaEdit />
                </div>
            )}
          </div>
          <h6 className='text-lg pb-6 text-white font-semibold'>Hi, {userinfo?.first_name? userinfo.first_name:'Guest'}</h6>
        </div>
        <div className='px-16'>
          <h1 className='text-lg font-semibold text-[#434343]'>Account Details</h1>
          <div className='px-1 py-6 gap-9 flex flex-col'>
            <div className='flex justify-between text-sm'>
              <h6>Email Address</h6>
              <div className='flex'>
                <h6 className='mr-4'>{userinfo&& userinfo.email}</h6>
                <h6>Veified</h6>
              </div>
              <div className='flex gap-3 items-center'>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div>
            </div>
            <div className='flex justify-between text-sm items-center'>
              <h6>Mobile Number</h6>
              <div className='flex'>
                <h6 className='mr-4'>{userinfo&& userinfo?.mobile}</h6>
                <h6>{userinfo?.mobile}</h6>
                {!userinfo?.mobile&&<AddMobile />}
              </div>
              {userinfo?.mobile&&(<div className='flex gap-3 items-center'>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='bg-white h-96 mx-[20rem] mb-9 my-3 rounded-lg'>
      <div className='px-16 gap-9 flex flex-col py-9'>
        <h1 className='text-lg font-semibold text-[#434343]'>Personal Details</h1>
        <div className='flex flex-col gap-6 text-sm px-1'>
          <div className='flex justify-between items-center'>
            <h6>First Name</h6>
            <div className='flex flex-col w-1/2'>
              <input type="text" className='border h-9 w-full rounded-lg border-gray px-6 focus:border-[#3E6990] focus:outline-none focus:ring-0' value={first_name} onChange={handlefirst_name}/>
              <p className='text-red-500 text-xs'>{first_name_err}</p>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <h6>Last Name</h6>
            <input type="text" className='border h-9 w-1/2 rounded-lg border-gray px-6 focus:border-[#3E6990] focus:outline-none focus:ring-0' value={last_name} onChange={(e)=>{setLast_name(e.target.value)}}/>
          </div>
          <div className='flex justify-between items-center'>
            <h6>Birthday (Optional)</h6>
            <input type="date" value={dob?dob:userinfo?.dob} className='border h-9 w-1/2 rounded-lg border-gray px-6 focus:border-[#3E6990] focus:outline-none focus:ring-0' onChange={(e)=>{setDob(e.target.value)}}/>
          </div>
          <div className='flex justify-between items-center'>
            <h6>Gender (Optional)</h6>
            <div className='flex w-1/2 gap-9'>
              <button className={`border py-3 px-4 rounded-lg ${(gender? gender === 'Woman': userinfo?.gender == 'Woman')&&'bg-[#3d6b94da] text-white'}`} onClick={()=>{
                setGender('Woman')
                setActivePopup(true)
              }}>Woman</button>
              <button className={`border py-3 px-4 rounded-lg ${(gender? gender === 'Man': userinfo?.gender == 'Man') && 'bg-[#3d6b94da] text-white'}`} onClick={()=>{
                setGender('Man') 
                setActivePopup(true)}}>Man</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {activePopup&&(<div className='fixed flex justify-center items-center bottom-0 w-full bg-white h-20 z-10'>
      <button className='border h-11 w-1/2 rounded-lg text-white bg-[#3d6b94da]' onClick={handlesubmit}>Save Changes</button>
    </div>)}
    </div>
  )
}

export default Profile