import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function LiveRoom() {
  const q = useQuery();
  const paramsEvent = q.get('event');

  const active = useMemo(() => {
    try {
      const list = JSON.parse(localStorage.getItem('admin_live_sources') || '[]');
      return Array.isArray(list) ? list.find((i) => i.isActive) : null;
    } catch { return null; }
  }, []);

  const embedSrc = useMemo(() => {
    if (!active) return '';
    if (active.provider === 'youtube') {
      const id = (active.url.match(/(?:v=|youtu\.be\/)([\w-]{11})/) || [])[1];
      return id ? `https://www.youtube.com/embed/${id}` : active.url;
    }
    if (active.provider === 'vimeo') {
      const id = (active.url.match(/vimeo\.com\/(\d+)/) || [])[1];
      return id ? `https://player.vimeo.com/video/${id}` : active.url;
    }
    return active.url;
  }, [active]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Sala ao Vivo {paramsEvent ? `(Evento ${paramsEvent})` : ''}</h1>
      {!active && (
        <p className="mt-4 text-gray-600">Nenhuma transmissão ativa agora. Tente novamente mais tarde.</p>
      )}
      {active && (
        <div className="mt-6 aspect-video">
          <iframe
            className="w-full h-full rounded-lg border"
            src={embedSrc}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={active.title}
          />
        </div>
      )}
    </div>
  );
}


