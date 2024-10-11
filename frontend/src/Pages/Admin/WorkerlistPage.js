import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar'
import Userslist from '../../Components/Admin/Userslist'

function WorkerlistPage() {
  return (
    <div className='flex gap-11'>
        <Sidebar />
        <Userslist role={'workers'}/>
    </div>
  )
}

export default WorkerlistPage
