import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Plus } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import IdeaSubmissionModal from './IdeaSubmissionModal';
import { toast } from '@/assets/components/ui/use-toast';

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
  const [showModal, setShowModal] = useState(false);

  const handleSubmitIdea = async (ideaData) => {
    try {
      // Simular submissão - em produção, seria uma API call
      const newIdea = {
        ...ideaData,
        id: Date.now(),
        status: 'under-review',
        votes: 0,
        views: 0,
        comments: [],
        createdAt: new Date().toISOString(),
      };

      // Adicionar à lista local (em produção, seria salvo no backend)
      const updatedIdeas = [newIdea, ...ideas];
      
      // Simular atualização do localStorage
      localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
      
      toast({
        title: 'Ideia Submetida com Sucesso! 🎉',
        description: 'A sua ideia foi enviada para análise e será publicada em breve.',
      });

      // Recarregar a página para mostrar a nova ideia
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Erro ao submeter ideia',
        description: 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-effect p-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Minhas Ideias Submetidas
          </h2>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Ideia
          </Button>
        </div>
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
              onClick={() => setShowModal(true)}
              className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Submeter Primeira Ideia
            </Button>
          </div>
        )}
      </div>

      {/* Modal de Submissão de Ideias */}
      <IdeaSubmissionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitIdea}
      />
    </motion.div>
  );
};

export default MemberIdeas;
