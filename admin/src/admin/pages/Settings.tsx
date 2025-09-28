import React, { useState } from 'react';

export default function Settings() {
  const [form, setForm] = useState({ siteName: 'ABDI', contactEmail: 'contato@abdi.org', theme: 'light' });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>
      <div className="rounded-lg border bg-white p-4 space-y-3 max-w-xl">
        <label className="block text-sm">
          <span className="text-gray-700">Nome do site</span>
          <input value={form.siteName} onChange={(e) => setForm(f => ({ ...f, siteName: e.target.value }))} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-gray-700">Email de contato</span>
          <input value={form.contactEmail} onChange={(e) => setForm(f => ({ ...f, contactEmail: e.target.value }))} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm">
          <span className="text-gray-700">Tema</span>
          <select value={form.theme} onChange={(e) => setForm(f => ({ ...f, theme: e.target.value }))} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
          </select>
        </label>
        <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">Salvar</button>
      </div>
    </div>
  );
}


