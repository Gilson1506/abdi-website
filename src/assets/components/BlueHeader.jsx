import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlueHeader = () => {
  const location = useLocation();

  const navItems = [
    {
      name: 'Bolsa de Ideias',
      path: '/bolsa-ideias'
    },
    {
      name: 'Projetos',
      path: '/projetos'
    },
    {
      name: 'Eventos',
      path: '/eventos'
    },
    {
      name: 'Notícias',
      path: '/noticias'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
              >
                <Link
                  to={item.path}
                  className={`block text-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600/50 ${
                    isActive(item.path) 
                      ? 'bg-blue-600/70 text-white font-semibold' 
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  <span className="text-sm md:text-base font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueHeader;