import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: 'Campos Obrigatórios',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive',
      });
      return;
    }

    // Simular envio
    toast({
      title: 'Mensagem Enviada!',
      description: 'Obrigado pelo seu contacto. Responderemos em breve.',
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-mail',
      content: 'contato@associacao.pt',
      description: 'Resposta em até 24 horas',
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '+351 123 456 789',
      description: 'Segunda a Sexta, 9h-18h',
    },
    {
      icon: MapPin,
      title: 'Endereço',
      content: 'Rua da Inovação, 123\n1000-001 Lisboa, Portugal',
      description: 'Sede da Associação',
    },
    {
      icon: Clock,
      title: 'Horário',
      content: 'Segunda a Sexta: 9h-18h\nSábado: 9h-13h',
      description: 'Atendimento presencial',
    },
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: '#' },
    { icon: Twitter, name: 'Twitter', url: '#' },
    { icon: Instagram, name: 'Instagram', url: '#' },
    { icon: Linkedin, name: 'LinkedIn', url: '#' },
  ];

  return (
    <>
      <Helmet>
        <title>Contato - Associação</title>
        <meta
          name="description"
          content="Entre em contato conosco. Estamos aqui para ajudar com suas dúvidas, sugestões e parcerias."
        />
        <meta property="og:title" content="Contato - Associação" />
        <meta
          property="og:description"
          content="Entre em contato conosco. Estamos aqui para ajudar com suas dúvidas, sugestões e parcerias."
        />
      </Helmet>

      <div className="py-20">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Entre em <span className="gradient-text">Contato</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Estamos aqui para ajudar! Entre em contato conosco para dúvidas,
              sugestões ou parcerias.
            </p>
          </motion.div>
        </section>

        {/* Contact Info Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-2xl text-center hover-glow"
              >
                <info.icon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-800 mb-2 whitespace-pre-line">
                  {info.content}
                </p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect p-8 rounded-3xl"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Envie uma Mensagem
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-800 font-medium mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Assunto da sua mensagem"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-800 font-medium mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Escreva sua mensagem aqui..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 hover-glow text-white"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect p-8 rounded-3xl"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa Localização
              </h2>

              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-2xl h-64 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-700">
                    Mapa interativo será carregado aqui
                  </p>
                  <p className="text-gray-500 text-sm mt-2">Lisboa, Portugal</p>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-gray-900 font-medium">
                      Endereço Principal
                    </p>
                    <p className="text-gray-700 text-sm">
                      Rua da Inovação, 123
                      <br />
                      1000-001 Lisboa, Portugal
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-gray-900 font-medium">
                      Horário de Funcionamento
                    </p>
                    <p className="text-gray-700 text-sm">
                      Segunda a Sexta: 9h às 18h
                      <br />
                      Sábado: 9h às 13h
                      <br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Media & Additional Info */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect p-8 rounded-3xl text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Siga-nos nas Redes Sociais
              </h2>
              <p className="text-gray-700 mb-6">
                Mantenha-se atualizado com as nossas últimas novidades e eventos
              </p>

              <div className="flex justify-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500/20 transition-colors hover-glow"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-gray-700 hover:text-blue-600" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* FAQ Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-effect p-8 rounded-3xl"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Perguntas Frequentes
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-gray-900 font-medium mb-2">
                    Como posso tornar-me membro?
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Registe-se na nossa plataforma e comece a participar na
                    nossa comunidade.
                  </p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-gray-900 font-medium mb-2">
                    Como submeto uma ideia?
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Aceda à Bolsa de Ideias e clique em "Submeter Nova Ideia".
                  </p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-gray-900 font-medium mb-2">
                    Os eventos são pagos?
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Temos eventos gratuitos e pagos. Consulte a página de
                    eventos para detalhes.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-6 border-blue-600 text-blue-600 hover:bg-blue-100"
                onClick={() => {
                  toast({
                    title:
                      '🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Pode solicitá-la no seu próximo prompt! 🚀',
                  });
                }}
              >
                Ver Todas as FAQ
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
