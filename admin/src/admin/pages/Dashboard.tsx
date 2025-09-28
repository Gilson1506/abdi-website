import React, { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { supabase } from '../../lib/supabase';
import { 
  Users, 
  ShoppingBag, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Package,
  UserPlus,
  Activity
} from 'lucide-react';
import AuthTest from '../components/AuthTest';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
}

function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className={`text-sm ${trendColors[trend]} flex items-center mt-1`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change}
          </p>
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
}

interface RecentActivityItem {
  id: string;
  type: 'order' | 'member' | 'event' | 'project';
  title: string;
  description: string;
  time: string;
  status?: 'success' | 'warning' | 'info';
}

function RecentActivity() {
  const activities: RecentActivityItem[] = [
    {
      id: '1',
      type: 'order',
      title: 'Novo pedido #ORD-001',
      description: 'João Silva - Camiseta ABDI (M)',
      time: 'há 5 minutos',
      status: 'success'
    },
    {
      id: '2',
      type: 'member',
      title: 'Nova candidatura',
      description: 'Maria Santos enviou candidatura',
      time: 'há 15 minutos',
      status: 'info'
    },
    {
      id: '3',
      type: 'event',
      title: 'Inscrição em evento',
      description: 'Workshop de Inovação - 3 novas inscrições',
      time: 'há 30 minutos',
      status: 'info'
    },
    {
      id: '4',
      type: 'project',
      title: 'Projeto submetido',
      description: 'App de Mobilidade Urbana',
      time: 'há 1 hora',
      status: 'warning'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingBag;
      case 'member': return UserPlus;
      case 'event': return Calendar;
      case 'project': return Activity;
      default: return Activity;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="p-2 bg-gray-50 rounded-full">
                <Icon className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
              {activity.status && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status === 'success' && 'Novo'}
                  {activity.status === 'warning' && 'Pendente'}
                  {activity.status === 'info' && 'Ativo'}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [membersCount, setMembersCount] = useState<number>(0);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [revenueTotal, setRevenueTotal] = useState<number>(0);
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [projectsPending, setProjectsPending] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Get counts from various tables
        const [
          { count: members },
          { count: orders },
          { count: events },
          { count: products },
          { count: pendingProjects },
          { data: revenueData }
        ] = await Promise.all([
          supabase.from('admin_users').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('*', { count: 'exact', head: true }),
          supabase.from('events').select('*', { count: 'exact', head: true }).eq('is_published', true),
          supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'active'),
          supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'under_review'),
          supabase.from('financial_transactions').select('amount, type').eq('type', 'income')
        ]);

        if (!mounted) return;

        // Calculate total revenue
        const totalRevenue = revenueData?.reduce((sum, transaction) => sum + Number(transaction.amount), 0) || 0;

        setMembersCount(members || 0);
        setOrdersCount(orders || 0);
        setRevenueTotal(totalRevenue);
        setEventsCount(events || 0);
        setProductsCount(products || 0);
        setProjectsPending(pendingProjects || 0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (!mounted) return;
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const stats = [
    { title: 'Total de Membros', value: membersCount, change: '', trend: 'neutral' as const, icon: Users },
    { title: 'Pedidos', value: ordersCount, change: '', trend: 'neutral' as const, icon: ShoppingBag },
    { title: 'Eventos Publicados', value: eventsCount, change: '', trend: 'neutral' as const, icon: Calendar },
    { title: 'Receita Total', value: `AOA ${revenueTotal.toLocaleString()}`, change: '', trend: 'neutral' as const, icon: DollarSign },
    { title: 'Produtos Ativos', value: productsCount, change: '', trend: 'neutral' as const, icon: Package },
    { title: 'Projetos Pendentes', value: projectsPending, change: '', trend: 'neutral' as const, icon: Activity },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img src="/logo2.png" alt="ABDI" className="h-8 w-8" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do sistema ABDI</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Adicionar Membro</p>
                  <p className="text-xs text-gray-500">Criar nova conta de membro</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Adicionar Produto</p>
                  <p className="text-xs text-gray-500">Novo produto para loja</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Criar Evento</p>
                  <p className="text-xs text-gray-500">Organizar novo evento</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Revisar Projetos</p>
                  <p className="text-xs text-gray-500">23 aguardando revisão</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Vendas por Mês</h3>
          <ReactECharts
            style={{ height: 260 }}
            option={useMemo(() => ({
              darkMode: document.documentElement.classList.contains('dark'),
              tooltip: { trigger: 'axis' },
              xAxis: { type: 'category', data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'] },
              yAxis: { type: 'value' },
              series: [{
                data: [120, 200, 150, 80, 70, 110],
                type: 'bar',
                smooth: true,
                itemStyle: { color: '#2563eb' },
                emphasis: { focus: 'series', itemStyle: { color: '#60a5fa' } },
              }],
              animationDuration: 800,
              animationEasing: 'cubicOut',
            }), [])}
          />
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Crescimento de Membros</h3>
          <ReactECharts
            style={{ height: 260 }}
            option={useMemo(() => ({
              darkMode: document.documentElement.classList.contains('dark'),
              tooltip: { trigger: 'axis' },
              xAxis: { type: 'category', data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'] },
              yAxis: { type: 'value' },
              series: [{
                data: [20, 40, 60, 90, 130, 180],
                type: 'line',
                smooth: true,
                areaStyle: {},
                lineStyle: { color: '#16a34a' },
                itemStyle: { color: '#16a34a' },
              }],
              animationDuration: 800,
              animationEasing: 'cubicOut',
            }), [])}
          />
        </div>
      </div>

      {/* Teste de Autenticação - Temporário */}
      <div className="mb-8">
        <AuthTest />
      </div>
    </div>
  );
}