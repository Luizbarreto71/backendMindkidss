import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
      <nav className="bg-white/95 backdrop-blur-sm shadow-xl border-b-4 border-gradient-to-r from-blue-400 to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/WhatsApp Image 2025-06-20 at 17.35.45.jpeg" 
                  alt="MindKids Logo" 
                  className="h-12 w-12 object-contain"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MindKids
                </span>
                <div className="text-xs text-gray-600 font-medium">Plataforma Premium</div>
              </div>
            </Link>
            
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  <Link
                    to="/"
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive('/') 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Início
                  </Link>
                  <Link
                    to="/profile"
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive('/profile') 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </Link>
                  <Link
                    to="/reports"
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive('/reports') 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Relatórios
                  </Link>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm">
                      <span className="text-gray-600">Olá, </span>
                      <span className="font-semibold text-purple-600">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Sair
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="px-6 py-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/pricing"
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Assinar Agora
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}