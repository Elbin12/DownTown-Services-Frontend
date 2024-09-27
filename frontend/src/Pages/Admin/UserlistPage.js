import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import Userslist from '../../Components/Admin/Userslist'

function UserlistPage() {
  return (
    <div className='flex gap-11'>
        <Sidebar />
        <Userslist/>
    </div>
  )
}

export default UserlistPage
