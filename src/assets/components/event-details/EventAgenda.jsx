import React from 'react';

const agendaItems = [
  {
    time: '09:00',
    title: 'Receção e Networking',
    description: 'Coffee break e apresentações',
  },
  {
    time: '10:00',
    title: 'Sessão Principal',
    description: 'Apresentação do tema principal',
  },
  {
    time: '12:00',
    title: 'Pausa para Almoço',
    description: 'Networking e refeição',
  },
];

const EventAgenda = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Agenda</h2>
      <div className="space-y-4">
        {agendaItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg"
          >
            <div className="text-purple-400 font-semibold min-w-[60px]">
              {item.time}
            </div>
            <div>
              <div className="text-white font-medium">{item.title}</div>
              <div className="text-white/70 text-sm">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventAgenda;
