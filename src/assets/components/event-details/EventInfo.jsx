import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-PT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const EventInfo = ({ event }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="flex items-center text-white">
            <Calendar className="w-6 h-6 text-purple-400 mr-4" />
            <div>
              <div className="font-semibold">{formatDate(event.date)}</div>
              <div className="text-white/70 text-sm">Data do evento</div>
            </div>
          </div>
          <div className="flex items-center text-white">
            <Clock className="w-6 h-6 text-purple-400 mr-4" />
            <div>
              <div className="font-semibold">{event.time}</div>
              <div className="text-white/70 text-sm">Horário de início</div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center text-white">
            <MapPin className="w-6 h-6 text-purple-400 mr-4" />
            <div>
              <div className="font-semibold">{event.location}</div>
              <div className="text-white/70 text-sm">Local do evento</div>
            </div>
          </div>
          <div className="flex items-center text-white">
            <Users className="w-6 h-6 text-purple-400 mr-4" />
            <div>
              <div className="font-semibold">
                {event.currentParticipants}/{event.maxParticipants} inscritos
              </div>
              <div className="text-white/70 text-sm">Participantes</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex justify-between text-sm text-white/70 mb-2">
          <span>Ocupação do Evento</span>
          <span>
            {Math.round(
              (event.currentParticipants / event.maxParticipants) * 100
            )}
            %
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${
                (event.currentParticipants / event.maxParticipants) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EventInfo;
