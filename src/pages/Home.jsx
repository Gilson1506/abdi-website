import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Calendar,
  Lightbulb,
  Users,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import ImageCarousel from '@/assets/components/ImageCarousel';
import HorizontalCarousel from '@/assets/components/HorizontalCarousel';

const Home = () => {
  const [recentNews, setRecentNews] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);

  useEffect(() => {
    // Carregar dados do localStorage e criar dados mock para notícias
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');

    // Mock data para notícias
    const mockNews = [
      {
        id: 1,
        title: 'Nova funcionalidade de colaboração lançada',
        excerpt: 'Facilitamos ainda mais a conexão entre inovadores com nossa nova plataforma de colaboração em tempo real.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        date: '2024-01-15',
        category: 'Produto'
      },
      {
        id: 2,
        title: 'Evento de Inovação: 500+ participantes',
        excerpt: 'Nosso último evento reuniu centenas de mentes criativas para compartilhar ideias revolucionárias.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        date: '2024-01-12',
        category: 'Evento'
      },
      {
        id: 3,
        title: 'Parceria com universidades',
        excerpt: 'Firmamos parceria com 15 universidades para acelerar pesquisas e desenvolvimento de projetos inovadores.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        date: '2024-01-10',
        category: 'Parceria'
      },
      {
        id: 4,
        title: 'IA aplicada à sustentabilidade',
        excerpt: 'Projeto desenvolvido na plataforma utiliza inteligência artificial para otimizar recursos energéticos.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        date: '2024-01-08',
        category: 'Tecnologia'
      },
      {
        id: 5,
        title: 'Investimento de R$ 2 milhões captado',
        excerpt: 'Projetos da nossa comunidade capturaram investimentos significativos para desenvolvimento.',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        date: '2024-01-05',
        category: 'Investimento'
      }
    ];

    setRecentNews(mockNews);
    setUpcomingEvents(events.slice(0, 6));
    setLatestProjects(projects.slice(0, 6));
  }, []);

  return (
    <>
      <Helmet>
        <title>Bolsa de Ideias - Transformando Ideias em Inovação</title>
        <meta
          name="description"
          content="Bolsa de Ideias - Plataforma para submissão de ideias, gestão de projetos inovadores e eventos colaborativos. Junte-se à nossa comunidade de inovadores."
        />
        <meta
          property="og:title"
          content="Bolsa de Ideias - Transformando Ideias em Inovação"
        />
        <meta
          property="og:description"
          content="Bolsa de Ideias - Plataforma para submissão de ideias, gestão de projetos inovadores e eventos colaborativos. Junte-se à nossa comunidade de inovadores."
        />
      </Helmet>

      <div className="">
        {/* Hero Section with Carousel */}
        <section className="relative">
          <div className="relative">
            {/* Image Carousel */}
            <ImageCarousel />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white z-10 max-w-4xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-3">
                    <span className="text-white">
                      Bolsa de Ideias
                    </span>
                    <br />
                    <span className="text-blue-200">Transformando Conceitos</span>
                  </h1>

                  <p className="text-sm md:text-base text-blue-100 max-w-2xl mx-auto mb-6">
                    Conectamos mentes criativas, promovemos inovação e transformamos ideias 
                    brilhantes em soluções que impactam o mundo
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <Link to="/bolsa-ideias">
                      <Button
                        size="default"
                        className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-white"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Submeter Ideia
                      </Button>
                    </Link>
                    <Link to="/eventos">
                      <Button
                        variant="outline"
                        size="default"
                        className="border-white text-white hover:bg-white hover:text-blue-800 transition-all duration-300"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Próximos Eventos
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-20 h-20 bg-blue-400/30 rounded-full blur-xl" />
          </div>
          <div
            className="absolute bottom-20 right-10 animate-float"
            style={{ animationDelay: '2s' }}
          >
            <div className="w-32 h-32 bg-blue-600/20 rounded-full blur-xl" />
          </div>
          <div
            className="absolute top-1/2 right-20 animate-float"
            style={{ animationDelay: '4s' }}
          >
            <div className="w-16 h-16 bg-blue-800/20 rounded-full blur-xl" />
          </div>
        </section>

        {/* Recent News */}
        <HorizontalCarousel
          items={recentNews}
          title="Notícias Recentes"
          autoScroll={true}
          renderItem={(news) => (
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {news.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(news.date).toLocaleDateString('pt-BR')}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {news.excerpt}
                </p>
                <Link 
                  to={`/noticias/${news.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                >
                  Ler mais
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          )}
        />

        {/* Upcoming Events */}
        <HorizontalCarousel
          items={upcomingEvents.length > 0 ? upcomingEvents : [
            {
              id: 1,
              title: 'Workshop de Inovação Digital',
              date: '2024-02-15',
              location: 'Centro de Convenções',
              description: 'Aprenda as mais novas técnicas de transformação digital',
              image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
              id: 2,
              title: 'Meetup de Startups',
              date: '2024-02-20',
              location: 'Hub de Inovação',
              description: 'Networking entre empreendedores e investidores',
              image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
              id: 3,
              title: 'Pitch Day 2024',
              date: '2024-02-25',
              location: 'Auditório Principal',
              description: 'Apresente sua ideia para investidores',
              image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }
          ]}
          title="Próximos Eventos"
          autoScroll={true}
          renderItem={(event) => (
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-blue-800">
                    {new Date(event.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{event.location}</span>
                </div>
                <Link 
                  to={`/eventos/${event.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                >
                  Ver detalhes
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          )}
        />

        {/* Latest Projects */}
        <HorizontalCarousel
          items={latestProjects.length > 0 ? latestProjects : [
            {
              id: 1,
              title: 'Sistema de Gestão Inteligente',
              description: 'Plataforma que utiliza IA para otimizar processos organizacionais e aumentar produtividade.',
              status: 'in-progress',
              category: 'Tecnologia',
              date: '2024-01-10',
              image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
              id: 2,
              title: 'App de Sustentabilidade',
              description: 'Aplicativo móvel para monitoramento e gamificação de práticas sustentáveis no dia a dia.',
              status: 'completed',
              category: 'Sustentabilidade',
              date: '2024-01-05',
              image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            },
            {
              id: 3,
              title: 'Plataforma de Ensino',
              description: 'Sistema educacional adaptativo que personaliza o aprendizado com base no perfil do estudante.',
              status: 'planned',
              category: 'Educação',
              date: '2024-01-15',
              image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }
          ]}
          title="Projetos Recentes"
          autoScroll={true}
          renderItem={(project) => (
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : project.status === 'in-progress'
                      ? 'bg-blue-500 text-white'
                      : 'bg-orange-500 text-white'
                  }`}>
                    {project.status === 'completed'
                      ? 'Concluído'
                      : project.status === 'in-progress'
                      ? 'Em Andamento'
                      : 'Planejado'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-blue-600 font-medium">
                    {project.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(project.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>
                <Link 
                  to={`/projetos/${project.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                >
                  Ver projeto
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          )}
        />

        {/* Call to Action */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Faça Parte da <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Revolução</span>
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
                Junte-se à nossa comunidade de inovadores e transforme suas ideias em projetos que impactam o mundo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/registro">
                  <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white">
                    <Users className="w-5 h-5 mr-2" />
                    Criar Conta Gratuita
                  </Button>
                </Link>
                <Link to="/bolsa-ideias">
                  <Button variant="outline" size="lg" className="border-blue-300 text-blue-800 hover:bg-blue-50">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Explorar Ideias
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;