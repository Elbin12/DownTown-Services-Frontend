import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from '../Pages/User/Homepage';
import Profilepage from '../Pages/User/Profilepage';

const AppRoutes = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Homepage />}></Route>
                <Route path='profile/' element={<Profilepage />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes
