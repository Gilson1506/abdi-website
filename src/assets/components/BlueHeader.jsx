import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, Calendar, Newspaper } from 'lucide-react';

const BlueHeader = () => {
  const location = useLocation();

  const navItems = [
    {
      name: 'Bolsa de Ideias',
      path: '/bolsa-ideias',
      icon: Lightbulb,
      description: 'Submeta suas ideias'
    },
    {
      name: 'Projetos',
      path: '/projetos',
      icon: Rocket,
      description: 'Acompanhe projetos'
    },
    {
      name: 'Eventos',
      path: '/eventos',
      icon: Calendar,
      description: 'Próximos encontros'
    },
    {
      name: 'Notícias',
      path: '/noticias',
      icon: Newspaper,
      description: 'Últimas atualizações'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`group flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600/50 ${
                      isActive(item.path) 
                        ? 'bg-blue-600/70 text-white' 
                        : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive(item.path) ? 'text-white' : 'text-blue-200'
                    }`} />
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs opacity-80 hidden sm:block">{item.description}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueHeader;