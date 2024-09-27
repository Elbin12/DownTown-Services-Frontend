import React from 'react'
import LoginPage from '../Pages/Admin/LoginPage'
import { Route, Routes } from 'react-router-dom'
import UserlistPage from '../Pages/Admin/UserlistPage'
import HomePage from '../Pages/Admin/HomePage'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/users-list' element={<UserlistPage />} />
      </Routes>
    </div>
  )
}

export default AdminRoutes
