import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Calendar,
  Lightbulb,
  Rocket,
  Users,
  ArrowRight,
  Star,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import ImageCarousel from '@/assets/components/ImageCarousel';

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [featuredIdeas, setFeaturedIdeas] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);

  useEffect(() => {
    // Carregar dados do localStorage
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const ideas = JSON.parse(localStorage.getItem('ideas') || '[]');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');

    setUpcomingEvents(events.slice(0, 3));
    setFeaturedIdeas(ideas.slice(0, 3));
    setLatestProjects(projects.slice(0, 3));
  }, []);

  const stats = [
    { icon: Users, label: 'Membros Ativos', value: '250+' },
    { icon: Lightbulb, label: 'Ideias Submetidas', value: '180+' },
    { icon: Rocket, label: 'Projetos Concluídos', value: '45+' },
    { icon: Calendar, label: 'Eventos Realizados', value: '120+' },
  ];

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
          content="Plataforma da associação para submissão de ideias, gestão de projetos e eventos. Junte-se à nossa comunidade inovadora."
        />
      </Helmet>

      <div className="bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Bolsa de Ideias
                </span>
                <br />
                <span className="text-gray-900">Transformando Conceitos</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Conectamos mentes criativas, promovemos inovação e transformamos ideias 
                brilhantes em soluções que impactam o mundo
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link to="/bolsa-ideias">
                  <Button
                    size="lg"
                    className="bg-blue-800 hover:bg-blue-900 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-white"
                  >
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Submeter Ideia
                  </Button>
                </Link>
                <Link to="/eventos">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-300 text-blue-800 hover:bg-blue-50 hover:border-blue-500 transition-all duration-300"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Próximos Eventos
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Image Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <ImageCarousel />
            </motion.div>
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

        {/* Stats Section */}
        <section className="py-20 relative bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nossa <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Comunidade</span>
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Números que demonstram o impacto da nossa comunidade inovadora
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-blue-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-800 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Ideas */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ideias em <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Destaque</span>
              </h2>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                Descubra as ideias mais votadas pela nossa comunidade
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredIdeas.length > 0 ? (
                featuredIdeas.map((idea, index) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-effect p-6 rounded-2xl hover-glow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          idea.status === 'approved'
                            ? 'bg-green-500/20 text-green-600'
                            : idea.status === 'in-progress'
                            ? 'bg-blue-500/20 text-blue-600'
                            : 'bg-orange-500/20 text-orange-600'
                        }`}
                      >
                        {idea.status === 'approved'
                          ? 'Aprovado'
                          : idea.status === 'in-progress'
                          ? 'Em Execução'
                          : 'Em Análise'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-700 text-sm">
                          {idea.votes || 0}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {idea.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {idea.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 text-sm">
                        {idea.category}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {idea.author}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-700">
                    Nenhuma ideia encontrada. Seja o primeiro a submeter!
                  </p>
                </div>
              )}
            </div>

            <div className="text-center mt-12">
              <Link to="/bolsa-ideias">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-100"
                >
                  Ver Todas as Ideias
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Projects */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Projetos <span className="gradient-text">Recentes</span>
              </h2>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                Conheça os projetos mais recentes da nossa comunidade
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {latestProjects.length > 0 ? (
                latestProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-effect p-6 rounded-2xl hover-glow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'completed'
                            ? 'bg-green-500/20 text-green-600'
                            : project.status === 'in-progress'
                            ? 'bg-blue-500/20 text-blue-600'
                            : 'bg-orange-500/20 text-orange-600'
                        }`}
                      >
                        {project.status === 'completed'
                          ? 'Concluído'
                          : project.status === 'in-progress'
                          ? 'Em Andamento'
                          : 'Planejado'}
                      </span>
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 text-sm">
                        {project.category}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {project.date}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <Rocket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-700">Nenhum projeto encontrado.</p>
                </div>
              )}
            </div>

            <div className="text-center mt-12">
              <Link to="/projetos">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-100"
                >
                  Ver Todos os Projetos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Próximos <span className="gradient-text">Eventos</span>
              </h2>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                Não perca os eventos mais importantes da nossa comunidade
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-effect p-6 rounded-2xl hover-glow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-blue-600 text-sm font-medium">
                        {event.date}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.price === 'Gratuito'
                            ? 'bg-green-500/20 text-green-600'
                            : 'bg-blue-500/20 text-blue-600'
                        }`}
                      >
                        {event.price}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">
                        {event.location}
                      </span>
                      <Link to={`/eventos/${event.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-100"
                        >
                          Ver Detalhes
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-700">
                    Nenhum evento programado no momento.
                  </p>
                </div>
              )}
            </div>

            <div className="text-center mt-12">
              <Link to="/eventos">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-100"
                >
                  Ver Todos os Eventos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect p-12 rounded-3xl hover-glow"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Pronto para <span className="gradient-text">Inovar</span>?
              </h2>
              <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
                Junte-se à nossa comunidade e faça parte da transformação.
                Submeta suas ideias, participe em projetos e conecte-se com
                outros inovadores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/registro">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 hover-glow text-white"
                  >
                    Tornar-se Membro
                  </Button>
                </Link>
                <Link to="/sobre">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Saber Mais
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
