import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Filter, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import Loader from '@/assets/components/ui/Loader';

const News = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
  
    const categories = [
      'Notícias', 'Comunicados', 'Eventos', 'Projetos', 'Inovação', 'Comunidade'
    ];
  
    useEffect(() => {
      loadNews();
    }, []);
  
    useEffect(() => {
      filterNews();
    }, [news, searchTerm, selectedCategory]);
  
    const loadNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('id,title,subtitle,slug,content,cover_image_url,status,created_at')
          .eq('status', 'published')
          .order('created_at', { ascending: false });
        if (error) throw error;
        const mapped = (data || []).map(n => ({
          id: n.id,
          title: n.title,
          excerpt: n.subtitle || '',
          content: n.content || '',
          category: 'Notícias',
          author: 'ABDI',
          date: n.created_at,
          image: n.cover_image_url || 'https://images.unsplash.com/photo-1662485732745-5a841bfe7f65'
        }));
        setNews(mapped);
      } catch (e) {
        setNews([]);
      } finally {
        setLoading(false);
      }
    };
  
    const filterNews = () => {
      let filtered = [...news];
  
      if (searchTerm) {
        filtered = filtered.filter(article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(article => article.category === selectedCategory);
      }
  
      // Ordenar por data (mais recentes primeiro)
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      setFilteredNews(filtered);
    };
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
  
    const getCategoryColor = (category) => {
      switch (category) {
        case 'Notícias': return 'bg-blue-500/20 text-blue-600';
        case 'Comunicados': return 'bg-red-500/20 text-red-600';
        case 'Eventos': return 'bg-green-500/20 text-green-600';
        case 'Projetos': return 'bg-orange-500/20 text-orange-600';
        case 'Inovação': return 'bg-blue-500/20 text-blue-600';
        case 'Comunidade': return 'bg-gray-500/20 text-gray-600';
        default: return 'bg-gray-500/20 text-gray-600';
      }
    };
  
    const handleNewsletterSubscribe = async () => {
      const { toast } = await import('@/components/ui/use-toast');
      toast({
        title: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Pode solicitá-la no seu próximo prompt! 🚀"
      });
    };
  
    const featuredNews = filteredNews.filter(article => article.featured);
    const regularNews = filteredNews.filter(article => !article.featured);
  
    return (
      <>
        <Helmet>
          <title>Notícias - Associação</title>
          <meta name="description" content="Fique por dentro das últimas notícias, comunicados e novidades da nossa associação. Acompanhe projetos, eventos e inovações." />
          <meta property="og:title" content="Notícias - Associação" />
          <meta property="og:description" content="Fique por dentro das últimas notícias, comunicados e novidades da nossa associação. Acompanhe projetos, eventos e inovações." />
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
                <span className="gradient-text">Notícias</span> & Comunicados
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Fique por dentro das últimas novidades, projetos e eventos da nossa comunidade inovadora.
              </p>
            </motion.div>
          </section>
  
          {/* Filtros */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="glass-effect p-6 rounded-2xl">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Pesquisar notícias..."
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
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>
  
          {/* Notícias em Destaque */}
          {featuredNews.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Em <span className="gradient-text">Destaque</span>
                </h2>
              </motion.div>
  
              <div className="grid md:grid-cols-2 gap-8">
                {featuredNews.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-effect rounded-2xl overflow-hidden hover-glow"
                  >
                    <div className="h-48 relative">
                      <img  
                        alt={`Imagem da notícia: ${article.title}`}
                        className="w-full h-full object-cover"
                       src="https://images.unsplash.com/photo-1662485732745-5a841bfe7f65" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(article.date)}
                        <User className="w-4 h-4 ml-4 mr-2" />
                        {article.author}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                      <p className="text-gray-700 mb-4 line-clamp-3">{article.excerpt}</p>
                      
                      <Link to={`/noticias/${article.id}`}>
                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                          Ler Mais
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
  
          {/* Todas as Notícias */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {regularNews.length > 0 && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Todas as <span className="gradient-text">Notícias</span>
                  </h2>
                </motion.div>
  
                <div className="grid gap-6">
                  {regularNews.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="glass-effect p-6 rounded-2xl hover-glow"
                    >
                      <div className="md:flex gap-6">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <img  
                            alt={`Imagem da notícia: ${article.title}`}
                            className="w-full h-32 md:h-24 object-cover rounded-lg"
                           src="https://images.unsplash.com/photo-1662485732745-5a841bfe7f65" />
                        </div>
                        <div className="md:w-3/4">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                              {article.category}
                            </span>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              {formatDate(article.date)}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                          <p className="text-gray-700 mb-4 line-clamp-2">{article.excerpt}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-600 text-sm">
                              <User className="w-4 h-4 mr-2" />
                              {article.author}
                            </div>
                            <Link to={`/noticias/${article.id}`}>
                              <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                                Ler Mais
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
  
            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-700 text-lg">Nenhuma notícia encontrada.</p>
                <p className="text-gray-500 text-sm">Tente ajustar os filtros de pesquisa.</p>
              </div>
            )}
          </section>
  
          {/* Newsletter Subscription */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect p-8 rounded-3xl text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Mantenha-se <span className="gradient-text">Informado</span>
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Subscreva a nossa newsletter e receba as últimas notícias, comunicados e novidades diretamente no seu e-mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Digite o seu e-mail..."
                  className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 hover-glow text-white"
                  onClick={handleNewsletterSubscribe}
                >
                  Subscrever
                </Button>
              </div>
            </motion.div>
          </section>
        </div>
      </>
    );
  };
  
  export default News;