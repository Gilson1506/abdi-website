import React, { useState, useEffect } from 'react';
import Modal from '../components/UI/Modal';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Shield
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Loader from '../components/UI/Loader';

interface Member {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: 
    | 'Presidente'
    | 'Vice Presidente'
    | 'Social Media'
    | 'Financeiro'
    | 'Normal'
    | 'Fiscal'
    | 'Gestor de Recursos Humanos'
    | 'Operacional'
    | 'Member'
    | 'Premium'
    | 'Volunteer';
  status: 'active' | 'inactive' | 'pending';
  joined_date: string;
  avatar_url?: string;
}

export default function Members() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', password: '', role: 'Member' } as any);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const memberItems: Member[] = (data || []).map(user => ({
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: '', // Admin users don't have phone in current schema
        role: user.role as any,
        status: user.is_active ? 'active' : 'inactive',
        joined_date: user.created_at
      }));

      setMembers(memberItems);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    const labels = {
      active: 'Ativo',
      inactive: 'Inativo',
      pending: 'Pendente'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      'Presidente': 'bg-red-100 text-red-800',
      'Vice Presidente': 'bg-rose-100 text-rose-800',
      'Social Media': 'bg-pink-100 text-pink-800',
      'Financeiro': 'bg-emerald-100 text-emerald-800',
      'Normal': 'bg-slate-100 text-slate-800',
      'Fiscal': 'bg-amber-100 text-amber-800',
      'Gestor de Recursos Humanos': 'bg-teal-100 text-teal-800',
      'Operacional': 'bg-cyan-100 text-cyan-800',
      Member: 'bg-blue-100 text-blue-800',
      Premium: 'bg-purple-100 text-purple-800',
      Volunteer: 'bg-orange-100 text-orange-800',
    };

    const cls = styles[role] || 'bg-gray-100 text-gray-800';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
        {role}
      </span>
    );
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  if (loading) {
    return <Loader message="Carregando membros..." />;
  }

  return (
    <>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Membros</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie os membros da ABDI</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Exportar
          </button>
          <button onClick={() => setOpen(true)} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Membro
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Membros</p>
              <p className="text-2xl font-semibold text-gray-900">1,245</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Membros Ativos</p>
              <p className="text-2xl font-semibold text-gray-900">1,156</p>
            </div>
            <UserPlus className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Novos Este Mês</p>
              <p className="text-2xl font-semibold text-gray-900">89</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendentes</p>
              <p className="text-2xl font-semibold text-gray-900">23</p>
            </div>
            <Shield className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar membros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
            <option value="pending">Pendente</option>
          </select>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas as Funções</option>
            <option value="Presidente">Presidente</option>
            <option value="Vice Presidente">Vice Presidente</option>
            <option value="Social Media">Social Media</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Normal">Normal</option>
            <option value="Fiscal">Fiscal</option>
            <option value="Gestor de Recursos Humanos">Gestor de Recursos Humanos</option>
            <option value="Operacional">Operacional</option>
            <option value="Member">Member</option>
            <option value="Premium">Premium</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Função
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data de Entrada
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {member.full_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.full_name}</div>
                        <div className="text-sm text-gray-500">ID: {member.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {member.email}
                    </div>
                    {member.phone && (
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {member.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(member.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(member.joined_date).toLocaleDateString('pt-AO')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white px-6 py-3 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">4</span> de{' '}
            <span className="font-medium">{filteredMembers.length}</span> membros
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50">
              Anterior
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-gray-50">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
    <Modal open={open} onClose={() => setOpen(false)} title="Novo Membro">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={form.full_name} onChange={(e) => setForm((f: any) => ({ ...f, full_name: e.target.value }))} placeholder="Nome completo" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input type="email" value={form.email} onChange={(e) => setForm((f: any) => ({ ...f, email: e.target.value }))} placeholder="Email" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input value={form.phone} onChange={(e) => setForm((f: any) => ({ ...f, phone: e.target.value }))} placeholder="Telefone" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <input type="password" value={form.password} onChange={(e) => setForm((f: any) => ({ ...f, password: e.target.value }))} placeholder="Senha" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <select value={form.role} onChange={(e) => setForm((f: any) => ({ ...f, role: e.target.value }))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
          <option value="Presidente">Presidente</option>
          <option value="Vice Presidente">Vice Presidente</option>
          <option value="Social Media">Social Media</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Normal">Normal</option>
          <option value="Fiscal">Fiscal</option>
          <option value="Gestor de Recursos Humanos">Gestor de Recursos Humanos</option>
          <option value="Operacional">Operacional</option>
          <option value="Member">Member</option>
          <option value="Premium">Premium</option>
          <option value="Volunteer">Volunteer</option>
        </select>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">Cancelar</button>
        <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">Salvar</button>
      </div>
    </Modal>
    </>
  );
}