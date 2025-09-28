import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../../lib/supabase';

export default function AuthTest() {
  const { user, login, logout, loading } = useAuth();
  const [testEmail, setTestEmail] = useState('admin@abdi.org');
  const [testPassword, setTestPassword] = useState('admin123');
  const [testResult, setTestResult] = useState('');

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('admin_users').select('count').limit(1);
      if (error) throw error;
      setTestResult('✅ Conexão com Supabase OK');
    } catch (error) {
      setTestResult(`❌ Erro de conexão: ${error.message}`);
    }
  };

  const testLogin = async () => {
    try {
      const success = await login(testEmail, testPassword);
      setTestResult(success ? '✅ Login realizado com sucesso' : '❌ Falha no login');
    } catch (error) {
      setTestResult(`❌ Erro no login: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Teste de Autenticação</h3>
      
      <div className="space-y-4">
        <div>
          <p><strong>Status:</strong> {user ? `Logado como ${user.email}` : 'Não logado'}</p>
          <p><strong>Role:</strong> {user?.role || 'N/A'}</p>
        </div>

        <div className="space-y-2">
          <button
            onClick={testConnection}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Testar Conexão Supabase
          </button>
          
          <div className="flex space-x-2">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Email"
              className="px-3 py-2 border rounded"
            />
            <input
              type="password"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              placeholder="Senha"
              className="px-3 py-2 border rounded"
            />
            <button
              onClick={testLogin}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Testar Login
            </button>
          </div>
          
          {user && (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>

        {testResult && (
          <div className="p-3 bg-white rounded border">
            {testResult}
          </div>
        )}
      </div>
    </div>
  );
}
