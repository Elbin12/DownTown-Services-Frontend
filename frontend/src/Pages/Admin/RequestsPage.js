import React from 'react'
import Requests from '../../Components/Admin/Requests'
import Sidebar from '../../Components/Admin/Sidebar'

function RequestsPage() {
  return (
    <div className='flex gap-11'>
        <Sidebar />
        <Requests />
    </div>
  )
}

export default RequestsPage
