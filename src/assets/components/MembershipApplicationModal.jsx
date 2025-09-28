import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, User, Mail, Phone, MapPin, Building, Globe, Download, Eye } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { toast } from '@/assets/components/ui/use-toast';

const MembershipApplicationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    organization: '',
    website: '',
    bio: '',
    motivation: '',
    expertise: '',
    experience: '',
    interests: [],
    resume: null,
    resumePreview: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interests = [
    'Tecnologia e Inovação',
    'Sustentabilidade',
    'Saúde e Bem-estar',
    'Educação',
    'Empreendedorismo',
    'Pesquisa e Desenvolvimento',
    'Arte e Cultura',
    'Desporto',
    'Voluntariado',
    'Outro'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: 'Formato inválido',
          description: 'Por favor, selecione um arquivo PDF.',
          variant: 'destructive',
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'Arquivo muito grande',
          description: 'O currículo deve ter menos de 10MB.',
          variant: 'destructive',
        });
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file,
        resumePreview: file.name
      }));
    }
  };

  const removeResume = () => {
    setFormData(prev => ({
      ...prev,
      resume: null,
      resumePreview: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.motivation.trim() || !formData.resume) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios e anexe o currículo.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular submissão da candidatura
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Candidatura Enviada com Sucesso! 🎉',
        description: 'A sua candidatura foi recebida e será analisada pela nossa equipa. Entraremos em contacto em breve.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        organization: '',
        website: '',
        bio: '',
        motivation: '',
        expertise: '',
        experience: '',
        interests: [],
        resume: null,
        resumePreview: null,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Erro ao enviar candidatura',
        description: 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      organization: '',
      website: '',
      bio: '',
      motivation: '',
      expertise: '',
      experience: '',
      interests: [],
      resume: null,
      resumePreview: null,
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-2 sm:mx-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <User className="w-6 h-6 sm:w-8 sm:h-8" />
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Candidatura de Membro</h2>
                  <p className="text-blue-100 text-sm sm:text-base">Junte-se à nossa comunidade de inovadores</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors touch-manipulation"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)] overflow-y-auto">
            {/* Informações Pessoais */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Informações Pessoais
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="+351 123 456 789"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Organização/Empresa
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Nome da organização"
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Endereço
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
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
                  <label className="block text-sm font-medium text-gray-700">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    País
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Seu país"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="https://seusite.com"
                  />
                </div>
              </div>
            </div>

            {/* Perfil Profissional */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Perfil Profissional
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Biografia
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                  placeholder="Conte-nos um pouco sobre si..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Área de Especialização
                </label>
                <input
                  type="text"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Ex: Tecnologia, Saúde, Educação, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Anos de Experiência
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Ex: 5 anos em desenvolvimento de software"
                />
              </div>
            </div>

            {/* Interesses */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Áreas de Interesse
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {interests.map((interest) => (
                  <label
                    key={interest}
                    className={`flex items-center space-x-2 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.interests.includes(interest)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="sr-only"
                    />
                    <span className={`text-sm font-medium ${
                      formData.interests.includes(interest) ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {interest}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Motivação */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Motivação para Candidatura *
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Por que quer ser membro da nossa associação?
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                  placeholder="Explique sua motivação para se juntar à nossa comunidade..."
                  maxLength={500}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.motivation.length}/500
                </div>
              </div>
            </div>

            {/* Upload de Currículo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Currículo *
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors">
                {formData.resumePreview ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-blue-600">
                      <FileText className="w-8 h-8" />
                      <span className="font-medium">{formData.resumePreview}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (formData.resume) {
                            const url = URL.createObjectURL(formData.resume);
                            window.open(url, '_blank');
                          }
                        }}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeResume}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remover
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600">
                        Clique para fazer upload do seu currículo
                      </p>
                      <p className="text-sm text-gray-500">
                        Apenas arquivos PDF até 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      Escolher PDF
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Benefícios */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                Benefícios de ser membro:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Acesso exclusivo a eventos e workshops</li>
                <li>• Networking com outros inovadores</li>
                <li>• Participação em projetos colaborativos</li>
                <li>• Mentoria e desenvolvimento profissional</li>
                <li>• Acesso a recursos e ferramentas exclusivas</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="flex-1 px-4 sm:px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300 touch-manipulation"
                disabled={isSubmitting}
              >
                Limpar Formulário
              </Button>
              <Button
                type="submit"
                className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 touch-manipulation"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Enviar Candidatura</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MembershipApplicationModal;
