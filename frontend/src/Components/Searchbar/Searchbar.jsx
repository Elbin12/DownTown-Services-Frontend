import React, { useState } from 'react'
import './Searchbar.css'
import { IoSearchOutline } from "react-icons/io5";  
import { useDispatch, useSelector } from 'react-redux';
import { setSearch_key } from '../../redux/user';
import { useNavigate } from 'react-router-dom';

function Searchbar() {
  
  const search_key = useSelector(state=>state.user.search_key)
  const [search, setSearch] = useState(search_key?search_key:'');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress =(e)=>{
    if (e.key === 'Enter') {
      dispatch(setSearch_key(e.target.value))
      navigate('/services/')
    }
  }

  return (
    <div className='w-1/2 flex h-14'>
      <div className="search_icon flex justify-center items-center border-r-0 border-2 w-12 rounded-s-lg border-[#BBBBBB]">
        <IoSearchOutline /> 
      </div>
      <input placeholder='Search for Electrician, Plumber, Painter etc.' className='search_input pl-6 border-2 border-[#BBBBBB] w-full rounded-r-lg focus:outline-none focus:border-[#3E6990] focus:ring-0 ' value={search} onChange={(e)=>{setSearch(e.target.value)}} onKeyDown={handleKeyPress}/>
    </div>
  )
}

export default Searchbar
