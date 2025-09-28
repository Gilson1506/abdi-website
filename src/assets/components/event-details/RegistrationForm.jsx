import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/assets/components/ui/button';

const RegistrationForm = ({
  isOpen,
  onClose,
  onSubmit,
  event,
  availableSpots,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tickets: 1,
  });

  const totalPrice = useMemo(() => {
    if (event.price === 'Gratuito') return 0;
    return parseFloat(event.price.replace('€', '')) * formData.tickets;
  }, [event.price, formData.tickets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          Inscrição no Evento
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Digite o seu nome completo..."
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">
              E-mail *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Digite o seu e-mail..."
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">
              Telefone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Digite o seu telefone..."
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">
              Quantidade de Ingressos
            </label>
            <select
              value={formData.tickets}
              onChange={(e) =>
                setFormData({ ...formData, tickets: parseInt(e.target.value) })
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {[...Array(Math.min(5, availableSpots))].map((_, i) => (
                <option key={i + 1} value={i + 1} className="bg-slate-800">
                  {i + 1} ingresso{i > 0 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          {event.price !== 'Gratuito' && (
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-white">Total a pagar:</span>
                <span className="text-2xl font-bold text-purple-400">
                  {totalPrice}€
                </span>
              </div>
            </div>
          )}
          <div className="flex space-x-4">
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 hover-glow"
            >
              {event.price === 'Gratuito'
                ? 'Confirmar Inscrição'
                : 'Prosseguir para Pagamento'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
