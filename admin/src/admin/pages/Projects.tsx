import React, { useMemo, useState, useEffect } from 'react';
import Modal from '../components/UI/Modal';
import { Plus, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Loader from '../components/UI/Loader';

interface ProjectItem {
  id: string;
  title: string;
  banner?: string;
  submittedAt: string;
  approvedForCarousel?: boolean;
}

export default function Projects() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', banner_image: '', description: '' } as any);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const projectItems: ProjectItem[] = (data || []).map(project => ({
        id: project.id,
        title: project.title,
        banner: project.banner_image,
        submittedAt: project.created_at,
        approvedForCarousel: false // Will be determined by carousel_items table
      }));

      setItems(projectItems);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const onBannerUpload = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f: any) => ({ ...f, banner_image: String(reader.result || '') }));
    reader.readAsDataURL(file);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.title.toLowerCase().includes(q));
  }, [items, query]);

  const createProject = async () => {
    if (!form.title) return;
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: form.title,
          description: form.description,
          banner_image: form.banner_image || null,
          status: 'submitted',
        })
        .select()
        .single();

      if (error) throw error;

      await fetchProjects(); // Refresh the list
      setOpen(false);
      setForm({ title: '', banner_image: '', description: '' });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const toggleApprove = async (id: string) => {
    try {
      const project = items.find(p => p.id === id);
      if (!project) return;

      const isApproved = project.approvedForCarousel;

      if (isApproved) {
        // Remove from carousel
        await supabase
          .from('carousel_items')
          .delete()
          .eq('type', 'project')
          .eq('item_id', id);
      } else {
        // Add to carousel
        await supabase
          .from('carousel_items')
          .upsert({
            type: 'project',
            item_id: id,
            title: project.title,
            description: project.title,
            image_url: project.banner,
            is_active: true
          });
      }

      await fetchProjects(); // Refresh the list
    } catch (error) {
      console.error('Error toggling carousel approval:', error);
    }
  };

  if (loading) {
    return <Loader message="Carregando projetos..." />;
  }

  return (
    <>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Projetos</h1>
        <button onClick={() => setOpen(true)} className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Novo projeto
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar projetos..."
          className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            {p.banner && <img src={p.banner} alt={p.title} className="w-full h-36 object-cover" />}
            <div className="p-4 space-y-2">
              <p className="text-sm text-gray-500">{new Date(p.submittedAt).toLocaleString()}</p>
              <h3 className="text-base font-semibold text-gray-900">{p.title}</h3>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.approvedForCarousel ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                  {p.approvedForCarousel ? 'Aprovado para Carrossel' : 'Não aprovado'}
                </span>
                <button
                  onClick={() => toggleApprove(p.id)}
                  className={`text-xs px-3 py-1 rounded-md ${p.approvedForCarousel ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                >
                  {p.approvedForCarousel ? 'Remover' : 'Aprovar'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-gray-500 py-10 text-center border border-dashed rounded-lg">Nenhum projeto encontrado</div>
        )}
      </div>
    </div>
    <Modal open={open} onClose={() => setOpen(false)} title="Novo Projeto" widthClassName="max-w-2xl">
      <div className="space-y-3">
        <input value={form.title} onChange={(e) => setForm((f: any) => ({ ...f, title: e.target.value }))} placeholder="Título" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <div className="space-y-2">
          <input value={form.banner_image} onChange={(e) => setForm((f: any) => ({ ...f, banner_image: e.target.value }))} placeholder="URL do banner (opcional)" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <input type="file" accept="image/*" onChange={(e) => onBannerUpload(e.target.files?.[0])} className="block w-full text-sm" />
        </div>
        <textarea value={form.description} onChange={(e) => setForm((f: any) => ({ ...f, description: e.target.value }))} placeholder="Descrição do projeto" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm h-24" />
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">Cancelar</button>
          <button onClick={createProject} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Criar</button>
        </div>
      </div>
    </Modal>
    </>
  );
}


