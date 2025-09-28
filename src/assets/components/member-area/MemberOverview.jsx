import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, Calendar, Award } from 'lucide-react';

const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-500/20 text-green-600';
    case 'in-progress':
      return 'bg-blue-500/20 text-blue-600';
    case 'completed':
      return 'bg-gray-500/20 text-gray-600';
    case 'rejected':
      return 'bg-red-500/20 text-red-600';
    default:
      return 'bg-orange-500/20 text-orange-600';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'approved':
      return 'Aprovado';
    case 'in-progress':
      return 'Em Execução';
    case 'completed':
      return 'Concluído';
    case 'rejected':
      return 'Rejeitado';
    default:
      return 'Em Análise';
  }
};

const MemberOverview = ({ userData }) => {
  const { ideas, projects, events } = userData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-effect p-6 rounded-2xl text-center">
          <Lightbulb className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {ideas.length}
          </div>
          <div className="text-gray-700 text-sm">Ideias Submetidas</div>
        </div>
        <div className="glass-effect p-6 rounded-2xl text-center">
          <Rocket className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {projects.length}
          </div>
          <div className="text-gray-700 text-sm">Projetos Participados</div>
        </div>
        <div className="glass-effect p-6 rounded-2xl text-center">
          <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {events.length}
          </div>
          <div className="text-gray-700 text-sm">Eventos Inscritos</div>
        </div>

      </div>

      <div className="glass-effect p-8 rounded-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Atividade Recente
        </h2>
        <div className="space-y-4">
          {ideas.slice(0, 3).map((idea) => (
            <div
              key={idea.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-gray-900 font-medium">{idea.title}</div>
                  <div className="text-gray-600 text-sm">Ideia submetida</div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  idea.status
                )}`}
              >
                {getStatusText(idea.status)}
              </span>
            </div>
          ))}
          {events.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-gray-900 font-medium">
                    {event.eventTitle}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Inscrição confirmada
                  </div>
                </div>
              </div>
              <span className="text-green-600 text-sm">Confirmado</span>
            </div>
          ))}
          {ideas.length === 0 && events.length === 0 && (
            <p className="text-center text-gray-700 py-8">
              Nenhuma atividade recente para mostrar.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MemberOverview;
