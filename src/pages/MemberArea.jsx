import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  User,
  Lightbulb,
  Rocket,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/assets/components/ui/use-toast';
import MemberOverview from '@/assets/components/member-area/MemberOverview';
import MemberProjects from '@/assets/components/member-area/MemberProjects';
import MemberEvents from '@/assets/components/member-area/MemberEvents';
import MemberOrders from '@/assets/components/member-area/MemberOrders';

import MemberSettings from '@/assets/components/member-area/MemberSettings';

const MemberArea = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState({
    ideas: [],
    projects: [],
    events: [],
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadUserData();
  }, [user, navigate]);

  const loadUserData = () => {
    const ideas = JSON.parse(localStorage.getItem('ideas') || '[]');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const registrations = JSON.parse(
      localStorage.getItem('userRegistrations') || '[]'
    );

    setUserData({
      ideas: ideas.filter((idea) => idea.authorId === user.id),
      projects: projects.filter(
        (project) =>
          project.participants?.includes(user.id) ||
          project.author === user.name
      ),
      events: registrations.filter((reg) => reg.userId === user.id),
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: 'Sessão Terminada',
      description: 'Até breve! Esperamos vê-lo novamente em breve.',
    });
  };

  if (!user) return null;

  const tabs = [
    {
      id: 'overview',
      label: 'Visão Geral',
      icon: User,
      component: <MemberOverview userData={userData} />,
    },
    {
      id: 'projects',
      label: 'Projetos',
      icon: Rocket,
      component: <MemberProjects projects={userData.projects} />,
    },
    {
      id: 'events',
      label: 'Eventos',
      icon: Calendar,
      component: <MemberEvents events={userData.events} />,
    },
    {
      id: 'orders',
      label: 'Meus Pedidos',
      icon: Calendar,
      component: <MemberOrders />,
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      component: <MemberSettings user={user} />,
    },
  ];

  const activeComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <>
      <Helmet>
        <title>Área do Associado - Associação</title>
        <meta
          name="description"
          content="Área privada do associado. Gerencie suas ideias, projetos, eventos e certificados."
        />
        <meta property="og:title" content="Área do Associado - Associação" />
        <meta
          property="og:description"
          content="Área privada do associado. Gerencie suas ideias, projetos, eventos e certificados."
        />
      </Helmet>

      <div className="py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Header do Perfil */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              {/* Informações do Perfil */}
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt="Foto de perfil"
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300">
                      <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      // TODO: Implementar upload de foto
                      alert('Funcionalidade de upload de foto será implementada em breve!');
                    }}
                    className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:scale-110"
                    title="Alterar foto"
                  >
                    +
                  </button>
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                    Bem-vindo,{' '}
                    <span className="gradient-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                      {user.name}
                    </span>
                  </h1>
                  <p className="text-gray-700 text-sm sm:text-base">{user.email}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Membro desde{' '}
                    {new Date(user.createdAt).toLocaleDateString('pt-PT')}
                  </p>
                </div>
              </div>
              
              {/* Botão de Logout */}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full sm:w-auto border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600 hover:text-red-600 transition-all duration-300 px-6 py-2 rounded-xl shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Navegação das Abas */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div className="glass-effect p-2 sm:p-3 rounded-2xl shadow-lg">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 font-medium text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Conteúdo das Abas */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[400px]"
          >
            {activeComponent}
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default MemberArea;
