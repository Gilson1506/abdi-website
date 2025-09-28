import React from 'react';

const EventHeader = ({ event, availableSpots }) => {
  return (
    <div className="h-64 md:h-96 relative">
      <img
        alt={`Imagem do evento ${event.title}`}
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1695068580120-dcd89ac7fb18"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {event.title}
        </h1>
        <div className="flex flex-wrap gap-4">
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              event.price === 'Gratuito'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-blue-500/20 text-blue-400'
            }`}
          >
            {event.price}
          </span>
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400">
            {availableSpots} vagas disponíveis
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
