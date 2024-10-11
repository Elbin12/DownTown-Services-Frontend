import React from 'react'
import Homepage from '../Pages/User/Homepage'
import Profilepage from '../Pages/User/Profilepage'
import { Route, Routes } from 'react-router-dom'
import AddMobilePage from '../Pages/User/AddMobilePage'
import UserProtectedRoute from './UserProtectedRoute'

function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/profile/' element={<UserProtectedRoute><Profilepage /></UserProtectedRoute>}></Route>
                <Route path='/' element={<Homepage />}></Route>
                <Route path='/add-mobile/' element={<AddMobilePage />}></Route>
            </Routes>
        </div>
    )
}

export default UserRoutes
