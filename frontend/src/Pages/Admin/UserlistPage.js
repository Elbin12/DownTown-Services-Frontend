import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import Userslist from '../../Components/Admin/Userslist'
import Navbar from '../../Components/Admin/Navbar'

function UserlistPage() {
  return (
    <div className='flex gap-11'>
        <Sidebar />
        <Userslist role={'users'}/>
    </div>
  )
}

export default UserlistPage