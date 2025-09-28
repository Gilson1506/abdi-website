import React, { useMemo, useState } from 'react';
import Modal from '../components/UI/Modal';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const STORAGE_KEY = 'admin_store_products';

function loadProducts(): Product[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function saveProducts(items: Product[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export default function Store() {
  const [items, setItems] = useState<Product[]>(loadProducts());
  const [form, setForm] = useState({ name: '', price: '', stock: '' } as any);
  const [open, setOpen] = useState(false);

  const addProduct = () => {
    if (!form.name || !form.price || !form.stock) return;
    const p: Product = { id: String(Date.now()), name: form.name, price: Number(form.price), stock: Number(form.stock) };
    const next = [p, ...items]; setItems(next); saveProducts(next);
    setForm({ name: '', price: '', stock: '' });
  };

  const remove = (id: string) => {
    const next = items.filter(i => i.id !== id); setItems(next); saveProducts(next);
  };

  const totalStockValue = useMemo(() => items.reduce((s, i) => s + i.price * i.stock, 0), [items]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Loja</h1>
        <button onClick={() => setOpen(true)} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Novo produto</button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map(i => (
              <tr key={i.id}>
                <td className="px-6 py-3 text-sm text-gray-900">{i.name}</td>
                <td className="px-6 py-3 text-sm text-gray-500">AOA {i.price.toLocaleString()}</td>
                <td className="px-6 py-3 text-sm text-gray-500">{i.stock}</td>
                <td className="px-6 py-3 text-right text-sm"><button onClick={() => remove(i.id)} className="px-3 py-1 rounded-md bg-red-600 text-white">Remover</button></td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">Nenhum produto</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <p className="text-sm text-gray-600">Valor total em estoque</p>
        <p className="text-xl font-semibold">AOA {totalStockValue.toLocaleString()}</p>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Novo Produto">
        <div className="space-y-3">
          <input value={form.name} onChange={(e) => setForm((f: any) => ({ ...f, name: e.target.value }))} placeholder="Produto" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <input type="number" value={form.price} onChange={(e) => setForm((f: any) => ({ ...f, price: e.target.value }))} placeholder="Preço" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <input type="number" value={form.stock} onChange={(e) => setForm((f: any) => ({ ...f, stock: e.target.value }))} placeholder="Estoque" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">Cancelar</button>
            <button onClick={() => { addProduct(); setOpen(false); }} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Criar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


