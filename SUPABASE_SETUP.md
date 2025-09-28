# Configuração do Supabase para ABDI Website

Este guia explica como configurar o Supabase para usar dados reais no projeto ABDI.

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha sua organização
5. Preencha:
   - **Name**: `abdi-website`
   - **Database Password**: (escolha uma senha forte)
   - **Region**: escolha a região mais próxima
6. Clique em "Create new project"

## 2. Configurar Variáveis de Ambiente

### No diretório raiz (app público):
Crie um arquivo `.env` com:
```env
VITE_SUPABASE_URL=https://seu-projeto-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

### No diretório admin:
Crie um arquivo `.env` com:
```env
VITE_SUPABASE_URL=https://seu-projeto-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

### Como obter as credenciais:
1. No dashboard do Supabase, vá para **Settings** > **API**
2. Copie a **Project URL** para `VITE_SUPABASE_URL`
3. Copie a **anon public** key para `VITE_SUPABASE_ANON_KEY`

## 3. Configurar o Banco de Dados

1. No dashboard do Supabase, vá para **SQL Editor**
2. Clique em **New query**
3. Copie e cole o conteúdo do arquivo `supabase-schema.sql`
4. Clique em **Run** para executar o script

Este script irá:
- Criar todas as tabelas necessárias
- Inserir dados de exemplo
- Configurar políticas de segurança (RLS)
- Criar índices para performance

## 4. Configurar Autenticação

### Para usuários públicos:
1. Vá para **Authentication** > **Settings**
2. Em **Site URL**, adicione: `http://localhost:5173`
3. Em **Redirect URLs**, adicione: `http://localhost:5173/area-associado`

### Para administradores:
1. Vá para **Authentication** > **Users**
2. Clique em **Add user**
3. Crie um usuário admin com email `admin@abdi.org`
4. Defina uma senha temporária
5. No SQL Editor, execute:
```sql
UPDATE admin_users 
SET password_hash = crypt('admin123', gen_salt('bf'))
WHERE email = 'admin@abdi.org';
```

## 5. Configurar Storage (Opcional)

Para upload de imagens:
1. Vá para **Storage**
2. Crie um bucket chamado `uploads`
3. Configure as políticas de acesso conforme necessário

## 6. Testar a Configuração

### App Público:
```bash
npm run dev
```
- Acesse `http://localhost:5173`
- Teste o registro e login de usuários

### Admin:
```bash
cd admin
npm run dev
```
- Acesse `http://localhost:5173/admin`
- Faça login com `admin@abdi.org` / `admin123`

## 7. Estrutura das Tabelas

### Tabelas Principais:
- `admin_users` - Usuários administradores
- `news` - Notícias e artigos
- `events` - Eventos
- `projects` - Projetos submetidos
- `products` - Produtos da loja
- `orders` - Pedidos
- `applications` - Candidaturas
- `financial_transactions` - Transações financeiras
- `live_streams` - Streams ao vivo
- `carousel_items` - Itens do carrossel
- `schedule_items` - Itens do cronograma

### Políticas de Segurança:
- Usuários públicos podem ler conteúdo publicado
- Administradores têm acesso total
- Usuários autenticados podem gerenciar seus próprios dados

## 8. Solução de Problemas

### Erro de CORS:
- Verifique se as URLs estão corretas nas configurações de autenticação

### Erro de RLS:
- Verifique se as políticas foram criadas corretamente
- Teste as consultas no SQL Editor

### Erro de conexão:
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo

## 9. Próximos Passos

Após a configuração:
1. Personalize os dados de exemplo
2. Configure notificações por email
3. Implemente upload de arquivos
4. Configure backups automáticos
5. Monitore performance e uso

## Suporte

Para dúvidas ou problemas:
- Consulte a [documentação do Supabase](https://supabase.com/docs)
- Verifique os logs no dashboard do Supabase
- Teste as consultas no SQL Editor
