import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = () => {
    const news = JSON.parse(localStorage.getItem('news') || '[]');
    const foundArticle = news.find(n => n.id === parseInt(id));
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Carregar notícias relacionadas (mesma categoria, excluindo a atual)
      const related = news
        .filter(n => n.id !== foundArticle.id && n.category === foundArticle.category)
        .slice(0, 3);
      setRelatedNews(related);
    } else {
      navigate('/noticias');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', {
      weekday: 'long',
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

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        // Copiar para clipboard
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: "Link Copiado!",
            description: "O link foi copiado para a área de transferência."
          });
        });
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (!article) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-700">Carregando artigo...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - Notícias - Associação</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={`${article.title} - Notícias - Associação`} />
        <meta property="og:description" content={article.excerpt} />
      </Helmet>

      <div className="py-20">
        {/* Header */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/noticias')}
            className="text-gray-700 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar às Notícias
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Categoria e Data */}
            <div className="flex items-center justify-between mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(article.date)}
              </div>
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Autor e Compartilhamento */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center text-gray-700">
                <User className="w-5 h-5 mr-2" />
                <span>Por {article.author}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 text-sm mr-3">Compartilhar:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Imagem Principal */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
          >
            <img  
              alt={`Imagem principal do artigo: ${article.title}`}
              className="w-full h-64 md:h-96 object-cover"
             src="https://images.unsplash.com/photo-1548778052-311f4bc2b502" />
          </motion.div>
        </section>

        {/* Conteúdo do Artigo */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-effect p-8 rounded-3xl"
          >
            {/* Resumo */}
            <div className="mb-8 p-6 bg-blue-500/10 rounded-2xl border-l-4 border-blue-600">
              <p className="text-lg text-gray-900 leading-relaxed italic">
                {article.excerpt}
              </p>
            </div>

            {/* Conteúdo Principal */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed space-y-6">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                
                {/* Conteúdo adicional simulado */}
                <p>
                  Esta iniciativa representa um marco importante no desenvolvimento da nossa associação e demonstra o nosso compromisso contínuo com a inovação e excelência.
                </p>
                
                <p>
                  Convidamos todos os membros da nossa comunidade a participarem ativamente e a contribuírem para o sucesso desta e de futuras iniciativas. Juntos, podemos alcançar resultados extraordinários.
                </p>
                
                <p>
                  Para mais informações ou esclarecimentos, não hesitem em contactar a nossa equipa através dos canais oficiais de comunicação.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  #{article.category.toLowerCase()}
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  #associação
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  #inovação
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  #comunidade
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Notícias Relacionadas */}
        {relatedNews.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Notícias <span className="gradient-text">Relacionadas</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedNews.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-2xl overflow-hidden hover-glow"
                >
                  <div className="h-32 relative">
                    <img  
                      alt={`Imagem da notícia: ${relatedArticle.title}`}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1548778052-311f4bc2b502" />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center text-gray-600 text-xs mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(relatedArticle.date)}
                    </div>
                    
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-700 text-xs mb-3 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/noticias/${relatedArticle.id}`)}
                      className="text-blue-600 hover:text-blue-500 p-0 h-auto font-medium text-xs"
                    >
                      Ler Mais →
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default NewsDetails;