import React, { useRef, useState } from 'react';

interface TaskItem {
  id: string;
  title: string;
  date: string;
  responsible?: string;
  status: 'planned' | 'in_progress' | 'done';
}

interface DocItem {
  id: string;
  name: string;
  type: 'ata' | 'nota';
  uploadedAt: string;
}

const TASKS_KEY = 'admin_schedule_tasks';
const DOCS_KEY = 'admin_schedule_docs';

function loadTasks(): TaskItem[] { try { return JSON.parse(localStorage.getItem(TASKS_KEY) || '[]'); } catch { return []; } }
function saveTasks(items: TaskItem[]) { localStorage.setItem(TASKS_KEY, JSON.stringify(items)); }
function loadDocs(): DocItem[] { try { return JSON.parse(localStorage.getItem(DOCS_KEY) || '[]'); } catch { return []; } }
function saveDocs(items: DocItem[]) { localStorage.setItem(DOCS_KEY, JSON.stringify(items)); }

export default function Schedule() {
  const [tasks, setTasks] = useState<TaskItem[]>(loadTasks());
  const [docs, setDocs] = useState<DocItem[]>(loadDocs());
  const [form, setForm] = useState({ title: '', date: '', responsible: '', status: 'planned' } as any);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTask = () => {
    if (!form.title || !form.date) return;
    const t: TaskItem = { id: String(Date.now()), title: form.title, date: form.date, responsible: form.responsible, status: form.status };
    const next = [t, ...tasks]; setTasks(next); saveTasks(next);
    setForm({ title: '', date: '', responsible: '', status: 'planned' });
  };

  const updateStatus = (id: string, status: TaskItem['status']) => {
    const next = tasks.map(t => t.id === id ? { ...t, status } : t); setTasks(next); saveTasks(next);
  };

  const removeTask = (id: string) => { const next = tasks.filter(t => t.id !== id); setTasks(next); saveTasks(next); };

  const addDocs = (files: FileList | null, type: DocItem['type']) => {
    if (!files || files.length === 0) return;
    const now = new Date().toISOString();
    const added: DocItem[] = Array.from(files).map(f => ({ id: `${f.name}-${Date.now()}`, name: f.name, type, uploadedAt: now }));
    const next = [...added, ...docs]; setDocs(next); saveDocs(next);
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeDoc = (id: string) => { const next = docs.filter(d => d.id !== id); setDocs(next); saveDocs(next); };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Cronograma</h1>

      <div className="rounded-lg border bg-white p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={form.title} onChange={(e) => setForm((f: any) => ({ ...f, title: e.target.value }))} placeholder="Tarefa" className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <input type="date" value={form.date} onChange={(e) => setForm((f: any) => ({ ...f, date: e.target.value }))} className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <input value={form.responsible} onChange={(e) => setForm((f: any) => ({ ...f, responsible: e.target.value }))} placeholder="Responsável" className="rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <select value={form.status} onChange={(e) => setForm((f: any) => ({ ...f, status: e.target.value }))} className="rounded-md border border-gray-300 px-3 py-2 text-sm">
            <option value="planned">Planejada</option>
            <option value="in_progress">Em andamento</option>
            <option value="done">Concluída</option>
          </select>
        </div>
        <button onClick={addTask} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">Adicionar</button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarefa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map(t => (
              <tr key={t.id}>
                <td className="px-6 py-3 text-sm text-gray-900">{t.title}</td>
                <td className="px-6 py-3 text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                <td className="px-6 py-3 text-sm text-gray-500">{t.responsible || '-'}</td>
                <td className="px-6 py-3 text-sm">
                  <select value={t.status} onChange={(e) => updateStatus(t.id, e.target.value as TaskItem['status'])} className="px-3 py-1 rounded-md border border-gray-300">
                    <option value="planned">Planejada</option>
                    <option value="in_progress">Em andamento</option>
                    <option value="done">Concluída</option>
                  </select>
                </td>
                <td className="px-6 py-3 text-right text-sm"><button onClick={() => removeTask(t.id)} className="text-red-600 hover:text-red-800">Remover</button></td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">Nenhuma tarefa</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border bg-white p-4 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Documentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-700 mb-2">Anexar Ata</p>
            <input ref={inputRef} type="file" onChange={(e) => addDocs(e.target.files, 'ata')} />
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-2">Anexar Nota Informativa</p>
            <input type="file" onChange={(e) => addDocs(e.target.files, 'nota')} />
          </div>
        </div>

        <div className="rounded-lg border bg-white overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {docs.map(d => (
                <tr key={d.id}>
                  <td className="px-6 py-3 text-sm text-gray-900">{d.name}</td>
                  <td className="px-6 py-3 text-sm text-gray-500">{d.type === 'ata' ? 'Ata' : 'Nota Informativa'}</td>
                  <td className="px-6 py-3 text-sm text-gray-500">{new Date(d.uploadedAt).toLocaleString()}</td>
                  <td className="px-6 py-3 text-right text-sm"><button onClick={() => removeDoc(d.id)} className="text-red-600 hover:text-red-800">Remover</button></td>
                </tr>
              ))}
              {docs.length === 0 && (<tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">Nenhum documento</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


