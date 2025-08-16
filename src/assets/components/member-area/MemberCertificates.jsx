import React from 'react';
import { motion } from 'framer-motion';
import { Award, Download } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { toast } from '@/assets/components/ui/use-toast';

const MemberCertificates = ({ events }) => {
  const downloadCertificate = (eventTitle) => {
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
          Certificados de Participação
        </h2>
        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((registration) => (
              <div
                key={registration.id}
                className="p-6 bg-gray-100 rounded-2xl text-center"
              >
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {registration.eventTitle}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Participação confirmada em{' '}
                  {new Date(registration.registrationDate).toLocaleDateString(
                    'pt-PT'
                  )}
                </p>
                <Button
                  size="sm"
                  onClick={() => downloadCertificate(registration.eventTitle)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700">
              Nenhum certificado disponível ainda.
            </p>
            <p className="text-gray-500 text-sm">
              Participe em eventos para receber certificados.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MemberCertificates;
