import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';
import AdminProtectedRoute from './AdminProtected';

const AppRoutes = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/*' element={<UserRoutes />}/>
                <Route path='admin/*' element={<AdminProtectedRoute><AdminRoutes /></AdminProtectedRoute>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
