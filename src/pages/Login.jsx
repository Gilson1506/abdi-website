import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/assets/components/ui/use-toast';
import ImageCarousel from '@/assets/components/ImageCarousel';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      toast({
        title: 'Campos Obrigatórios',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      
      toast({
        title: 'Login Realizado!',
        description: `Bem-vindo de volta!`,
      });

      navigate('/area-associado');
    } catch (error) {
      toast({
        title: 'Erro no Login',
        description: error.message || 'Credenciais inválidas. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Entrar - Associação</title>
        <meta
          name="description"
          content="Faça login na sua conta da associação para acessar a área do membro e participar da nossa comunidade."
        />
        <meta property="og:title" content="Entrar - Associação" />
        <meta
          property="og:description"
          content="Faça login na sua conta da associação para acessar a área do membro e participar da nossa comunidade."
        />
      </Helmet>

      <div className="min-h-screen flex">
        <div className="hidden md:block w-1/2">
          <ImageCarousel fullHeight={true} />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Seta de Volta */}
            <div className="mb-6">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar à página inicial
              </button>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <img
                src="/logo2.png"
                alt="Logo"
                className="w-30 h-20 object-contain mx-auto mb-4"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            
              <p className="text-gray-700">Entre na sua conta para continuar</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  E-mail
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
                  Senha
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
                    placeholder="Digite sua senha"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 text-sm">Lembrar-me</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    toast({
                      title:
                        '🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Pode solicitá-la no seu próximo prompt! 🚀',
                    });
                  }}
                  className="text-blue-600 hover:text-blue-500 text-sm"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 hover-glow text-white"
                size="lg"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>


            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-700">
                Ainda não tem conta?{' '}
                <Link
                  to="/registro"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Registre-se aqui
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
