import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    {
      name: 'Início',
      path: '/',
    },
    {
      name: 'Sobre Nós',
      path: '/sobre',
    },
    {
      name: 'Contato',
      path: '/contato',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="relative w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            {/* Logo - suporte para PNG */}
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Bolsa de Ideias" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback para quando não houver logo
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg hidden">
                <span className="text-white font-bold text-xl">💡</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-blue-800">Bolsa de Ideias</span>
              <span className="text-xs text-blue-600 -mt-1">Inovação & Colaboração</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-800 ${
                  isActive(item.path) ? 'text-blue-800 font-semibold' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/area-associado">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-blue-800"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-700 hover:text-red-500"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-blue-800"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button
                    size="sm"
                    className="bg-blue-800 hover:bg-blue-900 text-white shadow-lg"
                  >
                    Registrar
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Link Entrar fora da barra de menu em mobile */}
            {!user && (
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-blue-800 px-3 py-2"
                >
                  <UserCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Entrar</span>
                </Button>
              </Link>
            )}
            
            {/* Ícone de perfil para usuário logado */}
            {user && (
              <Link to="/area-associado">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-blue-800 px-2 py-2"
                >
                  <UserCircle className="w-5 h-5" />
                </Button>
              </Link>
            )}

            {/* Menu button com novo estilo */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:bg-blue-50 border border-gray-300 hover:border-blue-400 rounded-lg p-2"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu com novo estilo */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-800 ${
                    isActive(item.path) ? 'text-blue-800 bg-blue-50 font-semibold' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Seção do usuário no menu mobile */}
              <div className="pt-3 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg">
                      <UserCircle className="w-4 h-4 mr-2 inline" />
                      {user.name}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2 inline" />
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/registro"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 transition-colors text-center"
                    >
                      Registrar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
