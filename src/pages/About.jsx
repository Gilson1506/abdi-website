import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Lightbulb, Rocket } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Loader from '@/assets/components/ui/Loader';

const About = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, full_name, role, email')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const mappedTeam = (data || []).map(member => ({
        id: member.id,
        name: member.full_name,
        role: member.role,
        image: 'https://images.unsplash.com/photo-1575383596664-30f4489f9786',
        description: `Membro da equipe com função de ${member.role}`,
      }));

      setTeam(mappedTeam);
    } catch (error) {
      console.error('Erro ao carregar equipe:', error);
      // Fallback para dados estáticos em caso de erro
      setTeam([
        {
          id: '1',
          name: 'Ana Silva',
          role: 'Presidente',
          image: 'https://images.unsplash.com/photo-1575383596664-30f4489f9786',
          description: 'Especialista em inovação e gestão de projetos com mais de 10 anos de experiência.',
        },
        {
          id: '2',
          name: 'João Santos',
          role: 'Vice-Presidente',
          image: 'https://images.unsplash.com/photo-1575383596664-30f4489f9786',
          description: 'Engenheiro de software apaixonado por tecnologia e desenvolvimento sustentável.',
        },
        {
          id: '3',
          name: 'Maria Costa',
          role: 'Secretária',
          image: 'https://images.unsplash.com/photo-1575383596664-30f4489f9786',
          description: 'Especialista em comunicação e gestão de comunidades digitais.',
        },
        {
          id: '4',
          name: 'Pedro Oliveira',
          role: 'Tesoureiro',
          image: 'https://images.unsplash.com/photo-1575383596664-30f4489f9786',
          description: 'Analista financeiro com experiência em gestão de organizações sem fins lucrativos.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const values = [
    {
      icon: Lightbulb,
      title: 'Inovação',
      description:
        'Promovemos o pensamento criativo e soluções inovadoras para desafios complexos.',
    },
    {
      icon: Users,
      title: 'Colaboração',
      description:
        'Acreditamos no poder da colaboração e do trabalho em equipa para alcançar objetivos comuns.',
    },
    {
      icon: Target,
      title: 'Impacto',
      description:
        'Focamos em projetos que geram impacto positivo na sociedade e no meio ambiente.',
    },
    {
      icon: Heart,
      title: 'Paixão',
      description:
        'Fazemos tudo com paixão e dedicação, acreditando no potencial de cada ideia.',
    },
  ];

  const handleDownloadStatutes = async () => {
    const { toast } = await import('@/assets/components/ui/use-toast');
    toast({
      title:
        '🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Pode solicitá-la no seu próximo prompt! 🚀',
    });
  };

  return (
    <>
      <Helmet>
        <title>Sobre Nós - Associação</title>
        <meta
          name="description"
          content="Conheça a nossa história, missão, valores e equipa. Somos uma associação dedicada à inovação e colaboração."
        />
        <meta property="og:title" content="Sobre Nós - Associação" />
        <meta
          property="og:description"
          content="Conheça a nossa história, missão, valores e equipa. Somos uma associação dedicada à inovação e colaboração."
        />
      </Helmet>

      <div className="py-20">
        {loading && <Loader />}
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Sobre <span className="gradient-text">Nós</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Somos uma associação dedicada a fomentar a inovação, promover a
              colaboração e transformar ideias em projetos impactantes.
            </p>
          </motion.div>
        </section>

        {/* História */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Fundada em 2025, a nossa associação nasceu da necessidade de
                  criar um espaço onde ideias inovadoras pudessem florescer e se
                  transformar em projetos concretos que beneficiam a sociedade.
                </p>
                <p>
                  Começámos como um pequeno grupo de entusiastas da tecnologia e
                  inovação, e hoje somos uma comunidade vibrante de membros
                  ativos, incluindo empreendedores, desenvolvedores,
                  designers e visionários.
                </p>
                <p>
                  Ao longo dos anos, facilitámos o desenvolvimento de diversos
                  projetos, organizámos inúmeros eventos e criámos uma
                  plataforma única para a partilha e desenvolvimento de ideias.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect p-8 rounded-3xl"
            >
              <img
                alt="História da associação"
                src="/img2.jpg"
                className="w-full h-64 object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Missão e Visão */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect p-8 rounded-3xl hover-glow"
            >
              <Target className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nossa Missão
              </h3>
              <p className="text-gray-700">
                Fomentar a inovação e a colaboração através da criação de uma
                plataforma que conecta mentes criativas, facilita o
                desenvolvimento de ideias e promove projetos que geram impacto
                positivo na sociedade.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-effect p-8 rounded-3xl hover-glow"
            >
              <Rocket className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nossa Visão
              </h3>
              <p className="text-gray-700">
                Ser a principal plataforma de inovação colaborativa, onde cada
                ideia tem o potencial de se transformar num projeto impactante,
                criando um ecossistema sustentável de criatividade e
                desenvolvimento.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Valores */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos <span className="gradient-text">Valores</span>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Os valores que nos guiam em tudo o que fazemos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-2xl text-center hover-glow"
              >
                <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Equipa */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossa <span className="gradient-text">Equipa</span>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Conheça as pessoas que tornam tudo isto possível
            </p>
          </motion.div>

          {!loading && team.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-6 rounded-2xl text-center hover-glow"
              >
                <img
                  alt={`${member.name} - ${member.role}`}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  src={member.image}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                <p className="text-gray-700 text-xs">{member.description}</p>
              </motion.div>
            ))}
            </div>
          ) : !loading ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-700 text-lg">Nenhum membro da equipe disponível no momento.</p>
              <p className="text-gray-500 text-sm mt-2">
                A equipe será atualizada em breve.
              </p>
            </div>
          ) : null}
        </section>

        {/* Estatutos */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect p-8 rounded-3xl text-center"
          >
            <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Estatutos da Associação
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Os nossos estatutos definem a estrutura, objetivos e funcionamento
              da associação, garantindo transparência e boa governança.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors hover-glow"
              onClick={handleDownloadStatutes}
            >
              Descarregar Estatutos (PDF)
            </button>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default About;
