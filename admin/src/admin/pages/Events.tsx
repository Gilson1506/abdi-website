import React, { useMemo, useState, useEffect } from 'react';
import Modal from '../components/UI/Modal';
import { Plus, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Loader from '../components/UI/Loader';

interface EventItem {
  id: string;
  title: string;
  banner?: string;
  date: string;
  approvedForCarousel?: boolean;
}

export default function Events() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', banner_image: '', start_date: '', description: '', location: '', max_attendees: '', price: '' } as any);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const eventItems: EventItem[] = (data || []).map(event => ({
        id: event.id,
        title: event.title,
        banner: event.banner_image,
        date: event.start_date,
        approvedForCarousel: false // Will be determined by carousel_items table
      }));

      setItems(eventItems);
    } catch (error) {
      console.error('Error fetching events:', error);
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
    return items.filter((e) => e.title.toLowerCase().includes(q));
  }, [items, query]);

  const createEvent = async () => {
    if (!form.title || !form.start_date) return;
    
    try {
      const { data, error } = await supabase
        .from('events')
        .insert({
          title: form.title,
          description: form.description,
          banner_image: form.banner_image || null,
          start_date: form.start_date,
          end_date: form.end_date || null,
          location: form.location || null,
          max_attendees: form.max_attendees ? parseInt(form.max_attendees) : null,
          price: form.price ? parseFloat(form.price) : 0,
          is_published: false,
        })
        .select()
        .single();

      if (error) throw error;

      await fetchEvents(); // Refresh the list
      setOpen(false);
      setForm({ title: '', banner_image: '', start_date: '', description: '', location: '', max_attendees: '', price: '' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const toggleApprove = async (id: string) => {
    try {
      const event = items.find(e => e.id === id);
      if (!event) return;

      const isApproved = event.approvedForCarousel;

      if (isApproved) {
        // Remove from carousel
        await supabase
          .from('carousel_items')
          .delete()
          .eq('type', 'event')
          .eq('item_id', id);
      } else {
        // Add to carousel
        await supabase
          .from('carousel_items')
          .upsert({
            type: 'event',
            item_id: id,
            title: event.title,
            description: event.title,
            image_url: event.banner,
            is_active: true
          });
      }

      await fetchEvents(); // Refresh the list
    } catch (error) {
      console.error('Error toggling carousel approval:', error);
    }
  };

  if (loading) {
    return <Loader message="Carregando eventos..." />;
  }

  return (
    <>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Eventos</h1>
        <button onClick={() => setOpen(true)} className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Novo evento
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar eventos..."
          className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((e) => (
          <div key={e.id} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            {e.banner && <img src={e.banner} alt={e.title} className="w-full h-36 object-cover" />}
            <div className="p-4 space-y-2">
              <p className="text-sm text-gray-500">{new Date(e.date).toLocaleString()}</p>
              <h3 className="text-base font-semibold text-gray-900">{e.title}</h3>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full ${e.approvedForCarousel ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                  {e.approvedForCarousel ? 'Aprovado para Carrossel' : 'Não aprovado'}
                </span>
                <button
                  onClick={() => toggleApprove(e.id)}
                  className={`text-xs px-3 py-1 rounded-md ${e.approvedForCarousel ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                >
                  {e.approvedForCarousel ? 'Remover' : 'Aprovar'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-sm text-gray-500 py-10 text-center border border-dashed rounded-lg">Nenhum evento encontrado</div>
        )}
      </div>
    </div>
    <Modal open={open} onClose={() => setOpen(false)} title="Novo Evento" widthClassName="max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={form.title} onChange={(e) => setForm((f: any) => ({ ...f, title: e.target.value }))} placeholder="Título" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input type="datetime-local" value={form.start_date} onChange={(e) => setForm((f: any) => ({ ...f, start_date: e.target.value }))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input value={form.location} onChange={(e) => setForm((f: any) => ({ ...f, location: e.target.value }))} placeholder="Local" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input type="number" value={form.max_attendees} onChange={(e) => setForm((f: any) => ({ ...f, max_attendees: e.target.value }))} placeholder="Máximo de participantes" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input type="number" step="0.01" value={form.price} onChange={(e) => setForm((f: any) => ({ ...f, price: e.target.value }))} placeholder="Preço" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <div className="space-y-2">
          <input value={form.banner_image} onChange={(e) => setForm((f: any) => ({ ...f, banner_image: e.target.value }))} placeholder="URL do banner (opcional)" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <input type="file" accept="image/*" onChange={(e) => onBannerUpload(e.target.files?.[0])} className="block w-full text-sm" />
        </div>
        <textarea value={form.description} onChange={(e) => setForm((f: any) => ({ ...f, description: e.target.value }))} placeholder="Descrição" className="md:col-span-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm h-24" />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">Cancelar</button>
        <button onClick={createEvent} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Criar</button>
      </div>
    </Modal>
    </>
  );
}


