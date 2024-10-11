import React from 'react'
import LoginPage from '../Pages/Worker/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../Pages/Worker/SignupPage'
import SentRequestPage from '../Pages/Worker/SentRequestPage'
import ProfilePage from '../Pages/Worker/ProfilePage'
import WorkerProtectedRoute from './WorkerProtectedRoute'

function WorkerRoutes() {
  return (
    <div>
      <Routes>
        <Route path='' element={<LoginPage />}/>
        <Route path='/signup/' element={<SignupPage />}/>
        <Route path='/sent-request/' element={<SentRequestPage />} />
        <Route path='/profile/' element={<WorkerProtectedRoute><ProfilePage /></WorkerProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default WorkerRoutes
