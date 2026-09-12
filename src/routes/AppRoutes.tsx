import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { ProtectedRoute } from './ProtectedRoute';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { UserRole } from '../types/auth';
import { PostProvider } from '../contexts/PostContext';
import { PostDetail } from '../pages/PostDetail/PostDetail';

const PostLayout: React.FC = () => {
  return (
    <PostProvider>
      <Outlet />
    </PostProvider>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>Página não encontrada (404)</h1>} />

      <Route 
        element={
        <ProtectedRoute 
          allowedRoles={[UserRole.ALUNO, UserRole.PROFESSOR]} 
          navigateTo='/dashboard'
        />
      }>
        <Route element={<PostLayout/>}>
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/posts/:id" element={<PostDetail />} />
        </Route>
      </Route>
    

      
    </Routes>
  );
};