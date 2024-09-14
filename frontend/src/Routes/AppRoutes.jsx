import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from '../Pages/User/Homepage';

const AppRoutes = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Homepage />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes
