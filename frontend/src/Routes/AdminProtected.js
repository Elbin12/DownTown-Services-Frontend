import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const AdminProtectedRoute = ({children}) => {

  const userinfo = useSelector((state) => state.user.userinfo);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);


  console.log(userinfo.isAdmin, 'from route', userinfo);
  

  useEffect(() => {
    
    if (userinfo.isAdmin === undefined || userinfo.isAdmin === null) {
      setIsLoading(true);
    } else {
      if (!userinfo.isAdmin) {
        navigate('/');
      }
      setIsLoading(false); 
    }
  }, [userinfo.isAdmin, navigate]);

  return children;
};

export default AdminProtectedRoute;