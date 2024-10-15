import React from 'react'
import Homepage from '../Pages/User/Homepage'
import Profilepage from '../Pages/User/Profilepage'
import { Route, Routes } from 'react-router-dom'
import UserProtectedRoute from './UserProtectedRoute'
import ServicesListingPage from '../Pages/User/ServicesListingPage'

function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/profile/' element={<UserProtectedRoute><Profilepage /></UserProtectedRoute>}></Route>
                <Route path='/' element={<Homepage />}></Route>
                <Route path='/services/' element={<ServicesListingPage />}></Route>
            </Routes>
        </div>
    )
}

export default UserRoutes
