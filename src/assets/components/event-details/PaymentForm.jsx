import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/assets/components/ui/button';
import { CreditCard, Smartphone, Building, Euro } from 'lucide-react';

const PaymentForm = ({
  isOpen,
  onClose,
  onSubmit,
  event,
  registrationData,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const totalPrice = useMemo(() => {
    if (event.price === 'Gratuito') return 0;
    return parseFloat(event.price.replace('€', '')) * registrationData.tickets;
  }, [event.price, registrationData.tickets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(paymentMethod);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Pagamento Seguro</h2>
        <div className="mb-6 bg-white/5 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70">Evento:</span>
            <span className="text-white">{event.title}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70">Ingressos:</span>
            <span className="text-white">{registrationData.tickets}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-semibold">
            <span className="text-white">Total:</span>
            <span className="text-purple-400">{totalPrice}€</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-4">
              Método de Pagamento
            </label>
            <div className="space-y-3">
              <label className="flex items-center p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <CreditCard className="w-5 h-5 text-purple-400 mr-3" />
                <span className="text-white">Cartão de Crédito/Débito</span>
              </label>
              <label className="flex items-center p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <Building className="w-5 h-5 text-purple-400 mr-3" />
                <span className="text-white">Referência Bancária</span>
              </label>
              <label className="flex items-center p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mobile"
                  checked={paymentMethod === 'mobile'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <Smartphone className="w-5 h-5 text-purple-400 mr-3" />
                <span className="text-white">Pagamento Móvel</span>
              </label>
            </div>
          </div>
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Validade
                  </label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex space-x-4">
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 hover-glow"
            >
              <Euro className="w-4 h-4 mr-2" />
              Pagar {totalPrice}€
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/30 text-white hover:bg-white/10"
            >
              Voltar
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PaymentForm;
