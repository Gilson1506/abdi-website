import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/assets/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/assets/components/navbar';
import MiniHeader from '@/assets/components/MiniHeader';
import BlueHeader from '@/assets/components/BlueHeader';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <MiniHeader />
          <BlueHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/bolsa-ideias" element={<IdeaExchange />} />
              <Route path="/projetos" element={<Projects />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/eventos/:id" element={<EventDetails />} />
              <Route path="/noticias" element={<News />} />
              <Route path="/noticias/:id" element={<NewsDetails />} />
              <Route path="/area-associado" element={<MemberArea />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
