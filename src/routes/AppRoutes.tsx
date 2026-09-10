import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<ProtectedRoute />}/>
        <Route path="/login" element={<Login />} />
    </Routes>
  );
};