import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import EventHeader from '@/components/event-details/EventHeader';
import EventInfo from '@/components/event-details/EventInfo';
import EventAgenda from '@/components/event-details/EventAgenda';
import EventMap from '@/components/event-details/EventMap';
import RegistrationForm from '@/components/event-details/RegistrationForm';
import PaymentForm from '@/components/event-details/PaymentForm';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = () => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const foundEvent = events.find((e) => e.id === parseInt(id));

    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      navigate('/eventos');
    }
  };

  const handleRegistrationSubmit = (data) => {
    if (!user) {
      toast({
        title: 'Acesso Negado',
        description: 'Precisa de fazer login para se inscrever no evento.',
        variant: 'destructive',
      });
      return;
    }
    setRegistrationData(data);
    if (event.price === 'Gratuito') {
      completeRegistration(data, null);
    } else {
      setShowPaymentForm(true);
    }
  };

  const handlePaymentSubmit = (paymentMethod) => {
    toast({
      title: 'Processando Pagamento...',
      description: 'Por favor, aguarde enquanto processamos o seu pagamento.',
    });
    setTimeout(() => {
      completeRegistration(registrationData, paymentMethod);
    }, 2000);
  };

  const completeRegistration = (regData, paymentMethod) => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const updatedEvents = events.map((e) =>
      e.id === event.id
        ? { ...e, currentParticipants: e.currentParticipants + regData.tickets }
        : e
    );
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    const userRegistrations = JSON.parse(
      localStorage.getItem('userRegistrations') || '[]'
    );
    const newRegistration = {
      id: Date.now(),
      eventId: event.id,
      eventTitle: event.title,
      userId: user.id,
      ...regData,
      registrationDate: new Date().toISOString(),
      paymentMethod: paymentMethod,
      totalAmount:
        event.price === 'Gratuito'
          ? 0
          : parseFloat(event.price.replace('€', '')) * regData.tickets,
    };
    userRegistrations.push(newRegistration);
    localStorage.setItem(
      'userRegistrations',
      JSON.stringify(userRegistrations)
    );

    setShowRegistrationForm(false);
    setShowPaymentForm(false);
    setRegistrationData(null);

    toast({
      title: 'Inscrição Confirmada!',
      description: `A sua inscrição no evento "${event.title}" foi confirmada com sucesso.`,
    });
    loadEvent();
  };

  if (!event) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="text-gray-700">Carregando evento...</div>
      </div>
    );
  }

  const availableSpots = event.maxParticipants - event.currentParticipants;

  return (
    <>
      <Helmet>
        <title>{event.title} - Eventos - Associação</title>
        <meta name="description" content={event.description} />
        <meta
          property="og:title"
          content={`${event.title} - Eventos - Associação`}
        />
        <meta property="og:description" content={event.description} />
      </Helmet>

      <div className="py-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/eventos')}
            className="text-gray-700 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Eventos
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-effect rounded-3xl overflow-hidden">
              <EventHeader event={event} availableSpots={availableSpots} />
              <div className="p-8">
                <EventInfo event={event} />
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Sobre o Evento
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {event.description}
                  </p>
                </div>
                <EventAgenda />
                <EventMap location={event.location} />
                <div className="text-center">
                  {availableSpots > 0 ? (
                    <Button
                      onClick={() => setShowRegistrationForm(true)}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 hover-glow text-white px-12"
                    >
                      Inscrever-se no Evento
                      {event.price !== 'Gratuito' && (
                        <span className="ml-2">({event.price})</span>
                      )}
                    </Button>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-700 mb-4">
                        Este evento está esgotado
                      </p>
                      <Button
                        disabled
                        size="lg"
                        className="bg-gray-400 cursor-not-allowed text-white"
                      >
                        Evento Esgotado
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {showRegistrationForm && (
          <RegistrationForm
            isOpen={showRegistrationForm}
            onClose={() => setShowRegistrationForm(false)}
            onSubmit={handleRegistrationSubmit}
            event={event}
            availableSpots={availableSpots}
          />
        )}

        {showPaymentForm && registrationData && (
          <PaymentForm
            isOpen={showPaymentForm}
            onClose={() => setShowPaymentForm(false)}
            onSubmit={handlePaymentSubmit}
            event={event}
            registrationData={registrationData}
          />
        )}
      </div>
    </>
  );
};

export default EventDetails;
