import React, { useMemo, useState } from 'react';

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  number: string;
  customer: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const STORAGE_KEY = 'admin_orders_items';

function loadItems(): OrderItem[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function saveItems(items: OrderItem[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export default function Orders() {
  const [items, setItems] = useState<OrderItem[]>(loadItems());

  const addDemo = () => {
    const now = new Date().toISOString();
    const demo: OrderItem = { id: String(Date.now()), number: `ORD-${Math.floor(Math.random()*1000)}`, customer: 'Cliente Exemplo', total: Math.floor(Math.random()*10000), status: 'pending', createdAt: now };
    const next = [demo, ...items]; setItems(next); saveItems(next);
  };

  const setStatus = (id: string, status: OrderStatus) => {
    const next = items.map(i => i.id === id ? { ...i, status } : i);
    setItems(next); saveItems(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Pedidos</h1>
        <button onClick={addDemo} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Adicionar exemplo</button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map(i => (
              <tr key={i.id}>
                <td className="px-6 py-3 text-sm text-gray-900">{i.number}</td>
                <td className="px-6 py-3 text-sm text-gray-500">{i.customer}</td>
                <td className="px-6 py-3 text-sm text-gray-500">AOA {i.total.toLocaleString()}</td>
                <td className="px-6 py-3 text-sm">{i.status}</td>
                <td className="px-6 py-3 text-right text-sm">
                  <select value={i.status} onChange={(e) => setStatus(i.id, e.target.value as OrderStatus)} className="px-3 py-1 rounded-md border border-gray-300">
                    <option value="pending">Pendente</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="shipped">Enviado</option>
                    <option value="delivered">Entregue</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">Nenhum pedido</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


