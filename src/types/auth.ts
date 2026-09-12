export const UserRole = {
  ALUNO: 'aluno',
  PROFESSOR: 'professor',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  username: string; 
  password: string;
}


export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (loginCredentials: LoginCredentials) => void;
  logout: () => void;
}