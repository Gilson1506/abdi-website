import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Lightbulb, FileText, Target, Users } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/assets/components/ui/use-toast';

const IdeaSubmissionModal = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    foundation: '',
    category: 'technology',
    banner: null,
    bannerPreview: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'technology', label: 'Tecnologia', icon: '💻' },
    { value: 'sustainability', label: 'Sustentabilidade', icon: '🌱' },
    { value: 'health', label: 'Saúde', icon: '🏥' },
    { value: 'education', label: 'Educação', icon: '📚' },
    { value: 'social', label: 'Social', icon: '🤝' },
    { value: 'business', label: 'Negócios', icon: '💼' },
    { value: 'creative', label: 'Criativo', icon: '🎨' },
    { value: 'other', label: 'Outro', icon: '✨' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: 'Arquivo muito grande',
          description: 'O banner deve ter menos de 5MB.',
          variant: 'destructive',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          banner: file,
          bannerPreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBanner = () => {
    setFormData(prev => ({
      ...prev,
      banner: null,
      bannerPreview: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.foundation.trim()) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular upload do banner
      const bannerUrl = formData.bannerPreview || 'https://images.unsplash.com/photo-1665220509244-fe8459807991';
      
      const ideaData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        foundation: formData.foundation.trim(),
        category: formData.category,
        banner: bannerUrl,
        author: user.name,
        authorId: user.id,
        status: 'under-review',
        votes: 0,
        views: 0,
        comments: [],
        createdAt: new Date().toISOString(),
      };

      await onSubmit(ideaData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        foundation: '',
        category: 'technology',
        banner: null,
        bannerPreview: null,
      });
      
      onClose();
      
      toast({
        title: 'Ideia Submetida com Sucesso! 🎉',
        description: 'A sua ideia foi enviada para análise e será publicada em breve.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao submeter ideia',
        description: 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      foundation: '',
      category: 'technology',
      banner: null,
      bannerPreview: null,
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
          className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lightbulb className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Submeter Nova Ideia</h2>
                  <p className="text-blue-100">Transforme sua visão em realidade</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            {/* Banner Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Banner da Ideia (Opcional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors">
                {formData.bannerPreview ? (
                  <div className="relative">
                    <img
                      src={formData.bannerPreview}
                      alt="Banner preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removeBanner}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600">
                        Clique para fazer upload ou arraste uma imagem
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG até 5MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerChange}
                      className="hidden"
                      id="banner-upload"
                    />
                    <label
                      htmlFor="banner-upload"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                    >
                      Escolher Imagem
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Título da Ideia *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Digite um título claro e conciso para sua ideia..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                maxLength={100}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Máximo 100 caracteres</span>
                <span>{formData.title.length}/100</span>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Categoria *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <label
                    key={category.value}
                    className={`flex items-center space-x-2 p-3 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.category === category.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {category.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Descrição da Ideia *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descreva sua ideia de forma clara e detalhada..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                maxLength={500}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Máximo 500 caracteres</span>
                <span>{formData.description.length}/500</span>
              </div>
            </div>

            {/* Foundation */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fundamentação da Ideia *
              </label>
              <textarea
                name="foundation"
                value={formData.foundation}
                onChange={handleInputChange}
                placeholder="Explique o fundamento, justificativa e benefícios da sua ideia..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                maxLength={1000}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>Máximo 1000 caracteres</span>
                <span>{formData.foundation.length}/1000</span>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                Dicas para uma boa submissão:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Seja claro e específico na descrição</li>
                <li>• Explique os benefícios e impacto esperado</li>
                <li>• Inclua exemplos práticos quando possível</li>
                <li>• Revise o texto antes de submeter</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="flex-1 px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300"
                disabled={isSubmitting}
              >
                Limpar Formulário
              </Button>
              <Button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submetendo...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>Submeter Ideia</span>
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

export default IdeaSubmissionModal;


