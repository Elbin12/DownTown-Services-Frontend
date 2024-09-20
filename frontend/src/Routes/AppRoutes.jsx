import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from '../Pages/User/Homepage';
import Otppage from '../Pages/User/Otppage';

const AppRoutes = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Homepage />}></Route>
                <Route path='verify-otp/' element={<Otppage />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes
