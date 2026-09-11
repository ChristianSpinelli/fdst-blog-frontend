// src/services/authService.ts
import api from './api';
import { LoginCredentials, User } from '../types/auth';

const authService = {
  /**
   * Realiza o login simplificado do usuário.
   * Envia as credenciais e injeta o header manualmente apenas para esta requisição inicial.
   * 
   * @param credentials - Objeto contendo username e password
   * @returns Uma Promise com os dados do Usuário logado
   */
  login: async ({ username, password }: LoginCredentials): Promise<User> => {
    try {
      const response = await api.post<User>(
        '/login', 
        { username, password }, 
        {
          headers: {
            'x-user-username': username
          }
        }
      );
      
      return response.data;
    } catch (error: any) {
      throw error.response?.data || new Error('Falha na autenticação');
    }
  },
};

export default authService;
