import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserProtectedRoute({children}) {

    const userinfo = useSelector((state) => state.user.userinfo);
    const navigate = useNavigate();

    useEffect(()=>{
        if (userinfo === undefined || userinfo === '') {
            navigate('/'); 
        }
    }, [userinfo.isAdmin, navigate])
    
    
    return children;

}

export default UserProtectedRoute