-- ABDI Website Database Schema
-- Execute this in your Supabase SQL Editor

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('SuperAdmin', 'Admin', 'StoreManager', 'EventManager', 'ContentEditor', 'Support', 'Moderator')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  price DECIMAL(10,2) NOT NULL,
  inventory_quantity INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'refunded', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  banner_image VARCHAR(500),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location VARCHAR(255),
  max_attendees INTEGER,
  price DECIMAL(10,2) DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  banner_image VARCHAR(500),
  submitted_by UUID REFERENCES auth.users(id),
  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  banner_image VARCHAR(500),
  category VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID REFERENCES auth.users(id),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  notes TEXT,
  attachments TEXT[] DEFAULT '{}',
  video_conference_link VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create financial_transactions table
CREATE TABLE IF NOT EXISTS financial_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100),
  reference VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create live_streams table
CREATE TABLE IF NOT EXISTS live_streams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  platform VARCHAR(20) NOT NULL CHECK (platform IN ('youtube', 'vimeo', 'hls', 'other')),
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create carousel_items table
CREATE TABLE IF NOT EXISTS carousel_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('news', 'event', 'project')),
  item_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  link_url VARCHAR(500),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schedule_items table
CREATE TABLE IF NOT EXISTS schedule_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  type VARCHAR(20) DEFAULT 'meeting' CHECK (type IN ('meeting', 'event', 'deadline', 'other')),
  attachments TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, full_name, role, is_active) 
VALUES (
  'admin@abdi.org', 
  '$2a$10$rQZ8K3Y7vJ8K3Y7vJ8K3Y7vJ8K3Y7vJ8K3Y7vJ8K3Y7vJ8K3Y7vJ8K3Y7', -- This is a placeholder hash, replace with actual bcrypt hash
  'Super Administrador',
  'SuperAdmin',
  true
) ON CONFLICT (email) DO NOTHING;

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Tecnologia', 'tecnologia', 'Produtos e serviços relacionados à tecnologia'),
('Inovação', 'inovacao', 'Produtos inovadores e disruptivos'),
('Comunidade', 'comunidade', 'Itens da comunidade e eventos')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, description, category_id, price, inventory_quantity, status) 
SELECT 
  'Curso de Inovação',
  'curso-inovacao',
  'Curso completo sobre inovação e empreendedorismo',
  c.id,
  99.99,
  50,
  'active'
FROM categories c WHERE c.slug = 'inovacao'
ON CONFLICT (slug) DO NOTHING;

-- Insert sample news
INSERT INTO news (title, subtitle, slug, content, category, is_featured, status, published_at) VALUES
(
  'Nova Parceria Estratégica',
  'ABDI anuncia parceria com grandes empresas de tecnologia',
  'nova-parceria-estrategica',
  'A ABDI está orgulhosa de anunciar uma nova parceria estratégica que trará grandes benefícios para nossos membros...',
  'Notícias',
  true,
  'published',
  NOW()
),
(
  'Evento de Inovação 2024',
  'Maior evento de inovação do ano acontece em março',
  'evento-inovacao-2024',
  'Prepare-se para o maior evento de inovação do ano! Teremos palestrantes renomados e workshops práticos...',
  'Eventos',
  false,
  'published',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample events
INSERT INTO events (title, slug, description, start_date, end_date, location, max_attendees, price, is_published) VALUES
(
  'Workshop de Empreendedorismo',
  'workshop-empreendedorismo',
  'Aprenda os fundamentos do empreendedorismo com especialistas da área',
  NOW() + INTERVAL '7 days',
  NOW() + INTERVAL '7 days' + INTERVAL '4 hours',
  'Sede da ABDI',
  50,
  25.00,
  true
),
(
  'Conferência de Inovação',
  'conferencia-inovacao',
  'Maior conferência de inovação do ano com palestrantes internacionais',
  NOW() + INTERVAL '30 days',
  NOW() + INTERVAL '30 days' + INTERVAL '2 days',
  'Centro de Convenções',
  500,
  150.00,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, status) VALUES
(
  'App de Mobilidade Urbana',
  'Aplicativo inovador para otimizar o transporte público na cidade',
  'approved'
),
(
  'Sistema de Gestão Sustentável',
  'Plataforma para monitoramento de práticas sustentáveis em empresas',
  'under_review'
)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access
CREATE POLICY "Public read access for published content" ON news FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access for published events" ON events FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access for published projects" ON projects FOR SELECT USING (status = 'approved');
CREATE POLICY "Public read access for active products" ON products FOR SELECT USING (status = 'active');
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (is_active = true);

-- Create RLS policies for admin access
CREATE POLICY "Admin full access to admin_users" ON admin_users FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.email = auth.jwt() ->> 'email' 
    AND au.is_active = true
  )
);

CREATE POLICY "Admin full access to all content" ON news FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.email = auth.jwt() ->> 'email' 
    AND au.is_active = true
  )
);

CREATE POLICY "Admin full access to events" ON events FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.email = auth.jwt() ->> 'email' 
    AND au.is_active = true
  )
);

CREATE POLICY "Admin full access to projects" ON projects FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.email = auth.jwt() ->> 'email' 
    AND au.is_active = true
  )
);

CREATE POLICY "Admin full access to products" ON products FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.email = auth.jwt() ->> 'email' 
    AND au.is_active = true
  )
);

CREATE POLICY "Admin full access to applications" ON applications FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.email = auth.jwt() ->> 'email' 
    AND au.is_active = true
  )
);

CREATE POLICY "Admin full access to financial_transactions" ON financial_transactions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.email = auth.jwt() ->> 'email' 
    AND au.is_active = true
  )
);

CREATE POLICY "Admin full access to live_streams" ON live_streams FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.email = auth.jwt() ->> 'email' 
    AND au.is_active = true
  )
);

CREATE POLICY "Admin full access to carousel_items" ON carousel_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.email = auth.jwt() ->> 'email' 
    AND au.is_active = true
  )
);

CREATE POLICY "Admin full access to schedule_items" ON schedule_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.email = auth.jwt() ->> 'email' 
    AND au.is_active = true
  )
);

-- Create RLS policies for authenticated users
CREATE POLICY "Users can read their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own orders" ON orders FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at);
CREATE INDEX IF NOT EXISTS idx_events_is_published ON events(is_published);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_type ON financial_transactions(type);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_created_at ON financial_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_live_streams_is_active ON live_streams(is_active);
CREATE INDEX IF NOT EXISTS idx_carousel_items_is_active ON carousel_items(is_active);
CREATE INDEX IF NOT EXISTS idx_schedule_items_start_date ON schedule_items(start_date);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_live_streams_updated_at BEFORE UPDATE ON live_streams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schedule_items_updated_at BEFORE UPDATE ON schedule_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
