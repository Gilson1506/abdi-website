import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/assets/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/assets/components/navbar';
import BlueHeader from '@/assets/components/BlueHeader';
import MiniHeader from '@/assets/components/MiniHeader';
import Footer from '@/assets/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import IdeaExchange from '@/pages/IdeaExchange';
import Projects from '@/pages/Projects';
import Events from '@/pages/Events';
import EventDetails from '@/pages/EventDetails';
import News from '@/pages/News';
import NewsDetails from '@/pages/NewsDetails';
import MemberArea from '@/pages/MemberArea';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Store from '@/pages/Store';
import LiveRoom from '@/pages/LiveRoom';
import Checkout from '@/pages/Checkout';

function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MiniHeader />
      <BlueHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rotas de autenticação sem header/footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            {/* Rotas principais com header/footer via layout */}
            <Route path="/" element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="sobre" element={<About />} />
              <Route path="bolsa-ideias" element={<IdeaExchange />} />
              <Route path="projetos" element={<Projects />} />
              <Route path="eventos" element={<Events />} />
              <Route path="eventos/:id" element={<EventDetails />} />
              <Route path="noticias" element={<News />} />
              <Route path="noticias/:id" element={<NewsDetails />} />
              <Route path="area-associado" element={<MemberArea />} />
              <Route path="contato" element={<Contact />} />
              <Route path="loja" element={<Store />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="sala" element={<LiveRoom />} />
            </Route>

            {/* Fallback 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
