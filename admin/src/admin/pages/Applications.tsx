import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/UI/Modal';

type ApplicationStatus = 'pending' | 'approved' | 'rejected';

interface ApplicationItem {
  id: string;
  full_name: string;
  email: string;
  submittedAt: string;
  status: ApplicationStatus;
  notes?: string;
}

const STORAGE_KEY = 'admin_applications_items';

function loadItems(): ApplicationItem[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function saveItems(items: ApplicationItem[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export default function Applications() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<ApplicationItem[]>(loadItems());
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ full_name: '', email: '', notes: '' } as any);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(i => i.full_name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q));
  }, [items, query]);

  const createApplication = () => {
    if (!form.full_name || !form.email) return;
    const now = new Date().toISOString();
    const app: ApplicationItem = {
      id: String(Date.now()),
      full_name: form.full_name,
      email: form.email,
      submittedAt: now,
      status: 'pending',
      notes: form.notes,
    };
    const next = [app, ...items]; setItems(next); saveItems(next);
    setOpen(false); setForm({ full_name: '', email: '', notes: '' });
  };

  const setStatus = (id: string, status: ApplicationStatus) => {
    const next = items.map(i => i.id === id ? { ...i, status } : i);
    setItems(next); saveItems(next);
  };

  return (
    <>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Candidaturas</h1>
        <button onClick={() => setOpen(true)} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Nova candidatura</button>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nome ou email"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
      />

      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enviado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map(i => (
              <tr key={i.id}>
                <td className="px-6 py-3 text-sm text-gray-900">{i.full_name}</td>
                <td className="px-6 py-3 text-sm text-gray-500">{i.email}</td>
                <td className="px-6 py-3 text-sm text-gray-500">{new Date(i.submittedAt).toLocaleString()}</td>
                <td className="px-6 py-3 text-sm">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${i.status === 'approved' ? 'bg-green-100 text-green-800' : i.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{i.status}</span>
                </td>
                <td className="px-6 py-3 text-right text-sm">
                  <button onClick={() => setStatus(i.id, 'approved')} className="mr-2 px-3 py-1 bg-green-600 text-white rounded-md">Aprovar</button>
                  <button onClick={() => navigate(`/admin/applications/${i.id}`)} className="mr-2 px-3 py-1 bg-purple-600 text-white rounded-md">Abrir Sala</button>
                  <button onClick={() => setStatus(i.id, 'rejected')} className="px-3 py-1 bg-red-600 text-white rounded-md">Rejeitar</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">Nenhuma candidatura</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <Modal open={open} onClose={() => setOpen(false)} title="Nova Candidatura">
      <div className="space-y-3">
        <input value={form.full_name} onChange={(e) => setForm((f: any) => ({ ...f, full_name: e.target.value }))} placeholder="Nome completo" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input type="email" value={form.email} onChange={(e) => setForm((f: any) => ({ ...f, email: e.target.value }))} placeholder="Email" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <textarea value={form.notes} onChange={(e) => setForm((f: any) => ({ ...f, notes: e.target.value }))} placeholder="Notas" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm h-24" />
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">Cancelar</button>
          <button onClick={createApplication} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Criar</button>
        </div>
      </div>
    </Modal>
    </>
  );
}


