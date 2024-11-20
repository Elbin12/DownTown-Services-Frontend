import React from 'react'
import LoginPage from '../Pages/Admin/LoginPage'
import { Route, Routes } from 'react-router-dom'
import UserlistPage from '../Pages/Admin/UserlistPage'
import HomePage from '../Pages/Admin/HomePage'
import UsersdetailPage from '../Pages/Admin/UsersdetailPage'
import WorkerlistPage from '../Pages/Admin/WorkerlistPage';
import RequestsPage from '../Pages/Admin/RequestsPage'
import AdminProtectedRoute from './AdminProtected'
import ServicesListingPage from '../Pages/Admin/ServicesListingPage'
import CategoriesPage from '../Pages/Admin/CategoriesPage'
import WorkerDetailPage from '../Pages/Admin/WorkerDetailPage'
import ServiceDetailsPage from '../Pages/Admin/ServiceDetailsPage'
import RequestDetailPage from '../Pages/Admin/RequestDetailPage'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/dashboard/' element={<AdminProtectedRoute><HomePage /></AdminProtectedRoute>}/>
        <Route path='/login/' element={<LoginPage />}></Route>
        <Route path='/users/' element={<AdminProtectedRoute><UserlistPage /></AdminProtectedRoute>} />
        <Route path='/worker/' element={<AdminProtectedRoute><WorkerDetailPage /></AdminProtectedRoute>} />
        <Route path='/workers/' element={<AdminProtectedRoute><WorkerlistPage /></AdminProtectedRoute>} />
        <Route path='/user/' element={<AdminProtectedRoute><UsersdetailPage /></AdminProtectedRoute>} />
        <Route path='/requests/' element={<AdminProtectedRoute><RequestsPage /></AdminProtectedRoute>} />
        <Route path='/request/:id/' element={<AdminProtectedRoute><RequestDetailPage /></AdminProtectedRoute>} />
        <Route path='/services/' element={<AdminProtectedRoute><ServicesListingPage /></AdminProtectedRoute>} />
        <Route path='/service/:id/' element={<AdminProtectedRoute><ServiceDetailsPage /></AdminProtectedRoute>} />
        <Route path='/categories/' element={<AdminProtectedRoute><CategoriesPage /></AdminProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default AdminRoutes
