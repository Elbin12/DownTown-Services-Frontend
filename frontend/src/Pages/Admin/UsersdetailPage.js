import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import UserDetails from '../../Components/Admin/UserDetails'

function UsersdetailPage() {
  return (
    <div className='flex gap-11'>
        <Sidebar />
        <UserDetails/>
    </div>
  )
}

export default UsersdetailPage
