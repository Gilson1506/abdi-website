import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/20 text-green-600';
    case 'in-progress':
      return 'bg-blue-500/20 text-blue-600';
    case 'planned':
      return 'bg-orange-500/20 text-orange-600';
    default:
      return 'bg-gray-500/20 text-gray-600';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Concluído';
    case 'in-progress':
      return 'Em Andamento';
    case 'planned':
      return 'Planejado';
    default:
      return 'Desconhecido';
  }
};

const MemberProjects = ({ projects }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-effect p-8 rounded-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Projetos Participados
        </h2>
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="p-6 bg-gray-100 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {getStatusText(project.status)}
                  </span>
                  <span className="text-blue-600 text-sm">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{project.date}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-600"
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Rocket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700">
              Ainda não participou em nenhum projeto.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MemberProjects;
