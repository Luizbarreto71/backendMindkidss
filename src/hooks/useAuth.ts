import { useState, useContext, createContext } from 'react';
import api from '../services/api'; // Isso aqui importa o Axios
import { useLocalStorage } from './useLocalStorage';

interface User {
  id: number;
  name: string;
  email: string;
  hasPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPremiumAccess: () => boolean;
  activatePremium: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>('currentUser', null);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, senha: password });
      setUser(response.data);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/register', { nome: name, email, senha: password });
      setUser(response.data);
      return true;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const hasPremiumAccess = () => {
    return user?.hasPremium ?? false;
  };

  const activatePremium = () => {
    if (user) {
      setUser({ ...user, hasPremium: true });
    }
  };

  return {
    user,
    login,
    register,
    logout,
    hasPremiumAccess,
    activatePremium
  };
}
