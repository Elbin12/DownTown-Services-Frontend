import React from 'react'
import LoginPage from '../Pages/Worker/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../Pages/Worker/SignupPage'
import ProfilePage from '../Pages/Worker/ProfilePage'
import WorkerProtectedRoute from './WorkerProtectedRoute'
import HomePage from '../Pages/Worker/HomePage'

function WorkerRoutes() {
  return (
    <div>
      <Routes>
        <Route path='' element={<LoginPage />}/>
        <Route path='/signup/' element={<SignupPage />}/>
        <Route path='/dashboard/' element={<WorkerProtectedRoute><HomePage /></WorkerProtectedRoute>} />
        <Route path='/profile/' element={<WorkerProtectedRoute><ProfilePage /></WorkerProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default WorkerRoutes
