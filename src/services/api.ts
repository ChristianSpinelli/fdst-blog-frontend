// src/services/api.js
import axios from 'axios';
import { ENV } from '../config/env';
import { storageService } from './storageService';

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

  const user = storageService.getUser();
  if (user) {
    if (user.username) {
      config.headers['x-user-username'] = user.username;
    }
  }
  
  return config;
}, (error) => Promise.reject(error));

export default api;
