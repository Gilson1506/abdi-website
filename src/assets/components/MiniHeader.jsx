import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Users, Star } from 'lucide-react';

const MiniHeader = () => {
  const stats = [
    {
      icon: Lightbulb,
      label: 'Ideias Ativas',
      value: '250+',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      label: 'Colaboradores',
      value: '1.2k+',
      color: 'text-blue-700'
    },
    {
      icon: TrendingUp,
      label: 'Projetos',
      value: '85+',
      color: 'text-blue-800'
    },
    {
      icon: Star,
      label: 'Sucessos',
      value: '42+',
      color: 'text-blue-900'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            {/* Slogan */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-1">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Transformando ideias em inovação
                </span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-1 text-xs"
                >
                  <stat.icon className={`w-3 h-3 ${stat.color}`} />
                  <span className="font-semibold text-gray-800">{stat.value}</span>
                  <span className="text-gray-600 hidden sm:inline">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniHeader;