# Configuração de Autenticação

## Configuração do Supabase

Para que a autenticação funcione corretamente, você precisa configurar as variáveis de ambiente do Supabase.

### 1. Criar arquivo .env

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Obter credenciais do Supabase

1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá para **Settings > API**
4. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 3. Configurar RLS (Row Level Security)

Execute o SQL fornecido no arquivo `supabase-schema.sql` no SQL Editor do Supabase para configurar as políticas de segurança.

### 4. Criar usuário admin

Execute este SQL no Supabase para criar um usuário admin:

```sql
-- Inserir usuário admin na tabela admin_users
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'admin@abdi.org',
  crypt('admin123', gen_salt('bf')),
  'Administrador',
  'SuperAdmin',
  true
);

-- Criar usuário na tabela auth.users do Supabase
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@abdi.org',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now()
);
```

### 5. Testar autenticação

**Admin:**
- URL: `http://localhost:3000/admin/login`
- Email: `admin@abdi.org`
- Senha: `admin123`

**Usuário:**
- URL: `http://localhost:3000/login`
- Use qualquer email e senha válidos (será criado automaticamente)

## Funcionalidades de Autenticação

### Admin
- ✅ Login com verificação na tabela `admin_users`
- ✅ Controle de permissões por role
- ✅ Proteção de rotas
- ✅ Logout automático
- ✅ Persistência de sessão

### Usuário
- ✅ Login/Registro com Supabase Auth
- ✅ Persistência de sessão
- ✅ Logout
- ✅ Redirecionamento automático

## Troubleshooting

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe
- Verifique se as variáveis estão corretas
- Reinicie o servidor de desenvolvimento

### Erro: "Admin user not found"
- Verifique se o usuário existe na tabela `admin_users`
- Verifique se `is_active = true`
- Verifique se o email está correto

### Erro de conexão com Supabase
- Verifique se a URL do Supabase está correta
- Verifique se a chave anon está correta
- Verifique se o projeto Supabase está ativo
