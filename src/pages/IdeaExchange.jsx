import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/assets/components/ui/use-toast';
import IdeaFilters from '@/assets/components/idea-exchange/IdeaFilters';
import IdeaCard from '@/assets/components/idea-exchange/IdeaCard';
import SubmitIdeaForm from '@/assets/components/idea-exchange/SubmitIdeaForm';

const IdeaExchange = () => {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'all',
    status: 'all',
    sortBy: 'recent',
  });

  useEffect(() => {
    const savedIdeas = JSON.parse(localStorage.getItem('ideas') || '[]');
    setIdeas(savedIdeas);
  }, []);

  const filteredIdeas = useMemo(() => {
    let filtered = [...ideas];

    if (filters.searchTerm) {
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          idea.description
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter((idea) => idea.category === filters.category);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter((idea) => idea.status === filters.status);
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'votes':
          return (b.votes || 0) - (a.votes || 0);
        case 'comments':
          return (b.comments?.length || 0) - (a.comments?.length || 0);
        case 'recent':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  }, [ideas, filters]);

  const handleSubmitIdea = (newIdeaData) => {
    if (!user) {
      toast({
        title: 'Acesso Negado',
        description: 'Precisa de fazer login para submeter uma ideia.',
        variant: 'destructive',
      });
      return;
    }

    const idea = {
      id: Date.now(),
      ...newIdeaData,
      author: user.name,
      authorId: user.id,
      status: 'under-review',
      votes: 0,
      views: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    };

    const updatedIdeas = [idea, ...ideas];
    setIdeas(updatedIdeas);
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
    setShowSubmitForm(false);

    toast({
      title: 'Ideia Submetida!',
      description: 'A sua ideia foi submetida com sucesso e está em análise.',
    });
  };

  const handleVote = (ideaId) => {
    if (!user) {
      toast({
        title: 'Acesso Negado',
        description: 'Precisa de fazer login para votar.',
        variant: 'destructive',
      });
      return;
    }

    const updatedIdeas = ideas.map((idea) => {
      if (idea.id === ideaId) {
        const hasVoted = idea.voters?.includes(user.id);
        return {
          ...idea,
          votes: hasVoted
            ? (idea.voters || []).filter((id) => id !== user.id)
            : [...(idea.voters || []), user.id],
        };
      }
      return idea;
    });

    setIdeas(updatedIdeas);
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
  };

  const handleComment = (ideaId) => {
    if (!user) {
      toast({
        title: 'Acesso Negado',
        description: 'Precisa de fazer login para comentar.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title:
        '🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Pode solicitá-la no seu próximo prompt! 🚀',
    });
  };

  return (
    <>
      <Helmet>
        <title>Bolsa de Ideias - Associação</title>
        <meta
          name="description"
          content="Submeta suas ideias inovadoras, vote nas melhores propostas e acompanhe o desenvolvimento de projetos na nossa bolsa de ideias."
        />
        <meta property="og:title" content="Bolsa de Ideias - Associação" />
        <meta
          property="og:description"
          content="Submeta suas ideias inovadoras, vote nas melhores propostas e acompanhe o desenvolvimento de projetos na nossa bolsa de ideias."
        />
      </Helmet>

      <div className="py-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Bolsa de <span className="gradient-text">Ideias</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Transforme suas ideias em realidade. Submeta, vote e colabore no
              desenvolvimento de projetos inovadores.
            </p>
            <Button
              onClick={() => setShowSubmitForm(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 hover-glow text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Submeter Nova Ideia
            </Button>
          </motion.div>
        </section>

        <IdeaFilters filters={filters} onFilterChange={setFilters} />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredIdeas.length > 0 ? (
            <div className="grid gap-6">
              {filteredIdeas.map((idea, index) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  index={index}
                  onVote={handleVote}
                  onComment={handleComment}
                  user={user}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-700 text-lg">Nenhuma ideia encontrada.</p>
              <p className="text-gray-500 text-sm">
                Seja o primeiro a submeter uma ideia!
              </p>
            </div>
          )}
        </section>

        {showSubmitForm && (
          <SubmitIdeaForm
            isOpen={showSubmitForm}
            onClose={() => setShowSubmitForm(false)}
            onSubmit={handleSubmitIdea}
          />
        )}
      </div>
    </>
  );
};

export default IdeaExchange;
