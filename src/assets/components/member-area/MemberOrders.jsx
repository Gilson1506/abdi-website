import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const formatMoney = (value, currency='AOA') => {
  try { return new Intl.NumberFormat('pt-AO', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value); } catch { return `${value} ${currency}`; }
};

const MemberOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(saved);
  }, []);

  return (
    <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
      <div className="glass-effect p-8 rounded-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Pedidos</h2>
        {orders.length === 0 ? (
          <p className="text-gray-700">Você ainda não possui pedidos.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="p-6 bg-gray-100 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-gray-700 text-sm">#{order.id}</div>
                  <div className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString('pt-PT')}</div>
                </div>
                <div className="space-y-2 mb-3">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm text-gray-800">
                      <div>{it.name}{it.variant ? ` / ${it.variant}` : ''} × {it.qty}</div>
                      <div className="font-medium">{formatMoney(it.price*it.qty, order.currency)}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Total</span>
                  <span className="font-bold text-blue-700">{formatMoney(order.total, order.currency)}</span>
                </div>
                <div className="mt-2 text-sm"><span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">{order.status}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MemberOrders;


