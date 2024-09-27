import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const AdminProtectedRoute = ({children}) => {

  const is_admin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    
    if (is_admin === undefined || is_admin === null) {
      setIsLoading(true);
    } else {
      if (!is_admin) {
        navigate('/');
      }
      setIsLoading(false); 
    }
  }, [is_admin, navigate]);

  return children;
};

export default AdminProtectedRoute;