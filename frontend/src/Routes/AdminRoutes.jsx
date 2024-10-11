import React from 'react'
import LoginPage from '../Pages/Admin/LoginPage'
import { Route, Routes } from 'react-router-dom'
import UserlistPage from '../Pages/Admin/UserlistPage'
import HomePage from '../Pages/Admin/HomePage'
import UsersdetailPage from '../Pages/Admin/UsersdetailPage'
import WorkerlistPage from '../Pages/Admin/WorkerlistPage';
import RequestsPage from '../Pages/Admin/RequestsPage'
import AdminProtectedRoute from './AdminProtected'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/dashboard/' element={<AdminProtectedRoute><HomePage /></AdminProtectedRoute>}/>
        <Route path='/login/' element={<LoginPage />}></Route>
        <Route path='/users/' element={<AdminProtectedRoute><UserlistPage /></AdminProtectedRoute>} />
        <Route path='/workers/' element={<AdminProtectedRoute><WorkerlistPage /></AdminProtectedRoute>} />
        <Route path='/user/' element={<AdminProtectedRoute><UsersdetailPage /></AdminProtectedRoute>} />
        <Route path='/requests/' element={<AdminProtectedRoute><RequestsPage /></AdminProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default AdminRoutes
