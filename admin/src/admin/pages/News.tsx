import React, { useMemo, useState, useEffect } from 'react';
import Modal from '../components/UI/Modal';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Loader from '../components/UI/Loader';

type NewsStatus = 'draft' | 'review' | 'published' | 'archived';

interface SeoMeta {
  title?: string;
  description?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content: string;
  coverImageUrl?: string;
  gallery?: string[];
  status: NewsStatus;
  scheduledAt?: string;
  unpublishedAt?: string;
  categoryId?: string;
  tagIds?: string[];
  authorId?: string;
  seo?: SeoMeta;
  isFeatured?: boolean;
  views?: number;
  createdAt: string;
  updatedAt: string;
}

export default function News() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', subtitle: '', slug: '', banner_image: '', content: '', category: '' } as any);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const newsItems: NewsItem[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        slug: item.slug,
        content: item.content,
        coverImageUrl: item.banner_image,
        status: item.status as NewsStatus,
        isFeatured: item.is_featured,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      setItems(newsItems);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const onCoverUpload = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f: any) => ({ ...f, banner_image: String(reader.result || '') }));
    reader.readAsDataURL(file);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((n) =>
      [n.title, n.subtitle, n.slug].some((v) => (v || '').toLowerCase().includes(q))
    );
  }, [items, query]);

  const createNews = async () => {
    if (!form.title) return;
    
    try {
      const { data, error } = await supabase
        .from('news')
        .insert({
          title: form.title,
          subtitle: form.subtitle,
          slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
          content: form.content || '',
          banner_image: form.banner_image || null,
          category: form.category || 'Notícias',
          status: 'draft',
          is_featured: false,
        })
        .select()
        .single();

      if (error) throw error;

      await fetchNews(); // Refresh the list
      setOpen(false);
      setForm({ title: '', subtitle: '', slug: '', banner_image: '', content: '', category: '' });
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchNews(); // Refresh the list
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const publish = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ 
          status: 'published', 
          is_featured: true,
          published_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Add to carousel
      const newsItem = items.find(n => n.id === id);
      if (newsItem) {
        await supabase
          .from('carousel_items')
          .upsert({
            type: 'news',
            item_id: id,
            title: newsItem.title,
            description: newsItem.subtitle,
            image_url: newsItem.coverImageUrl,
            is_active: true
          });
      }

      await fetchNews(); // Refresh the list
    } catch (error) {
      console.error('Error publishing news:', error);
    }
  };

  if (loading) {
    return <Loader message="Carregando notícias..." />;
  }

  return (
    <>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Notícias</h1>
        <button onClick={() => setOpen(true)} className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Nova notícia
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, subtítulo ou slug"
            className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atualizado</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((n) => (
              <tr key={n.id}>
                <td className="px-6 py-3 text-sm text-gray-900">{n.title}</td>
                <td className="px-6 py-3 text-sm text-gray-500">{n.slug}</td>
                <td className="px-6 py-3">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700">
                    {n.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">{new Date(n.updatedAt).toLocaleString()}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => publish(n.id)} className="px-2 py-1 text-xs rounded-md bg-green-600 text-white hover:bg-green-700">Publicar</button>
                    <button className="p-2 text-gray-500 hover:text-blue-700"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => remove(n.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">Nenhuma notícia encontrada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <Modal open={open} onClose={() => setOpen(false)} title="Nova Notícia" widthClassName="max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={form.title} onChange={(e) => setForm((f: any) => ({ ...f, title: e.target.value }))} placeholder="Título" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input value={form.subtitle} onChange={(e) => setForm((f: any) => ({ ...f, subtitle: e.target.value }))} placeholder="Subtítulo" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input value={form.slug} onChange={(e) => setForm((f: any) => ({ ...f, slug: e.target.value }))} placeholder="Slug" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <div className="space-y-2">
          <input value={form.banner_image} onChange={(e) => setForm((f: any) => ({ ...f, banner_image: e.target.value }))} placeholder="URL da imagem de capa (opcional)" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <input type="file" accept="image/*" onChange={(e) => onCoverUpload(e.target.files?.[0])} className="block w-full text-sm" />
        </div>
        <textarea value={form.content} onChange={(e) => setForm((f: any) => ({ ...f, content: e.target.value }))} placeholder="Conteúdo" className="md:col-span-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm h-32" />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">Cancelar</button>
        <button onClick={createNews} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Criar</button>
      </div>
    </Modal>
    </>
  );
}


