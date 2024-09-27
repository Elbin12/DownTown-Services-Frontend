import React from 'react'
import Homepage from '../Pages/User/Homepage'
import Profilepage from '../Pages/User/Profilepage'
import { Route, Routes } from 'react-router-dom'

function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/profile/' element={<Profilepage />}></Route>
                <Route path='/' element={<Homepage />}></Route>
            </Routes>
        </div>
    )
}

export default UserRoutes
