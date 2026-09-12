import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextData, LoginCredentials, User } from '../types/auth';
import authService from '../services/authService';
import { storageService } from '../services/storageService';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega o usuário salvo no localStorage ao inicializar a aplicação
 useEffect(() => { 
    const storageUser: User | null = storageService.getUser();
    if (storageUser) {
      setUser(storageUser);
    }
    setLoading(false);
  }, []);

  const login = (credentials: LoginCredentials): Promise<void> => {
    setLoading(true);
    return authService.login(credentials).then((user:User)=>{
      setUser(user);
      setLoading(false);
      storageService.setUser(user);
    }).catch((error) => {
      setLoading(false);
      throw error;
    })
  };

  const logout = (): void => {
    storageService.removeUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }

  return context;
};