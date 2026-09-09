export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  role: 'professor' | 'aluno' | 'admin';
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}