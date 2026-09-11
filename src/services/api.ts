// src/services/api.js
import axios from 'axios';
import { ENV } from '../config/env';

const api = axios.create({
  baseURL: ENV.BLOG_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (config.headers['x-user-username']) {
    return config;
  }

  const storagedUser = localStorage.getItem('@App:user');
  if (storagedUser) {
    const user = JSON.parse(storagedUser);
    if (user?.username) {
      config.headers['x-user-username'] = user.username;
    }
  }
  
  return config;
}, (error) => Promise.reject(error));

export default api;
