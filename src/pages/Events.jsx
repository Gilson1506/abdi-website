import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
import { Button } from '@/components/ui/button';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('upcoming');

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, selectedType, selectedStatus]);

  const loadEvents = () => {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]');

    // Se não houver eventos salvos, criar alguns exemplos
    if (savedEvents.length === 0) {
      const exampleEvents = [
        {
          id: 1,
          title: 'Workshop de Inovação Digital',
          description:
            'Um workshop intensivo sobre as últimas tendências em inovação digital e transformação tecnológica.',
          date: '2024-02-15',
          time: '14:00',
          location: 'Centro de Inovação, Lisboa',
          price: 'Gratuito',
          maxParticipants: 50,
          currentParticipants: 23,
          image:
            'Digital innovation workshop with people collaborating on technology projects',
          type: 'workshop',
          status: 'upcoming',
        },
        {
          id: 2,
          title: 'Conferência de Sustentabilidade',
          description:
            'Conferência anual sobre sustentabilidade, meio ambiente e desenvolvimento sustentável.',
          date: '2024-03-20',
          time: '09:00',
          location: 'Auditório da Universidade, Porto',
          price: '25€',
          maxParticipants: 200,
          currentParticipants: 87,
          image:
            'Sustainability conference with speakers presenting green technology solutions',
          type: 'conference',
          status: 'upcoming',
        },
        {
          id: 3,
          title: 'Hackathon de Saúde Digital',
          description:
            'Evento de 48 horas para desenvolver soluções inovadoras na área da saúde digital.',
          date: '2024-04-10',
          time: '18:00',
          location: 'TechHub, Coimbra',
          price: '15€',
          maxParticipants: 100,
          currentParticipants: 45,
          image:
            'Healthcare hackathon with developers working on digital health solutions',
          type: 'hackathon',
          status: 'upcoming',
        },
      ];

      localStorage.setItem('events', JSON.stringify(exampleEvents));
      setEvents(exampleEvents);
    } else {
      setEvents(savedEvents);
    }
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
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Participe nos nossos eventos exclusivos. Workshops, conferências e
              hackathons para expandir conhecimentos e fazer networking.
            </p>
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
          {filteredEvents.length > 0 ? (
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
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-700 text-lg">Nenhum evento encontrado.</p>
              <p className="text-gray-500 text-sm">
                Tente ajustar os filtros de pesquisa.
              </p>
            </div>
          )}
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
