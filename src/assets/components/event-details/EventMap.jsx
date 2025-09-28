import React from 'react';
import { MapPin } from 'lucide-react';

const EventMap = ({ location }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Localização</h2>
      <div className="bg-white/10 rounded-lg p-8 text-center">
        <MapPin className="w-12 h-12 text-purple-400 mx-auto mb-4" />
        <p className="text-white/70">Mapa interativo será carregado aqui</p>
        <p className="text-white/50 text-sm mt-2">{location}</p>
      </div>
    </div>
  );
};

export default EventMap;
