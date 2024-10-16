import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import { BsFillCameraFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendar } from "react-icons/fa";
import AddMobile from './AddMobile';
import MobilePopup from '../AddMobile';
import { api, BASE_URL } from '../../../axios';
import  { setUserinfo } from '../../../redux/user';
import {setWorkerinfo} from '../../../redux/worker';

import { FaEdit } from "react-icons/fa";

import { Toaster, toast } from 'sonner';
import EditEmail from '../EditEmail';
import OTP from '../OTP/OTP';
import { useNavigate } from 'react-router-dom';


function Profile({role}) {

  const fileuploadRef = useRef();
  const [img, setImg] = useState(null);
  
  const [activePopup, setActivePopup] = useState('');
  
  const userinfo = useSelector(state=>state.user.userinfo)
  const workerinfo = useSelector(state=>state.worker.workerinfo)

  console.log(userinfo, 'userrrrr');
  const [first_name, setFirst_name] = useState(()=>{
    if (role === 'user') {
      return userinfo ? userinfo.first_name === null ?'': userinfo.first_name : '';
    } else if (role === 'worker') {
      return workerinfo ? workerinfo.first_name === null ?'': workerinfo.first_name : '';
    }
    return '';  
  });
  const [last_name, setLast_name] = useState(() => {
    if (role === 'user') {
      return userinfo ? userinfo.last_name === null ?'': userinfo.last_name : '';
    } else if (role === 'worker') {
      return workerinfo ? workerinfo.last_name === null ?'': workerinfo.last_name : '';
    }
    return '';
  });
  const [dob, setDob] = useState(()=>{
    if (role === 'user') {
      return userinfo && userinfo.dob;
    } else if (role === 'worker') {
      return workerinfo && workerinfo.dob ;
    }
    return '';
  });
  const [gender, setGender] = useState();
  const [mob, setMob] = useState(()=>{
    if (role === 'user') {
      return userinfo ? userinfo.mob === null ?'': userinfo.mob : '';
    } else if (role === 'worker') {
      return workerinfo ? workerinfo.mob === null ?'': workerinfo.mob : '';
    }
    return '';
  });

  const [email, setEmail] = useState();

  const [mobErr, setMobErr] = useState('');
  const [first_name_err, setFirst_name_Error] = useState('');
  const [picerr, setPicErr] = useState('');
  const [pic, setPic] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();


  
  const imageUpload = ()=>{
    setActivePopup('save')
    fileuploadRef.current.click()
  }

  const uploadImageDisplay = (e) => {
    const uploadedFile = e.target.files[0]
    
    if (uploadedFile){
      setPic(uploadedFile)
      const cachedURL = URL.createObjectURL(uploadedFile);
      setImg(cachedURL );    
      setPicErr('');
    }
}
  console.log(img, 'img', pic);
  
  const handlefirst_name = (e)=>{
    setActivePopup('save')
    setFirst_name(e.target.value)
    setFirst_name_Error('');
  }

  const handleimg = ()=>{
    setActivePopup('save')
  }

  const handlesubmit = async()=>{
    console.log(first_name, last_name, 'woooo');
    

    if (role==='user'){
      if (!img && !userinfo?.profile_pic){
        setPicErr('Profile image is Required')
        return
      }
  
      if (first_name.trim() === ''){
        setFirst_name_Error('First Name is Required')
        return
      }

        let data = {
          first_name,
          last_name,
          dob,
          gender,
          profile_pic:pic,
          mob
        }
        console.log(data, 'ddd');
        
        try{
          const res = await api.post('profile/', data,{
            headers: {
              'Content-Type': 'multipart/form-data'  
            }
          })
          console.log('res', res.data);
          dispatch(setUserinfo(res.data))
          setActivePopup('');
          toast.success('Profile Updated Successfully')
        }catch(err){
          if (err.status===401){
            navigate('/')
            toast.error(err.response.data.message)
          }
          console.log(err.response.data, 'lll');
          setMobErr(err.response.data.mob)     
        } 
      }else if(role=='worker'){
        if (!img && !workerinfo?.profile_pic){
          setPicErr('Profile image is Required')
          return
        }
    
        if (first_name.trim() === ''){
          setFirst_name_Error('First Name is Required')
          return
        }
        let data = {
          first_name,
          last_name,
          dob,
          gender,
          profile_pic:pic,
          mob
        }
        console.log(data, 'ddd');
        
        try{
          const res = await api.post('worker/profile/', data,{
            headers: {
              'Content-Type': 'multipart/form-data' 
            }
          })
          console.log('res', res.data);
          dispatch(setWorkerinfo(res.data))
          setActivePopup('');
          toast.success('Profile Updated Successfully')
        }catch(err){
          if (err.status===401){
            navigate('/')
            toast.error(err.response.message)
          }
          console.log(err.response.data, 'lll');
          setMobErr(err.response.data.mob)
          console.log(err.response.data.mob, 'lll');
        }
      }
    }

  

  return (
    <div className='pt-[10rem]'>
      <div className='bg-white h-96 mx-auto  sm:mx-[5rem] lg:mx-[15rem] xl:mx-[20rem] justify-center flex sm:rounded-lg'>
        {activePopup=='mobAdd' && < MobilePopup role={'Add'} setActivePopup={setActivePopup} mob={mob} setMob={setMob}/>}
        {activePopup=='mobEdit' && < MobilePopup role={'Edit'} setActivePopup={setActivePopup} mob={mob} setMob={setMob}/>}
        {activePopup=='emailEdit' && < EditEmail setActivePopup={setActivePopup} setEmail={setEmail}/>}
        {activePopup=='otp' && < OTP input={email} setActivePopup={setActivePopup} from={'profile'}/>}
      <div className='bg-[#233e56d2] h-14 sm:h-16  md:h-20 sm:rounded-t-lg w-full'>
        <div className='flex items-center gap-4 py-6 px-4 sm:px-16'>
          <div className='flex flex-col'>
            <div className='flex flex-col items-center justify-center w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem] bg-white rounded-full md:w-[6rem] md:h-[6rem] drop-shadow-lg overflow-hidden' onClick={imageUpload}>
              {img? <img src={img?img:''} alt="" className='object-cover kkk w-full h-full p-[2px] rounded-full'/>
              : (role=='user'? userinfo?.profile_pic&&<img src={userinfo.profile_pic?`${BASE_URL}${userinfo.profile_pic}`:''} alt="" className='object-cover jjj w-full h-full p-[2px] rounded-full'/>
                : workerinfo?.profile_pic&&<img src={workerinfo.profile_pic?`${BASE_URL}${workerinfo.profile_pic}`:''} alt="" className='object-cover jjj w-full h-full p-[2px] rounded-full'/>
              )}

              <input type="file" ref={fileuploadRef} id="file" hidden accept="image/*" onChange={uploadImageDisplay} />
              {role==='user'?
                !userinfo?.profile_pic && !img&&(<>
                <BsFillCameraFill onClick={handleimg} className='text-3xl opacity-30'/>
                <h5 className='text-[9px] opacity-80' onClick={handleimg}>+ Add</h5>
                </>):
                !workerinfo?.profile_pic && !img&&(<>
                  <BsFillCameraFill onClick={handleimg} className='text-3xl opacity-30'/>
                  <h5 className='text-[9px] opacity-80' onClick={handleimg}>+ Add</h5>
                  </>)
              }
              {role=='user'?
                (img || userinfo?.profile_pic) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <FaEdit />
                  </div>
                ):
                (img || workerinfo?.profile_pic) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <FaEdit />
                    </div>
                )
              }
            </div>
            <p className='text-red-500 text-xs'>{picerr}</p>
          </div>
          <h6 className='text-xs pb-2 sm:text-sm sm:pb-3 md:text-lg md:pb-6 text-white font-semibold'>Hi,{role==='user'?userinfo?.first_name? userinfo.first_name:'User':workerinfo?.first_name? workerinfo.first_name:'User' }</h6>
        </div>
        <div className='px-4 sm:px-16'>
          <h1 className='text-xs md:text-lg font-semibold text-[#434343]'>Account Details</h1>
          <div className='px-1 py-6 gap-9 flex flex-col'>
            <div className='flex  text-sm'>
            <span className='w-1/3 text-xs md:text-sm block md:hidden'>Email</span>
            <span className='w-1/3 text-xs md:text-sm hidden md:block'>Email Address</span>
              <div className='flex w-full text-xs md:text-sm'>
                <h6 className='mr-4'>{role=='user'?userinfo&& userinfo.email:workerinfo&& workerinfo.email}</h6>
                <h6 className='bg-[#aef3b5ba] px-4 items-center flex'>Verified</h6>
              </div>
              {role=='user'?
              userinfo?.email&&(<div className='flex gap-3 items-center cursor-pointer text-xs md:text-sm' onClick={()=>{setActivePopup('emailEdit')}}>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div>):
              workerinfo?.email&&(<div className='flex gap-3 items-center cursor-pointer text-xs md:text-sm' onClick={()=>{setActivePopup('emailEdit')}}>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div>)
              }
              {/* <div className='flex gap-3 items-center'>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div> */}
            </div>
            <div className='flex text-sm items-center'>
              <span className='w-1/3 text-xs md:text-sm block md:hidden'>Mobile</span>
              <span className='w-1/3 text-xs md:text-sm hidden md:block'>Mobile Number</span>
              <div className='flex w-full text-xs md:text-sm'>
                {/* <h6 className='mr-4'>{role=='user'?userinfo&& userinfo.mob:workerinfo&& workerinfo.mob}</h6> */}
                  {!mob?<AddMobile setActivePopup={setActivePopup}/>:<h6 className='mr-4'>{mob}</h6>}
                  <p className='text-red-500 text-xs'>{mobErr&& mobErr}</p>
              </div>
              {role=='user'?
              userinfo?.mob&&(<div className='flex gap-3 items-center cursor-pointer text-xs md:text-sm' onClick={()=>{setActivePopup('mobEdit')}}>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div>):
              workerinfo?.mob&&(<div className='flex gap-3 items-center cursor-pointer text-xs md:text-sm' onClick={()=>{setActivePopup('mobEdit')}}>
                <MdOutlineEdit />
                <h6>Edit</h6>
              </div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='bg-white h-96 mx-auto sm:mx-[5rem] lg:mx-[15rem] xl:mx-[20rem] mb-9 my-3 sm:rounded-lg'>
      <div className='px-4 sm:px-16 gap-9 flex flex-col py-9'>
        <h1 className='text-xs md:text-lg font-semibold text-[#434343]'>Personal Details</h1>
        <div className='flex flex-col gap-6 text-sm px-1'>
          <div className='flex justify-between items-center text-xs md:text-sm'>
            <h6>First Name</h6>
            <div className='flex flex-col w-1/2'>
              <input type="text" className='border h-9 w-full rounded-lg border-gray px-6 focus:border-[#3E6990] focus:outline-none focus:ring-0' value={first_name} onChange={handlefirst_name}/>
              <p className='text-red-500 text-xs'>{first_name_err}</p>
            </div>
          </div>
          <div className='flex justify-between items-center text-xs md:text-sm'>
            <h6>Last Name</h6>
            <input type="text" className='border h-9 w-1/2 rounded-lg border-gray px-6 focus:border-[#3E6990] focus:outline-none focus:ring-0' value={last_name} onChange={(e)=>{setLast_name(e.target.value); setActivePopup('save')}}/>
          </div>
          <div className='flex justify-between items-center text-xs md:text-sm'>
            <h6>Birthday (Optional)</h6>
            <input type="date" value={dob} className='border h-9 w-1/2 rounded-lg border-gray px-6 focus:border-[#3E6990] focus:outline-none focus:ring-0' onChange={(e)=>{setDob(e.target.value); setActivePopup('save')}}/>
          </div>
          <div className='flex justify-between items-center text-xs md:text-sm'>
            <h6>Gender (Optional)</h6>
            {role==='user'?
            <div className='flex w-1/2 gap-9'>
              <button className={`border py-3 px-4 rounded-lg ${(gender? gender === 'Woman': userinfo?.gender == 'Woman')&&'bg-[#3d6b94da] text-white'}`} onClick={()=>{
                setGender('Woman')
                setActivePopup('save')
              }}>Woman</button>
              <button className={`border py-3 px-4 rounded-lg ${(gender? gender === 'Man': userinfo?.gender == 'Man') && 'bg-[#3d6b94da] text-white'}`} onClick={()=>{
                setGender('Man') 
                setActivePopup('save')}}>Man</button>
            </div>:
              <div className='flex w-1/2 gap-9'>
                <button className={`border py-3 px-4 rounded-lg ${(gender? gender === 'Woman': workerinfo ?.gender == 'Woman')&&'bg-[#3d6b94da] text-white'}`} onClick={()=>{
                  setGender('Woman')
                  setActivePopup('save')
                }}>Woman</button>
                <button className={`border py-3 px-4 rounded-lg ${(gender? gender === 'Man': workerinfo ?.gender == 'Man') && 'bg-[#3d6b94da] text-white'}`} onClick={()=>{
                  setGender('Man') 
                  setActivePopup('save')}}>Man</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
    {activePopup==='save' &&(<div className='text-xs md:text-sm fixed flex justify-center items-center bottom-0 w-full bg-white h-20 z-10'>
      <button className='border h-11 w-1/2 rounded-lg text-white bg-[#3d6b94da]' onClick={handlesubmit}>Save Changes</button>
    </div>)}
    </div>
  )
}

export default Profile