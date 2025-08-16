import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';

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

const MemberIdeas = ({ ideas }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-effect p-8 rounded-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Minhas Ideias Submetidas
        </h2>
        {ideas.length > 0 ? (
          <div className="space-y-6">
            {ideas.map((idea) => (
              <div key={idea.id} className="p-6 bg-gray-100 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      idea.status
                    )}`}
                  >
                    {getStatusText(idea.status)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(idea.createdAt).toLocaleDateString('pt-PT')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {idea.title}
                </h3>
                <p className="text-gray-700 mb-4">{idea.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 text-sm">{idea.category}</span>
                  <div className="flex items-center space-x-4 text-gray-600 text-sm">
                    <span>{idea.votes || 0} votos</span>
                    <span>{idea.comments?.length || 0} comentários</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700">Ainda não submeteu nenhuma ideia.</p>
            <Button
              onClick={() => navigate('/bolsa-ideias')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submeter Primeira Ideia
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MemberIdeas;
