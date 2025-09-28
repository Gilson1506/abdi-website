import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Rocket,
  ExternalLink,
  Download,
  Filter,
  Search,
  Calendar,
  User,
} from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { toast } from '@/assets/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import Loader from '@/assets/components/ui/Loader';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    'Tecnologia',
    'Sustentabilidade',
    'Educação',
    'Saúde',
    'Inovação Social',
    'Empreendedorismo',
    'Arte & Cultura',
    'Outro',
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedCategory, selectedStatus]);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const mappedProjects = (data || []).map(project => ({
        id: project.id,
        title: project.title,
        description: project.description || '',
        category: project.category || 'Tecnologia',
        status: project.status === 'approved' ? 'completed' : 'in-progress',
        date: project.created_at,
        author: project.author || 'Equipa ABDI',
        logo: project.banner_image || 'https://images.unsplash.com/photo-1572177812156-58036aae439c',
        webapp: project.webapp_url || null,
        pdf: project.document_url || null,
      }));
      
      setProjects(mappedProjects);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = [...projects];

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(
        (project) => project.status === selectedStatus
      );
    }

    setFilteredProjects(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-600';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-600';
      case 'planned':
        return 'bg-orange-500/20 text-orange-600';
      default:
        return 'bg-gray-500/20 text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in-progress':
        return 'Em Andamento';
      case 'planned':
        return 'Planejado';
      default:
        return 'Desconhecido';
    }
  };

  const handleWebappClick = (webapp) => {
    if (webapp) {
      window.open(webapp, '_blank');
    } else {
      toast({
        title:
          '🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Pode solicitá-la no seu próximo prompt! 🚀',
      });
    }
  };

  const handleDownloadPDF = (pdf) => {
    toast({
      title:
        '🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Pode solicitá-la no seu próximo prompt! 🚀',
    });
  };

  return (
    <>
      <Helmet>
        <title>Projetos - Associação</title>
        <meta
          name="description"
          content="Explore nossos projetos inovadores em diferentes categorias. Veja projetos concluídos, em andamento e planejados pela nossa comunidade."
        />
        <meta property="og:title" content="Projetos - Associação" />
        <meta
          property="og:description"
          content="Explore nossos projetos inovadores em diferentes categorias. Veja projetos concluídos, em andamento e planejados pela nossa comunidade."
        />
      </Helmet>

      <div className="py-20">
        {loading && <Loader />}
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nossos <span className="gradient-text">Projetos</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Descubra os projetos inovadores desenvolvidos pela nossa
              comunidade, desde ideias transformadas em realidade até
              iniciativas em desenvolvimento.
            </p>
          </motion.div>
        </section>

        {/* Filtros */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="glass-effect p-6 rounded-2xl">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Pesquisar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas as Categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-white">
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os Status</option>
                <option value="completed" className="bg-white">
                  Concluídos
                </option>
                <option value="in-progress" className="bg-white">
                  Em Andamento
                </option>
                <option value="planned" className="bg-white">
                  Planejados
                </option>
              </select>

              <div className="flex items-center justify-center">
                <Filter className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-gray-700 text-sm">
                  {filteredProjects.length} projetos
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Projetos */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!loading && filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect p-6 rounded-2xl hover-glow"
                >
                  {/* Logo do Projeto */}
                  <div className="mb-6">
                    <img
                      alt={`Logo do projeto ${project.title}`}
                      className="w-full h-48 object-cover rounded-xl"
                      src="https://images.unsplash.com/photo-1572177812156-58036aae439c"
                    />
                  </div>

                  {/* Status e Categoria */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {getStatusText(project.status)}
                    </span>
                    <span className="text-blue-600 text-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Título e Descrição */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Informações do Projeto */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(project.date).toLocaleDateString('pt-PT')}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <User className="w-4 h-4 mr-2" />
                      {project.author}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex space-x-2">
                    {project.webapp ? (
                      <Button
                        onClick={() => handleWebappClick(project.webapp)}
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver App
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleWebappClick(null)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-300 text-gray-700"
                        disabled
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Em Breve
                      </Button>
                    )}

                    <Button
                      onClick={() => handleDownloadPDF(project.pdf)}
                      size="sm"
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-100"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : !loading ? (
            <div className="text-center py-12">
              <Rocket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-700 text-lg">
                {filteredProjects.length === 0 && projects.length === 0 
                  ? 'Nenhum projeto disponível no momento.' 
                  : 'Nenhum projeto encontrado com os filtros aplicados.'}
              </p>
              <p className="text-gray-500 text-sm">
                {projects.length === 0 
                  ? 'Novos projetos serão adicionados em breve.'
                  : 'Tente ajustar os filtros de pesquisa.'}
              </p>
            </div>
          ) : null}
        </section>

        {/* Estatísticas */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect p-8 rounded-3xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Estatísticas dos <span className="gradient-text">Projetos</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {projects.filter((p) => p.status === 'completed').length}
                </div>
                <div className="text-gray-700">Projetos Concluídos</div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {projects.filter((p) => p.status === 'in-progress').length}
                </div>
                <div className="text-gray-700">Em Andamento</div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {projects.filter((p) => p.status === 'planned').length}
                </div>
                <div className="text-gray-700">Planejados</div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      
    </>
  );
};

export default Projects;
