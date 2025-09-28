import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/assets/components/ui/button';
import { toast } from '@/assets/components/ui/use-toast';
import { User, Mail, Phone, MapPin, Calendar, Building, Globe } from 'lucide-react';

const MemberSettings = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || '',
    country: user.country || '',
    organization: user.organization || '',
    website: user.website || '',
    bio: user.bio || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    toast({
      title: 'Perfil Atualizado!',
      description: 'As suas informações foram salvas com sucesso.',
    });
  };

  const handleReset = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      country: user.country || '',
      organization: user.organization || '',
      website: user.website || '',
      bio: user.bio || '',
    });
    toast({
      title: 'Formulário Resetado',
      description: 'As alterações foram descartadas.',
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
        
        <form className="space-y-6">
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Informações Pessoais
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-medium mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="block text-gray-800 font-medium mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-medium mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="+351 123 456 789"
                />
              </div>
              
              <div>
                <label className="block text-gray-800 font-medium mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Data de Registo
                </label>
                <input
                  type="text"
                  value={new Date(user.createdAt).toLocaleDateString('pt-PT')}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Endereço
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-medium mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Endereço
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Rua, número, complemento"
                />
              </div>
              
              <div>
                <label className="block text-gray-800 font-medium mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Cidade
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Sua cidade"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                País
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="Seu país"
              />
            </div>
          </div>

          {/* Informações Profissionais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Informações Profissionais
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-medium mb-2 flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Organização/Empresa
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Nome da organização"
                />
              </div>
              
              <div>
                <label className="block text-gray-800 font-medium mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="https://seusite.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Biografia
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                placeholder="Conte-nos um pouco sobre si..."
              />
            </div>
          </div>

          {/* Ações */}
          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Salvar Alterações
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl transition-all duration-300"
            >
              Resetar Formulário
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default MemberSettings;
