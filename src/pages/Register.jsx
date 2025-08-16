import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/assets/components/ui/use-toast';
import ImageCarousel from '@/assets/components/ImageCarousel';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validações
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast({
        title: 'Campos Obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Senhas Não Coincidem',
        description: 'As senhas digitadas não coincidem.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Senha Muito Curta',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      toast({
        title: 'Termos e Condições',
        description: 'Você deve aceitar os termos e condições para continuar.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Simular registro
    setTimeout(() => {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      register(userData);

      toast({
        title: 'Conta Criada!',
        description: `Bem-vindo à nossa comunidade, ${userData.name}!`,
      });

      navigate('/area-associado');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Registrar - Associação</title>
        <meta
          name="description"
          content="Crie sua conta na associação e faça parte da nossa comunidade inovadora. Registre-se gratuitamente."
        />
        <meta property="og:title" content="Registrar - Associação" />
        <meta
          property="og:description"
          content="Crie sua conta na associação e faça parte da nossa comunidade inovadora. Registre-se gratuitamente."
        />
      </Helmet>

      <div className="py-10 md:py-16 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <ImageCarousel />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect p-8 rounded-3xl max-w-md w-full mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Junte-se a Nós
              </h1>
              <p className="text-gray-700">
                Crie sua conta e faça parte da nossa comunidade
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  E-mail *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite seu e-mail"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite seu telefone (opcional)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Senha *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-12 pr-12 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite sua senha (min. 6 caracteres)"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Confirmar Senha *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-12 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirme sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 rounded focus:ring-blue-500 mt-1"
                />
                <label htmlFor="acceptTerms" className="text-gray-700 text-sm">
                  Aceito os{' '}
                  <button
                    type="button"
                    onClick={() => {
                      toast({
                        title:
                          '🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Pode solicitá-la no seu próximo prompt! 🚀',
                      });
                    }}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    termos e condições
                  </button>{' '}
                  e a{' '}
                  <button
                    type="button"
                    onClick={() => {
                      toast({
                        title:
                          '🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Pode solicitá-la no seu próximo prompt! 🚀',
                      });
                    }}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    política de privacidade
                  </button>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 hover-glow text-white"
                size="lg"
              >
                {isLoading ? 'Criando Conta...' : 'Criar Conta'}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-700">
                Já tem uma conta?{' '}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Faça login aqui
                </Link>
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-gray-900 font-medium mb-3 text-center">
                Benefícios de ser membro:
              </h3>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Submeter e votar em ideias inovadoras</li>
                <li>• Participar em projetos colaborativos</li>
                <li>• Acesso exclusivo a eventos e workshops</li>
                <li>• Networking com outros inovadores</li>
                <li>• Certificados de participação</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
