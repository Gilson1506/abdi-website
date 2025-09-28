import React, { useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Modal from '../components/UI/Modal';

interface Entry {
  id: string;
  date: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
}

const STORAGE_KEY = 'admin_finance_entries';

function loadEntries(): Entry[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function saveEntries(items: Entry[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }

export default function Finance() {
  const [items, setItems] = useState<Entry[]>(loadEntries());
  const [form, setForm] = useState({ description: '', type: 'income', amount: '', date: '' } as any);
  const [open, setOpen] = useState(false);

  const totals = useMemo(() => {
    const income = items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0);
    const expense = items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0);
    return { income, expense, balance: income - expense };
  }, [items]);

  const addEntry = () => {
    if (!form.description || !form.amount || !form.date) return;
    const entry: Entry = {
      id: String(Date.now()),
      date: form.date,
      description: form.description,
      type: form.type,
      amount: Number(form.amount),
    };
    const next = [entry, ...items];
    setItems(next);
    saveEntries(next);
    setForm({ description: '', type: 'income', amount: '', date: '' });
    setOpen(false);
  };

  const removeEntry = (id: string) => {
    const next = items.filter(i => i.id !== id);
    setItems(next);
    saveEntries(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Finanças</h1>
          <p className="text-gray-600">Registre entradas e saídas simples.</p>
        </div>
        <button onClick={() => setOpen(true)} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Nova operação</button>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Fluxo Financeiro</h3>
        <ReactECharts style={{ height: 280 }} option={{
          darkMode: document.documentElement.classList.contains('dark'),
          tooltip: { trigger: 'axis' },
          legend: { data: ['Receitas', 'Despesas'] },
          xAxis: { type: 'category', data: Array.from({length: 12}, (_,i) => `${i+1}`) },
          yAxis: { type: 'value' },
          series: [
            { name: 'Receitas', type: 'line', smooth: true, areaStyle: {}, data: Array.from({length: 12}, () => Math.floor(Math.random()*2000)+500), lineStyle: { color: '#16a34a' }, itemStyle: { color: '#16a34a' } },
            { name: 'Despesas', type: 'line', smooth: true, areaStyle: {}, data: Array.from({length: 12}, () => Math.floor(Math.random()*1500)+300), lineStyle: { color: '#ef4444' }, itemStyle: { color: '#ef4444' } },
          ],
          animationDuration: 900,
        }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
          <p className="text-sm text-gray-600">Receitas</p>
          <p className="text-2xl font-semibold text-green-700">AOA {totals.income.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
          <p className="text-sm text-gray-600">Despesas</p>
          <p className="text-2xl font-semibold text-red-700">AOA {totals.expense.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
          <p className="text-sm text-gray-600">Saldo</p>
          <p className={`text-2xl font-semibold ${totals.balance >= 0 ? 'text-blue-700' : 'text-red-700'}`}>AOA {totals.balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Formulário via modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Nova Operação">
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              value={form.description}
              onChange={(e) => setForm((f: any) => ({ ...f, description: e.target.value }))}
              placeholder="Descrição"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f: any) => ({ ...f, date: e.target.value }))}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <select
              value={form.type}
              onChange={(e) => setForm((f: any) => ({ ...f, type: e.target.value }))}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm((f: any) => ({ ...f, amount: e.target.value }))}
              placeholder="Valor"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">Cancelar</button>
            <button onClick={addEntry} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Adicionar</button>
          </div>
        </div>
      </Modal>

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((i) => (
              <tr key={i.id}>
                <td className="px-6 py-3 text-sm text-gray-500">{new Date(i.date).toLocaleDateString()}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{i.description}</td>
                <td className="px-6 py-3 text-sm">{i.type === 'income' ? 'Receita' : 'Despesa'}</td>
                <td className="px-6 py-3 text-sm text-right">AOA {i.amount.toLocaleString()}</td>
                <td className="px-6 py-3 text-right"><button onClick={() => removeEntry(i.id)} className="text-red-600 hover:text-red-800 text-sm">Remover</button></td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">Sem lançamentos</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


