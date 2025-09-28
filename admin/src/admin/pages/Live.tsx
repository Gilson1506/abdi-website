import React, { useMemo, useState } from 'react';

interface LiveSource {
  id: string;
  title: string;
  provider: 'youtube' | 'vimeo' | 'hls';
  url: string;
  isActive?: boolean;
}

const STORAGE_KEY = 'admin_live_sources';

function loadSources(): LiveSource[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function saveSources(items: LiveSource[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

function parseEmbed(provider: string, url: string) {
  if (provider === 'youtube') {
    const id = (url.match(/(?:v=|youtu\.be\/)([\w-]{11})/) || [])[1];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (provider === 'vimeo') {
    const id = (url.match(/vimeo\.com\/(\d+)/) || [])[1];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }
  return url; // hls handled by player apps
}

export default function Live() {
  const [items, setItems] = useState<LiveSource[]>(loadSources());
  const [form, setForm] = useState({ title: '', provider: 'youtube', url: '' } as any);

  const active = useMemo(() => items.find(i => i.isActive), [items]);

  const addSource = () => {
    if (!form.title || !form.url) return;
    const src: LiveSource = { id: String(Date.now()), title: form.title, provider: form.provider, url: form.url, isActive: items.length === 0 };
    const next = [src, ...items];
    setItems(next); saveSources(next);
    setForm({ title: '', provider: 'youtube', url: '' });
  };

  const setActive = (id: string) => {
    const next = items.map(i => ({ ...i, isActive: i.id === id }));
    setItems(next); saveSources(next);
  };

  const remove = (id: string) => {
    const next = items.filter(i => i.id !== id);
    setItems(next); saveSources(next);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Conteúdo ao vivo</h1>
        <p className="text-gray-600">Gerencie links de transmissão (YouTube, Vimeo ou HLS).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-lg border bg-white p-4">
          {!active && <div className="text-sm text-gray-500">Nenhuma transmissão ativa</div>}
          {active && (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg border"
                src={parseEmbed(active.provider, active.url)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={active.title}
              />
            </div>
          )}
        </div>
        <div className="rounded-lg border bg-white p-4 space-y-3">
          <input value={form.title} onChange={(e) => setForm((f: any) => ({ ...f, title: e.target.value }))} placeholder="Título" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <select value={form.provider} onChange={(e) => setForm((f: any) => ({ ...f, provider: e.target.value }))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="hls">HLS (.m3u8)</option>
          </select>
          <input value={form.url} onChange={(e) => setForm((f: any) => ({ ...f, url: e.target.value }))} placeholder="URL do vídeo/stream" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <button onClick={addSource} className="w-full bg-blue-600 text-white rounded-md px-3 py-2 text-sm hover:bg-blue-700">Adicionar</button>
        </div>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provedor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map(i => (
              <tr key={i.id}>
                <td className="px-6 py-3 text-sm text-gray-900">{i.title}</td>
                <td className="px-6 py-3 text-sm text-gray-500">{i.provider}</td>
                <td className="px-6 py-3 text-sm text-gray-500 truncate max-w-xs">{i.url}</td>
                <td className="px-6 py-3 text-right text-sm">
                  <button onClick={() => setActive(i.id)} className={`mr-2 px-3 py-1 rounded-md ${i.isActive ? 'bg-green-600' : 'bg-gray-700'} text-white`}>Ativar</button>
                  <button onClick={() => remove(i.id)} className="px-3 py-1 rounded-md bg-red-600 text-white">Remover</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">Nenhuma fonte adicionada</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


