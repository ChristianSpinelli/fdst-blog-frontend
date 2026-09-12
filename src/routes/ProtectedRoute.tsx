import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  navigateTo?:string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, navigateTo }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; 
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role) && !!navigateTo) {
    return <Navigate to={navigateTo} replace />;
  }

  return <Outlet />;
};