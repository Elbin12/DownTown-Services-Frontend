import React from 'react'
import Homepage from '../Pages/User/Homepage'
import Profilepage from '../Pages/User/Profilepage'
import { Route, Routes } from 'react-router-dom'
import UserProtectedRoute from './UserProtectedRoute'
import ServicesListingPage from '../Pages/User/ServicesListingPage'
import ServiceDetailsPage from '../Pages/User/ServiceDetailsPage'
import AcceptedServicePage from '../Pages/User/AcceptedServicePage'
import PaymentSuccessPage from '../Pages/User/PaymentSuccessPage'
import Orderspage from '../Pages/User/Orderspage'
import WalletPage from '../Pages/User/WalletPage'

function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/profile/' element={<UserProtectedRoute><Profilepage /></UserProtectedRoute>}></Route>
                <Route path='/' element={<Homepage />}></Route>
                <Route path='/services/' element={<ServicesListingPage />}></Route>
                <Route path='/service/:id/' element={<UserProtectedRoute><ServiceDetailsPage /></UserProtectedRoute>}></Route>
                <Route path='/orders/' element={<UserProtectedRoute><Orderspage /></UserProtectedRoute>}></Route>
                <Route path='/order/:id/' element={<UserProtectedRoute><AcceptedServicePage /></UserProtectedRoute>}></Route>
                <Route path='/payment/success/:id/' element={<UserProtectedRoute><PaymentSuccessPage /></UserProtectedRoute>}></Route>
                <Route path='/wallet/' element={<UserProtectedRoute><WalletPage /></UserProtectedRoute>}></Route>
            </Routes>
        </div>
    )
}

export default UserRoutes
