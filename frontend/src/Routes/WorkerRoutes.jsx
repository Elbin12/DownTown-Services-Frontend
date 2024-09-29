import React from 'react'
import LoginPage from '../Pages/Worker/LoginPage'
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../Pages/Worker/SignupPage'
import SentRequestPage from '../Pages/Worker/SentRequestPage'

function WorkerRoutes() {
  return (
    <div>
      <Routes>
        <Route path='' element={<LoginPage />}/>
        <Route path='/signup/' element={<SignupPage />}/>
        <Route path='/sent-request/' element={<SentRequestPage />} />
      </Routes>
    </div>
  )
}

export default WorkerRoutes
