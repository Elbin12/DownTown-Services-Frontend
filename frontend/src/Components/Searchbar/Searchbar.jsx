import React from 'react'
import './Searchbar.css'
import { IoSearchOutline } from "react-icons/io5";  

function Searchbar() {
  return (
    <div class='w-1/2 flex h-14'>
      <div className="search_icon flex justify-center items-center border-r-0 border-2 w-12 rounded-s-lg border-[#BBBBBB]">
        <IoSearchOutline /> 
      </div>
      <input className="search_input" placeholder='Search for Electrician, Plumber, Painter etc.' class='pl-6 border-2 border-[#BBBBBB] w-full rounded-r-lg focus:outline-none focus:border-[#3E6990] focus:ring-0 '></input>
    </div>
  )
}

export default Searchbar
