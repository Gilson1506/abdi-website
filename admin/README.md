# ABDI Admin Panel

Sistema completo de administração para a Associação Brasileira de Desenvolvimento e Inovação (ABDI).

## Funcionalidades

### 🔐 Autenticação e Segurança
- Sistema de login para administradores
- Controle de acesso baseado em funções (RBAC)
- Auditoria completa de ações administrativas
- Sessões seguras com JWT

### 👥 Gestão de Membros
- Cadastro e edição de membros
- Aprovação de candidaturas de associação
- Controle de status e permissões
- Upload e gerenciamento de currículos

### 🛒 E-commerce (Loja)
- Gestão de produtos e categorias
- Controle de estoque
- Processamento de pedidos
- Relatórios de vendas

### 📅 Eventos
- Criação e gestão de eventos
- Sistema de inscrições
- Controle de presença
- Comunicação com participantes

### 💡 Projetos e Ideias
- Recebimento de submissões
- Sistema de moderação
- Aprovação/rejeição com feedback
- Acompanhamento de status

### 🎨 Gestão de Conteúdo
- Upload de logos e imagens
- Configuração de carrosséis
- Gerenciamento de navegação
- Configurações de SEO

## Funções de Usuário

### SuperAdmin
- Acesso total ao sistema
- Gerenciamento de outros admins
- Configurações críticas de segurança

### Admin
- Gestão geral do sistema
- Todas as funcionalidades exceto configurações críticas

### StoreManager
- Gerenciamento da loja
- Produtos, pedidos e relatórios de vendas

### EventManager
- Criação e gestão de eventos
- Comunicação com participantes

### ContentEditor
- Gestão de conteúdo visual
- Navegação e páginas estáticas

### Support
- Visualização de perfis e tickets
- Suporte aos usuários

### Moderator
- Revisão de projetos e submissões
- Moderação de conteúdo

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o Supabase:
   - Crie uma conta no Supabase
   - Execute as migrações do banco de dados
   - Configure as variáveis de ambiente

4. Execute as migrações:
   ```bash
   # As migrações estão em /supabase/migrations/
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Configuração do Banco de Dados

O sistema usa Supabase como backend. Execute as migrações para configurar:

```sql
-- Execute o arquivo: supabase/migrations/create_admin_system.sql
```

## Login de Demonstração

Para testar o sistema, use as credenciais padrão:

- **Email:** admin@abdi.org
- **Senha:** admin123

**⚠️ IMPORTANTE:** Altere essas credenciais em produção!

## Estrutura do Projeto

```
src/
├── admin/                 # Sistema administrativo
│   ├── components/       # Componentes do admin
│   ├── hooks/           # Hooks personalizados
│   ├── pages/           # Páginas do admin
│   └── utils/           # Utilitários
├── components/          # Componentes públicos
├── lib/                 # Configurações e utilitários
└── types/              # Tipos TypeScript
```

## Tecnologias Utilizadas

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Roteamento:** React Router
- **Estado:** Context API + Hooks
- **UI:** Lucide Icons + Tailwind CSS
- **Banco:** PostgreSQL com RLS (Row Level Security)

## Segurança

- Row Level Security (RLS) habilitado em todas as tabelas
- Políticas de acesso baseadas em funções
- Auditoria completa de ações
- Validação de dados no frontend e backend
- Sanitização de inputs

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto é privado e proprietário da ABDI.