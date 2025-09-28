import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

export default function Reports() {
  const data = useMemo(() => ({
    members: 1245,
    orders: 312,
    revenue: 125430,
    events: 7,
  }), []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Relatórios</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"><p className="text-sm text-gray-600 dark:text-gray-400">Membros</p><p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{data.members}</p></div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"><p className="text-sm text-gray-600 dark:text-gray-400">Pedidos</p><p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{data.orders}</p></div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"><p className="text-sm text-gray-600 dark:text-gray-400">Receita (AOA)</p><p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{data.revenue.toLocaleString()}</p></div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"><p className="text-sm text-gray-600 dark:text-gray-400">Eventos</p><p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{data.events}</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Receita Últimos 12 Meses</h3>
          <ReactECharts style={{ height: 280 }} option={{
            darkMode: document.documentElement.classList.contains('dark'),
            xAxis: { type: 'category', data: Array.from({length: 12}, (_,i) => `${i+1}`) },
            yAxis: { type: 'value' },
            tooltip: { trigger: 'axis' },
            series: [{ type: 'bar', data: Array.from({length: 12}, () => Math.floor(Math.random()*200)+50), itemStyle: { color: '#2563eb' } }],
            animationDuration: 900,
          }} />
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Pedidos por Status</h3>
          <ReactECharts style={{ height: 280 }} option={{
            darkMode: document.documentElement.classList.contains('dark'),
            tooltip: { trigger: 'item' },
            series: [{
              type: 'pie', radius: ['40%', '70%'],
              data: [
                { value: 104, name: 'Pendente' },
                { value: 80, name: 'Confirmado' },
                { value: 45, name: 'Enviado' },
                { value: 130, name: 'Entregue' },
                { value: 12, name: 'Cancelado' },
              ],
              emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
            }],
            animationDuration: 900,
          }} />
        </div>
      </div>
    </div>
  );
}


