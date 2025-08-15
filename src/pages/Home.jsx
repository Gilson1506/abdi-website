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
import { Button } from '@/components/ui/button';

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
        <title>Associação - Fomentando Inovação e Colaboração</title>
        <meta
          name="description"
          content="Plataforma da associação para submissão de ideias, gestão de projetos e eventos. Junte-se à nossa comunidade inovadora."
        />
        <meta
          property="og:title"
          content="Associação - Fomentando Inovação e Colaboração"
        />
        <meta
          property="og:description"
          content="Plataforma da associação para submissão de ideias, gestão de projetos e eventos. Junte-se à nossa comunidade inovadora."
        />
      </Helmet>

      <div className="">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-orange-500/20" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="gradient-text">Transforme</span>
                <br />
                <span className="text-gray-900">Suas Ideias</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                Junte-se à nossa comunidade inovadora e transforme ideias em
                projetos impactantes
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/bolsa-ideias">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 hover-glow text-white"
                  >
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Submeter Ideia
                  </Button>
                </Link>
                <Link to="/eventos">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Próximos Eventos
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-20 h-20 bg-blue-600/20 rounded-full blur-xl" />
          </div>
          <div
            className="absolute bottom-20 right-10 animate-float"
            style={{ animationDelay: '2s' }}
          >
            <div className="w-32 h-32 bg-orange-500/20 rounded-full blur-xl" />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center glass-effect p-6 rounded-2xl hover-glow"
                >
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 text-sm">{stat.label}</div>
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
                Ideias em <span className="gradient-text">Destaque</span>
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
