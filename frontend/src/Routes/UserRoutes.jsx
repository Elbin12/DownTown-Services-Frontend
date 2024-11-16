import React from 'react'
import Homepage from '../Pages/User/Homepage'
import Profilepage from '../Pages/User/Profilepage'
import { Route, Routes } from 'react-router-dom'
import UserProtectedRoute from './UserProtectedRoute'
import ServicesListingPage from '../Pages/User/ServicesListingPage'
import ServiceDetailsPage from '../Pages/User/ServiceDetailsPage'
import AcceptedServicePage from '../Pages/User/AcceptedServicePage'

function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/profile/' element={<UserProtectedRoute><Profilepage /></UserProtectedRoute>}></Route>
                <Route path='/' element={<Homepage />}></Route>
                <Route path='/services/' element={<ServicesListingPage />}></Route>
                <Route path='/service/:id/' element={<UserProtectedRoute><ServiceDetailsPage /></UserProtectedRoute>}></Route>
                <Route path='/order/:id/' element={<UserProtectedRoute><AcceptedServicePage /></UserProtectedRoute>}></Route>
            </Routes>
        </div>
    )
}

export default UserRoutes
