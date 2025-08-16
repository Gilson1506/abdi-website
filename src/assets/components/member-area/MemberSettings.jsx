import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/assets/components/ui/button';
import { toast } from '@/assets/components/ui/use-toast';

const MemberSettings = ({ user }) => {
  const handleAction = () => {
    toast({
      title:
        '🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Pode solicitá-la no seu próximo prompt! 🚀',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-effect p-8 rounded-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Configurações da Conta
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Data de Registo
            </label>
            <input
              type="text"
              value={new Date(user.createdAt).toLocaleDateString('pt-PT')}
              disabled
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 cursor-not-allowed"
            />
          </div>
          <div className="pt-6 border-t border-gray-200">
            <Button
              onClick={handleAction}
              className="bg-blue-600 hover:bg-blue-700 mr-4 text-white"
            >
              Atualizar Perfil
            </Button>
            <Button
              variant="outline"
              onClick={handleAction}
              className="border-red-500 text-red-500 hover:bg-red-100"
            >
              Alterar Senha
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberSettings;
