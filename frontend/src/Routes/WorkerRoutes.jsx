import React from 'react'
import LoginPage from '../Pages/Worker/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../Pages/Worker/SignupPage'
import ProfilePage from '../Pages/Worker/ProfilePage'
import WorkerProtectedRoute from './WorkerProtectedRoute'
import HomePage from '../Pages/Worker/HomePage'
import AddServicesPage from '../Pages/Worker/AddServicesPage'
import ServicesPage from '../Pages/Worker/ServicesPage'
import ServiceEditPage from '../Pages/Worker/ServiceEditPage'
import ForgotPasswordPage from '../Pages/Worker/ForgotPasswordPage'

function WorkerRoutes() {
  return (
    <div>
      <Routes>
        <Route path='' element={<LoginPage />}/>
        <Route path='/forgot-password/' element={<ForgotPasswordPage />} />
        <Route path='/signup/' element={<SignupPage />}/>
        <Route path='/dashboard/' element={<WorkerProtectedRoute><HomePage /></WorkerProtectedRoute>} />
        <Route path='/profile/' element={<WorkerProtectedRoute><ProfilePage /></WorkerProtectedRoute>} />
        <Route path='/add-service/' element={<WorkerProtectedRoute><AddServicesPage /></WorkerProtectedRoute>} />
        <Route path='/services/' element={<WorkerProtectedRoute><ServicesPage /></WorkerProtectedRoute>} />
        <Route path='/service-edit/' element={<WorkerProtectedRoute><ServiceEditPage /></WorkerProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default WorkerRoutes
