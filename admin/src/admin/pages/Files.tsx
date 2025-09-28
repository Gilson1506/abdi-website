import React, { useRef, useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
}

const STORAGE_KEY = 'admin_files_items';

function loadItems(): FileItem[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function saveItems(items: FileItem[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export default function Files() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<FileItem[]>(loadItems());

  const addFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const now = new Date().toISOString();
    const added: FileItem[] = Array.from(files).map(f => ({ id: `${f.name}-${Date.now()}`, name: f.name, size: f.size, uploadedAt: now }));
    const next = [...added, ...items]; setItems(next); saveItems(next);
    if (inputRef.current) inputRef.current.value = '';
  };

  const remove = (id: string) => { const next = items.filter(i => i.id !== id); setItems(next); saveItems(next); };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Arquivos</h1>
      <div className="rounded-lg border bg-white p-4">
        <input ref={inputRef} type="file" multiple onChange={(e) => addFiles(e.target.files)} />
      </div>
      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamanho</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enviado</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map(i => (
              <tr key={i.id}>
                <td className="px-6 py-3 text-sm text-gray-900">{i.name}</td>
                <td className="px-6 py-3 text-sm text-gray-500">{(i.size/1024).toFixed(1)} KB</td>
                <td className="px-6 py-3 text-sm text-gray-500">{new Date(i.uploadedAt).toLocaleString()}</td>
                <td className="px-6 py-3 text-right text-sm"><button onClick={() => remove(i.id)} className="text-red-600 hover:text-red-800">Remover</button></td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">Nenhum arquivo</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


