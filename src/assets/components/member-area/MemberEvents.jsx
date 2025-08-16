import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Download } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { toast } from '@/assets/components/ui/use-toast';

const MemberEvents = ({ events }) => {
  const navigate = useNavigate();

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
          Eventos Inscritos
        </h2>
        {events.length > 0 ? (
          <div className="space-y-6">
            {events.map((registration) => (
              <div
                key={registration.id}
                className="p-6 bg-gray-100 rounded-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-600">
                    Confirmado
                  </span>
                  <span className="text-gray-500 text-sm">
                    Inscrito em{' '}
                    {new Date(registration.registrationDate).toLocaleDateString(
                      'pt-PT'
                    )}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {registration.eventTitle}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-gray-600 text-sm">Ingressos:</span>
                    <span className="text-gray-900 ml-2">
                      {registration.tickets}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Total Pago:</span>
                    <span className="text-gray-900 ml-2">
                      {registration.totalAmount > 0
                        ? `${registration.totalAmount}€`
                        : 'Gratuito'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600 text-sm">
                    <span>Nome: {registration.name}</span>
                    <br />
                    <span>E-mail: {registration.email}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => downloadCertificate(registration.eventTitle)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Certificado
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700">
              Ainda não se inscreveu em nenhum evento.
            </p>
            <Button
              onClick={() => navigate('/eventos')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ver Eventos Disponíveis
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MemberEvents;
