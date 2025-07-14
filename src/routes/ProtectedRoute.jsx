import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({allowRoles , children}) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  if(!allowRoles.includes(localUser?.profile?.role)){
    return <Navigate to="/unauthorized" />;
  }
  if(!localUser){
    return <Navigate to="/login" />;
  }
  return children
}

export default ProtectedRoute
