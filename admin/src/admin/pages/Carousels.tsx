import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, Save, Settings } from 'lucide-react';

type LocationKey = 'home' | 'login' | 'register' | 'dashboard' | 'sections';

interface CarouselConfig {
  id: string;
  location: LocationKey;
  autoplay: boolean;
  intervalMs: number;
  transition: 'fade' | 'slide';
  fullHeight: boolean;
  showIndicators: boolean;
  showArrows: boolean;
}

interface CarouselItem {
  id: string;
  location: LocationKey;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { label: string; url: string };
  secondaryCta?: { label: string; url: string };
  order: number;
  visibleOn?: { desktop: boolean; mobile: boolean };
  activeFrom?: string;
  activeUntil?: string;
  createdAt: string;
  updatedAt: string;
}

const CONFIG_KEY = 'admin_carousel_config';
const ITEMS_KEY = 'admin_carousel_items';

function loadConfig(): CarouselConfig[] {
  try { return JSON.parse(localStorage.getItem(CONFIG_KEY) || '[]'); } catch { return []; }
}
function saveConfig(cfg: CarouselConfig[]) { localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg)); }
function loadItems(): CarouselItem[] {
  try { return JSON.parse(localStorage.getItem(ITEMS_KEY) || '[]'); } catch { return []; }
}
function saveItems(items: CarouselItem[]) { localStorage.setItem(ITEMS_KEY, JSON.stringify(items)); }

const defaultConfig = (location: LocationKey): CarouselConfig => ({
  id: location,
  location,
  autoplay: true,
  intervalMs: 5000,
  transition: 'slide',
  fullHeight: location === 'login' || location === 'register',
  showIndicators: location === 'home',
  showArrows: location === 'home',
});

export default function Carousels() {
  const [location, setLocation] = useState<LocationKey>('home');
  const [configs, setConfigs] = useState<CarouselConfig[]>(loadConfig());
  const [items, setItems] = useState<CarouselItem[]>(loadItems());

  // Ensure defaults exist
  useEffect(() => {
    const locations: LocationKey[] = ['home', 'login', 'register', 'dashboard', 'sections'];
    let changed = false;
    const next = [...configs];
    locations.forEach((loc) => {
      if (!next.find((c) => c.location === loc)) {
        next.push(defaultConfig(loc));
        changed = true;
      }
    });
    if (changed) {
      setConfigs(next);
      saveConfig(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentConfig = useMemo(() => configs.find((c) => c.location === location) || defaultConfig(location), [configs, location]);
  const currentItems = useMemo(() => items.filter((i) => i.location === location).sort((a, b) => a.order - b.order), [items, location]);

  const updateConfig = (patch: Partial<CarouselConfig>) => {
    const next = configs.map((c) => (c.location === location ? { ...c, ...patch } : c));
    setConfigs(next);
    saveConfig(next);
  };

  const addItem = () => {
    const now = new Date().toISOString();
    const id = String(Date.now());
    const nextItem: CarouselItem = {
      id,
      location,
      imageUrl: 'https://picsum.photos/1200/600',
      title: 'Slide Exemplo',
      description: 'Descrição do slide',
      order: currentItems.length,
      visibleOn: { desktop: true, mobile: true },
      createdAt: now,
      updatedAt: now,
    };
    const next = [...items, nextItem];
    setItems(next);
    saveItems(next);
  };

  const removeItem = (id: string) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    saveItems(next);
  };

  const saveOrder = (ordered: CarouselItem[]) => {
    const next = items.map((i) => ordered.find((o) => o.id === i.id) || i);
    setItems(next);
    saveItems(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Carrosséis</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4 lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="text-sm font-medium text-gray-700 mb-3 flex items-center"><Settings className="w-4 h-4 mr-2" /> Configuração</h2>
            <label className="block text-xs text-gray-500 mb-1">Local</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as LocationKey)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="home">Home</option>
              <option value="login">Login</option>
              <option value="register">Registro</option>
              <option value="dashboard">Dashboard</option>
              <option value="sections">Sections</option>
            </select>

            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={currentConfig.autoplay} onChange={(e) => updateConfig({ autoplay: e.target.checked })} /> Autoplay
              </label>
              <label className="block text-sm">Intervalo (ms)
                <input type="number" min={1000} step={500} value={currentConfig.intervalMs} onChange={(e) => updateConfig({ intervalMs: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block text-sm">Transição
                <select value={currentConfig.transition} onChange={(e) => updateConfig({ transition: e.target.value as any })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                  <option value="slide">Slide</option>
                  <option value="fade">Fade</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={currentConfig.fullHeight} onChange={(e) => updateConfig({ fullHeight: e.target.checked })} /> Full height (Login/Registro)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={currentConfig.showIndicators} onChange={(e) => updateConfig({ showIndicators: e.target.checked })} /> Mostrar indicadores
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={currentConfig.showArrows} onChange={(e) => updateConfig({ showArrows: e.target.checked })} /> Mostrar setas
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-700">Slides</h2>
            <div className="flex items-center gap-2">
              <button onClick={addItem} className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" /> Adicionar slide</button>
              <button onClick={() => saveOrder(currentItems)} className="inline-flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-900"><Save className="w-4 h-4 mr-2" /> Salvar ordem</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentItems.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 overflow-hidden bg-white">
                <img src={item.imageUrl} alt={item.title || 'Slide'} className="w-full h-40 object-cover" />
                <div className="p-4 space-y-2">
                  <input
                    value={item.title || ''}
                    onChange={(e) => {
                      const next = items.map((i) => i.id === item.id ? { ...i, title: e.target.value, updatedAt: new Date().toISOString() } : i);
                      setItems(next); saveItems(next);
                    }}
                    placeholder="Título (opcional)"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                  <input
                    value={item.description || ''}
                    onChange={(e) => {
                      const next = items.map((i) => i.id === item.id ? { ...i, description: e.target.value, updatedAt: new Date().toISOString() } : i);
                      setItems(next); saveItems(next);
                    }}
                    placeholder="Descrição (opcional)"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <label className="flex items-center gap-2"><input type="checkbox" checked={item.visibleOn?.desktop ?? true} onChange={(e) => { const next = items.map((i) => i.id === item.id ? { ...i, visibleOn: { desktop: e.target.checked, mobile: i.visibleOn?.mobile ?? true }, updatedAt: new Date().toISOString() } : i); setItems(next); saveItems(next); }} /> Desktop</label>
                      <label className="flex items-center gap-2"><input type="checkbox" checked={item.visibleOn?.mobile ?? true} onChange={(e) => { const next = items.map((i) => i.id === item.id ? { ...i, visibleOn: { desktop: i.visibleOn?.desktop ?? true, mobile: e.target.checked }, updatedAt: new Date().toISOString() } : i); setItems(next); saveItems(next); }} /> Mobile</label>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
            {currentItems.length === 0 && (
              <div className="text-sm text-gray-500 py-10 text-center border border-dashed rounded-lg">Nenhum slide para este local</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


