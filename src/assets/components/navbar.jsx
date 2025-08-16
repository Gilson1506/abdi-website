import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
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

          {/* Mobile actions */}
          <div className="flex items-center md:hidden space-x-2">
            {user ? (
              <Link to="/area-associado">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-blue-800 rounded-full"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-blue-800"
                >
                  <User className="w-4 h-4 mr-1" />
                  Entrar
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 bg-white/70 border border-gray-200 rounded-full shadow-sm hover:bg-white"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
            className="md:hidden glass-effect border-t border-gray-200/50"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive(item.path) ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200/50">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/area-associado"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {user.name}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-red-500"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/registro"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm font-medium text-gray-700 hover:text-blue-600"
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
