import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkRole } from '../utils/roles';

const ProtectedRoute = ({ children, requiredRole }) => {
  if (!checkRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
