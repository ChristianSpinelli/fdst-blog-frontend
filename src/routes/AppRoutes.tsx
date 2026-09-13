import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { ProtectedRoute } from './ProtectedRoute';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { UserRole } from '../types/auth';
import { PostProvider } from '../contexts/PostContext';
import { PostDetail } from '../pages/PostDetail/PostDetail';
import { AdminPosts } from '../pages/AdminPost/AdminPost';
import { CreateOrEditPost } from '../pages/CreateOrEditPost/CreateOrEditPost';

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
           <Route path="*"  element={<Navigate to="/dashboard"/>}/>
        </Route>
      </Route>

      <Route element={
        <ProtectedRoute
          allowedRoles={[UserRole.PROFESSOR]}
          navigateTo='/dashboard'
        />
      }>
        <Route element={<PostLayout/>}>
            <Route path="/admin/posts" element={<AdminPosts />} />
            <Route path="/admin/posts/new" element={<CreateOrEditPost isEditing={false} />} />
            <Route path='/admin/posts/edit/:id' element={<CreateOrEditPost isEditing={true}/> } />
            <Route path="*"  element={<Navigate to="/dashboard"/>}/>
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*"  element={<Navigate to="/login"/>}/>
      
    </Routes>
  );
};