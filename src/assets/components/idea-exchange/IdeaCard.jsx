import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageCircle, Eye } from 'lucide-react';
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

const IdeaCard = ({ idea, index, onVote, onComment, user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-effect p-6 rounded-2xl hover-glow"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  idea.status
                )}`}
              >
                {getStatusText(idea.status)}
              </span>
              <span className="text-blue-600 text-sm">{idea.category}</span>
            </div>
            <span className="text-gray-500 text-sm">
              {new Date(idea.createdAt).toLocaleDateString('pt-PT')}
            </span>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            {idea.title}
          </h3>
          <p className="text-gray-700 mb-4 line-clamp-3">{idea.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Por: {idea.author}</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500 text-sm">{idea.views || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500 text-sm">
                  {idea.comments?.length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-col items-center space-x-2 md:space-x-0 md:space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote(idea.id)}
            className={`flex items-center space-x-1 ${
              idea.voters?.includes(user?.id)
                ? 'text-blue-600'
                : 'text-gray-700'
            } hover:text-blue-600`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{idea.votes || 0}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment(idea.id)}
            className="text-gray-700 hover:text-blue-600"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default IdeaCard;
