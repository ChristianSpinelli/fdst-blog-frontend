import { User } from '../types/auth';

const USER_KEY = '@BlogFiap:user';

export const storageService = {
  /**
   * Busca entidades salvas no localStorage e converte de volta para Objeto.
   * @returns O objeto do Usuário tipado ou null se não encontrar.
   */
  getUser: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  
  /**
   * Salva o objeto do usuário no localStorage convertendo para string.
   * @param user - Objeto do usuário
   */
  setUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  
  /**
   * Remove o usuário do localStorage (usado no logout).
   */
  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  }
};
