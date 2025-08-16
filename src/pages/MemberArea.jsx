import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  User,
  Lightbulb,
  Rocket,
  Calendar,
  Award,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/assets/components/ui/use-toast';
import MemberOverview from '@/assets/components/member-area/MemberOverview';
import MemberIdeas from '@/assets/components/member-area/MemberIdeas';
import MemberProjects from '@/assets/components/member-area/MemberProjects';
import MemberEvents from '@/assets/components/member-area/MemberEvents';
import MemberCertificates from '@/assets/components/member-area/MemberCertificates';
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
      id: 'ideas',
      label: 'Minhas Ideias',
      icon: Lightbulb,
      component: <MemberIdeas ideas={userData.ideas} />,
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
      id: 'certificates',
      label: 'Certificados',
      icon: Award,
      component: <MemberCertificates events={userData.events} />,
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

      <div className="py-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect p-8 rounded-3xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Bem-vindo,{' '}
                    <span className="gradient-text">{user.name}</span>
                  </h1>
                  <p className="text-gray-700">{user.email}</p>
                  <p className="text-gray-500 text-sm">
                    Membro desde{' '}
                    {new Date(user.createdAt).toLocaleDateString('pt-PT')}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-red-500 text-red-500 hover:bg-red-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="glass-effect p-2 rounded-2xl">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeComponent}
        </section>
      </div>
    </>
  );
};

export default MemberArea;
