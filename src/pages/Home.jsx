import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  Users,
  ArrowRight,
  UserPlus,
  Calendar,
} from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import ImageCarousel from '@/assets/components/ImageCarousel';
import HorizontalCarousel from '@/assets/components/HorizontalCarousel';
import MembershipApplicationModal from '@/assets/components/MembershipApplicationModal';
import { supabase } from '@/lib/supabase';
import Loader from '@/assets/components/ui/Loader';

const Home = () => {
  const [recentNews, setRecentNews] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch recent news
      const { data: newsData, error: newsError } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(5);

      if (newsError) throw newsError;

      // Fetch upcoming events
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true })
        .limit(6);

      if (eventsError) throw eventsError;

      // Fetch latest projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(6);

      if (projectsError) throw projectsError;

      // Transform news data
      const transformedNews = (newsData || []).map(news => ({
        id: news.id,
        title: news.title,
        excerpt: news.subtitle || news.content?.substring(0, 150) + '...',
        image: news.banner_image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        date: news.published_at || news.created_at,
        category: news.category || 'Notícias'
      }));

      // Transform events data
      const transformedEvents = (eventsData || []).map(event => ({
        id: event.id,
        title: event.title,
        date: event.start_date,
        location: event.location || 'Local a definir',
        description: event.description || 'Evento da ABDI',
        image: event.banner_image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }));

      // Transform projects data
      const transformedProjects = (projectsData || []).map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status === 'approved' ? 'completed' : 'in-progress',
        category: 'Inovação',
        date: project.created_at,
        image: project.banner_image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }));

      setRecentNews(transformedNews);
      setUpcomingEvents(transformedEvents);
      setLatestProjects(transformedProjects);

    } catch (error) {
      console.error('Error fetching home data:', error);
      // Set empty arrays on error - no fallback data
      setRecentNews([]);
      setUpcomingEvents([]);
      setLatestProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Carregando página inicial..." />;
  }

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
            <div className="absolute inset-0 bg-black/30 pointer-events-none">
              <div className="text-white z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-end pr-8 pointer-events-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-right"
                >
                  {/* removed heading and paragraph per request */}

                  <div className="flex flex-col sm:flex-row gap-3 justify-end items-center">
                    <Link to="/bolsa-ideias">
                      <Button
                        size="default"
                        className="bg-white hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-blue-600 border border-gray-200"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Submeter Ideia
                      </Button>
                    </Link>
                    <Button
                      size="default"
                      className="bg-white hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-blue-600 border border-gray-200"
                      onClick={() => setIsMembershipModalOpen(true)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Associar-se
                    </Button>
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
        {recentNews.length > 0 ? (
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
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notícias Recentes</h2>
              <p className="text-gray-600">Nenhuma notícia disponível no momento.</p>
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 ? (
          <HorizontalCarousel
            items={upcomingEvents}
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
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Próximos Eventos</h2>
              <p className="text-gray-600">Nenhum evento próximo disponível no momento.</p>
            </div>
          </div>
        )}

        {/* Latest Projects */}
        {latestProjects.length > 0 ? (
          <HorizontalCarousel
            items={latestProjects}
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
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Projetos Recentes</h2>
              <p className="text-gray-600">Nenhum projeto disponível no momento.</p>
            </div>
          </div>
        )}

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

      {/* Modal de Candidatura */}
      <MembershipApplicationModal
        isOpen={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
      />
    </>
  );
};

export default Home;