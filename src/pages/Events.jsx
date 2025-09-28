import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Euro,
  Search,
  Filter,
} from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { supabase } from '@/lib/supabase';
import Loader from '@/assets/components/ui/Loader';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registeringId, setRegisteringId] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('upcoming');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, selectedType, selectedStatus]);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('start_date', { ascending: true });
      
      if (error) throw error;
      
      const mappedEvents = (data || []).map(event => ({
        id: event.id,
        title: event.title,
        description: event.description || '',
        date: event.start_date,
        time: event.start_time || '14:00',
        location: event.location || 'Local a definir',
        price: event.price ? `${event.price}€` : 'Gratuito',
        maxParticipants: event.max_attendees || 50,
        currentParticipants: event.current_attendees || 0,
        image: event.banner_image || 'https://images.unsplash.com/photo-1665220509244-fe8459807991',
        type: event.event_type || 'workshop',
        status: new Date(event.start_date) >= new Date() ? 'upcoming' : 'past',
      }));
      
      setEvents(mappedEvents);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (eventId) => {
    setRegisteringId(eventId);
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    // fallback para quando não há auth, apenas marca como inscrito anonimamente
    const userId = currentUser?.email || 'anon';

    const registrations = JSON.parse(localStorage.getItem('event_registrations') || '{}');
    if (!registrations[eventId]) registrations[eventId] = [];
    if (!registrations[eventId].includes(userId)) {
      registrations[eventId].push(userId);
      localStorage.setItem('event_registrations', JSON.stringify(registrations));

      // Atualiza contagem de participantes
      const updated = events.map((ev) => {
        if (ev.id === eventId) {
          const next = {
            ...ev,
            currentParticipants: Math.min(ev.currentParticipants + 1, ev.maxParticipants),
          };
          return next;
        }
        return ev;
      });
      setEvents(updated);
      localStorage.setItem('events', JSON.stringify(updated));
    }
    setTimeout(() => setRegisteringId(null), 600);
  };

  const filterEvents = () => {
    let filtered = [...events];

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((event) => event.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      const today = new Date();
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        if (selectedStatus === 'upcoming') {
          return eventDate >= today;
        } else {
          return eventDate < today;
        }
      });
    }

    // Ordenar por data
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    setFilteredEvents(filtered);
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'workshop':
        return 'bg-blue-500/20 text-blue-600';
      case 'conference':
        return 'bg-orange-500/20 text-orange-600';
      case 'hackathon':
        return 'bg-green-500/20 text-green-600';
      case 'meetup':
        return 'bg-gray-500/20 text-gray-600';
      default:
        return 'bg-gray-500/20 text-gray-600';
    }
  };

  const getEventTypeText = (type) => {
    switch (type) {
      case 'workshop':
        return 'Workshop';
      case 'conference':
        return 'Conferência';
      case 'hackathon':
        return 'Hackathon';
      case 'meetup':
        return 'Meetup';
      default:
        return 'Evento';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getAvailableSpots = (event) => {
    return event.maxParticipants - event.currentParticipants;
  };

  return (
    <>
      <Helmet>
        <title>Eventos - Associação</title>
        <meta
          name="description"
          content="Descubra e inscreva-se nos nossos eventos. Workshops, conferências, hackathons e meetups sobre inovação e tecnologia."
        />
        <meta property="og:title" content="Eventos - Associação" />
        <meta
          property="og:description"
          content="Descubra e inscreva-se nos nossos eventos. Workshops, conferências, hackathons e meetups sobre inovação e tecnologia."
        />
      </Helmet>

      <div className="py-20">
        {loading && <Loader />}
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nossos <span className="gradient-text">Eventos</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Participe nos nossos eventos exclusivos. Workshops, conferências e
              hackathons para expandir conhecimentos e fazer networking.
            </p>
            
            {/* Botão para Submeter Proposta de Evento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  // TODO: Implementar modal ou página para submeter proposta
                  alert('Funcionalidade de submissão de propostas será implementada em breve!');
                }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Submeter Proposta de Evento
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Filtros */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="glass-effect p-6 rounded-2xl">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Pesquisar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os Tipos</option>
                <option value="workshop" className="bg-white">
                  Workshop
                </option>
                <option value="conference" className="bg-white">
                  Conferência
                </option>
                <option value="hackathon" className="bg-white">
                  Hackathon
                </option>
                <option value="meetup" className="bg-white">
                  Meetup
                </option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os Eventos</option>
                <option value="upcoming" className="bg-white">
                  Próximos
                </option>
                <option value="past" className="bg-white">
                  Passados
                </option>
              </select>

              <div className="flex items-center justify-center">
                <Filter className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-gray-700 text-sm">
                  {filteredEvents.length} eventos
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Eventos */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!loading && filteredEvents.length > 0 ? (
            <div className="grid gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-2xl overflow-hidden hover-glow"
                >
                  <div className="md:flex">
                    {/* Imagem do Evento */}
                    <div className="md:w-1/3">
                      <img
                        alt={`Imagem do evento ${event.title}`}
                        className="w-full h-64 md:h-full object-cover"
                        src="https://images.unsplash.com/photo-1665220509244-fe8459807991"
                      />
                    </div>

                    {/* Conteúdo do Evento */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(
                            event.type
                          )}`}
                        >
                          {getEventTypeText(event.type)}
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

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-700 mb-6">{event.description}</p>

                      {/* Informações do Evento */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-800">
                            <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                            <span className="text-sm">
                              {formatDate(event.date)}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-800">
                            <Clock className="w-5 h-5 text-blue-600 mr-3" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-800">
                            <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                          <div className="flex items-center text-gray-800">
                            <Users className="w-5 h-5 text-blue-600 mr-3" />
                            <span className="text-sm">
                              {event.currentParticipants}/
                              {event.maxParticipants} inscritos
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Barra de Progresso */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-700 mb-2">
                          <span>Vagas Disponíveis</span>
                          <span>{getAvailableSpots(event)} restantes</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                (event.currentParticipants /
                                  event.maxParticipants) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex space-x-4">
                        <Link to={`/eventos/${event.id}`} className="flex-1">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 hover-glow text-white">
                            Ver Detalhes & Inscrever-se
                          </Button>
                        </Link>
                        <div className="flex-1">
                          <Button
                            disabled={getAvailableSpots(event) <= 0 || registeringId === event.id}
                            onClick={() => handleRegister(event.id)}
                            className={`w-full ${getAvailableSpots(event) <= 0 ? 'bg-gray-300 text-gray-600' : 'bg-green-600 hover:bg-green-700'} text-white`}
                          >
                            {getAvailableSpots(event) <= 0 ? 'Esgotado' : (registeringId === event.id ? 'Inscrevendo…' : 'Inscrever-se')}
                          </Button>
                        </div>
                        {event.price !== 'Gratuito' && (
                          <div className="flex items-center text-blue-600">
                            <Euro className="w-4 h-4 mr-1" />
                            <span className="font-semibold">{event.price}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : !loading ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-700 text-lg">
                {filteredEvents.length === 0 && events.length === 0 
                  ? 'Nenhum evento disponível no momento.' 
                  : 'Nenhum evento encontrado com os filtros aplicados.'}
              </p>
              <p className="text-gray-500 text-sm">
                {events.length === 0 
                  ? 'Novos eventos serão adicionados em breve.'
                  : 'Tente ajustar os filtros de pesquisa.'}
              </p>
            </div>
          ) : null}
        </section>

        {/* Próximos Eventos em Destaque */}
        {selectedStatus === 'upcoming' && filteredEvents.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect p-8 rounded-3xl text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Não Perca os{' '}
                <span className="gradient-text">Próximos Eventos</span>
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Inscreva-se nos nossos eventos e faça parte de uma comunidade
                inovadora. Networking, aprendizagem e colaboração num só lugar.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {
                      events.filter((e) => new Date(e.date) >= new Date())
                        .length
                    }
                  </div>
                  <div className="text-gray-700 text-sm">Eventos Próximos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {events.reduce((sum, e) => sum + e.currentParticipants, 0)}
                  </div>
                  <div className="text-gray-700 text-sm">
                    Participantes Inscritos
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {events.reduce(
                      (sum, e) =>
                        sum + (e.maxParticipants - e.currentParticipants),
                      0
                    )}
                  </div>
                  <div className="text-gray-700 text-sm">Vagas Disponíveis</div>
                </div>
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </>
  );
};

export default Events;
