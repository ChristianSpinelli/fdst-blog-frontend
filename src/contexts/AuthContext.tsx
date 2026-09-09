import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextData, User } from '../types/auth';

const STORAGE_USER_KEY = '@BlogFiap:user';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega o usuário salvo no localStorage ao inicializar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_USER_KEY);

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao recarregar dados do usuário:', error);
        localStorage.removeItem(STORAGE_USER_KEY);
      }
    }

    setLoading(false);
  }, []);

  const login = (userData: User): void => {
    // Garante que o objeto do usuário não carregue a senha no estado local por segurança
    const { password, ...safeUser } = userData;

    setUser(safeUser as User);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(safeUser));
  };

  const logout = (): void => {
    localStorage.removeItem(STORAGE_USER_KEY);
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