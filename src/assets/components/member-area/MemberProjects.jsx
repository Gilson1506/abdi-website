import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X } from 'lucide-react';
import { Button } from '@/assets/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/assets/components/ui/use-toast';

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

const MemberProjects = ({ projects }) => {
  const { user } = useAuth();
  const [myProjects, setMyProjects] = useState(projects || []);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Tecnologia',
    status: 'planned',
    pdf: null,
  });

  useEffect(() => {
    setMyProjects(projects || []);
  }, [projects]);

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

  const handleSubmitProject = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: 'Preencha os campos obrigatórios', variant: 'destructive' });
      return;
    }
    const newProject = {
      id: Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      status: form.status,
      date: new Date().toISOString().slice(0, 10),
      author: user?.name || 'Você',
      participants: user?.id ? [user.id] : [],
      logo: '',
      webapp: null,
      pdf: form.pdf?.name || null,
    };

    const saved = JSON.parse(localStorage.getItem('projects') || '[]');
    const updated = [newProject, ...saved];
    localStorage.setItem('projects', JSON.stringify(updated));

    // Atualiza a lista local do dashboard
    setMyProjects([newProject, ...myProjects]);

    setShowModal(false);
    setForm({ title: '', description: '', category: 'Tecnologia', status: 'planned', pdf: null });
    toast({ title: 'Projeto submetido!', description: 'Seu projeto foi adicionado.' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-effect p-8 rounded-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Projetos Participados
        </h2>
        <div className="mb-6 flex justify-end">
          <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Rocket className="w-4 h-4 mr-2" /> Submeter Projeto
          </Button>
        </div>
        {myProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {myProjects.map((project) => (
              <div key={project.id} className="p-6 bg-gray-100 rounded-2xl">
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{project.date}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-600"
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Rocket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700">
              Ainda não participou em nenhum projeto.
            </p>
          </div>
        )}
      </div>

      {/* Modal de Submissão */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 24, stiffness: 260 }}
              className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Submeter Projeto</h3>
                <button onClick={() => setShowModal(false)} className="p-1 hover:bg-white/20 rounded-md">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmitProject} className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título *</label>
                  <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição *</label>
                  <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={4} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Categoria</label>
                    <select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      {categories.map((c)=>(<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                      <option value="planned">Planejado</option>
                      <option value="in-progress">Em Andamento</option>
                      <option value="completed">Concluído</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PDF (opcional)</label>
                  <input type="file" accept="application/pdf" onChange={(e)=>setForm({...form,pdf:e.target.files?.[0]||null})} />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={()=>setShowModal(false)}>Cancelar</Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Enviar</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemberProjects;
