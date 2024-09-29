import React from 'react'
import LoginPage from '../Pages/Admin/LoginPage'
import { Route, Routes } from 'react-router-dom'
import UserlistPage from '../Pages/Admin/UserlistPage'
import HomePage from '../Pages/Admin/HomePage'
import UsersdetailPage from '../Pages/Admin/UsersdetailPage'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/users-list' element={<UserlistPage />} />
        <Route path='/user/' element={<UsersdetailPage />} />
      </Routes>
    </div>
  )
}

export default AdminRoutes
