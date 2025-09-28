import React, { useState } from 'react';
import Modal from '../components/UI/Modal';

interface ContentItem {
  id: string;
  title: string;
  body: string;
  tags?: string[];
}

const STORAGE_KEY = 'admin_content_items';

function loadItems(): ContentItem[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function saveItems(items: ContentItem[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export default function Content() {
  const [items, setItems] = useState<ContentItem[]>(loadItems());
  const [form, setForm] = useState({ title: '', body: '' } as any);
  const [open, setOpen] = useState(false);

  const addItem = () => {
    if (!form.title || !form.body) return;
    const item: ContentItem = { id: String(Date.now()), title: form.title, body: form.body };
    const next = [item, ...items]; setItems(next); saveItems(next);
    setForm({ title: '', body: '' });
  };

  const remove = (id: string) => {
    const next = items.filter(i => i.id !== id); setItems(next); saveItems(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Conteúdo</h1>
        <button onClick={() => setOpen(true)} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Novo conteúdo</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(i => (
          <div key={i.id} className="rounded-lg border bg-white p-4 space-y-2">
            <h3 className="text-base font-semibold text-gray-900">{i.title}</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{i.body}</p>
            <div className="text-right"><button onClick={() => remove(i.id)} className="text-red-600 hover:text-red-800 text-sm">Remover</button></div>
          </div>
        ))}
        {items.length === 0 && <div className="text-sm text-gray-500 py-10 text-center border border-dashed rounded-lg">Sem conteúdo</div>}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Novo Conteúdo">
        <div className="space-y-3">
          <input value={form.title} onChange={(e) => setForm((f: any) => ({ ...f, title: e.target.value }))} placeholder="Título" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <textarea value={form.body} onChange={(e) => setForm((f: any) => ({ ...f, body: e.target.value }))} placeholder="Corpo" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm h-32" />
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">Cancelar</button>
            <button onClick={() => { addItem(); setOpen(false); }} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Publicar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


