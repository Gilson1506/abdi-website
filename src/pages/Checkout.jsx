import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const formatMoney = (value) => new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA', maximumFractionDigits: 0 }).format(value);

function generateReference() {
  const entity = '11654';
  const reference = String(Math.floor(100000000 + Math.random()*900000000));
  return { entity, reference };
}

export default function Checkout() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);
  const [method, setMethod] = useState('multicaixa');
  const [phone, setPhone] = useState('');
  const [refData, setRefData] = useState(generateReference());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const d = JSON.parse(localStorage.getItem('checkout_draft') || 'null');
    setDraft(d);
    setRefData(generateReference());
  }, []);

  const total = useMemo(() => (draft?.items || []).reduce((s, i) => s + i.price * i.qty, 0), [draft]);

  const confirm = () => {
    if (!draft) return;
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = {
      id: Date.now(),
      items: draft.items,
      total,
      currency: 'AOA',
      status: method === 'multicaixa' ? 'Aguardando pagamento (Multicaixa Express)' : 'Aguardando pagamento (Referência)',
      method,
      buyer: { name, email, phone },
      payment: method === 'multicaixa' ? { phone } : { ...refData },
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('orders', JSON.stringify([order, ...orders]));
    localStorage.removeItem('checkout_draft');
    navigate('/area-associado');
  };

  if (!draft) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-gray-700">Não há itens para pagamento. Voltar à loja.</p>
        <button onClick={() => navigate('/loja')} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Ir para a Loja</button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - ABDI</title>
      </Helmet>
      <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dados do Cliente</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" className="w-full px-3 py-2 border rounded" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Método de Pagamento</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 border rounded cursor-pointer">
                <input type="radio" name="pay" checked={method==='multicaixa'} onChange={() => setMethod('multicaixa')} />
                <div>
                  <p className="font-medium">Multicaixa Express</p>
                  <p className="text-sm text-gray-600">Insira o número associado ao seu Multicaixa Express para solicitar o pagamento.</p>
                </div>
              </label>
              {method==='multicaixa' && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefone Multicaixa Express" className="w-full px-3 py-2 border rounded" />
                </div>
              )}

              <label className="flex items-center gap-3 p-3 border rounded cursor-pointer">
                <input type="radio" name="pay" checked={method==='referencia'} onChange={() => setMethod('referencia')} />
                <div>
                  <p className="font-medium">Referência de Pagamento</p>
                  <p className="text-sm text-gray-600">Geraremos entidade e referência para pagamento presencial/online.</p>
                </div>
              </label>
              {method==='referencia' && (
                <div className="grid sm:grid-cols-3 gap-3 bg-gray-50 rounded p-3">
                  <div>
                    <p className="text-xs text-gray-500">Entidade</p>
                    <p className="font-mono text-lg">{refData.entity}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-500">Referência</p>
                    <p className="font-mono text-lg tracking-wider">{refData.reference}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo</h3>
            <div className="space-y-3">
              {draft.items.map((i) => (
                <div key={`${i.id}:${i.variant||''}`} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-900">{i.name} {i.variant && <span className="text-gray-500">/ {i.variant}</span>}</p>
                    <p className="text-xs text-gray-600">{i.qty} × {formatMoney(i.price)}</p>
                  </div>
                  <div className="font-medium">{formatMoney(i.price * i.qty)}</div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-gray-600">Total</span>
                <span className="font-bold">{formatMoney(total)}</span>
              </div>
              <button onClick={confirm} className="w-full mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">Confirmar Pedido</button>
              <button onClick={() => navigate('/loja')} className="w-full px-4 py-2 border rounded">Voltar à Loja</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


