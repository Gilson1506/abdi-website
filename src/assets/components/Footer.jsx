import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/logo1.png"
                alt="Bolsa de Ideias"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/logo2.png';
                  e.currentTarget.style.display = 'block';
                }}
              />
              <span className="text-xl font-bold text-white">
                Bolsa de Ideias
              </span>
            </div>
            <p className="text-blue-100 text-sm">
              Fomentando inovação e colaboração através de ideias
              transformadoras e projetos impactantes.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Rápidos - Horizontal em mobile */}
          <div>
            <span className="text-white font-semibold text-lg mb-4 block">
              Links Rápidos
            </span>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:space-y-2">
              <Link
                to="/sobre"
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                Sobre Nós
              </Link>
              <Link
                to="/bolsa-ideias"
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                Bolsa de Ideias
              </Link>
              <Link
                to="/projetos"
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                Projetos
              </Link>
              <Link
                to="/eventos"
                className="text-blue-200 hover:text-white transition-colors text-sm"
              >
                Eventos
              </Link>
            </div>
          </div>

          {/* Recursos */}
          <div className="hidden md:block">
            <span className="text-white font-semibold text-lg mb-4 block">
              Recursos
            </span>
            <div className="space-y-2">
              <Link
                to="/noticias"
                className="block text-blue-200 hover:text-white transition-colors text-sm"
              >
                Notícias
              </Link>
              <Link
                to="/area-associado"
                className="block text-blue-200 hover:text-white transition-colors text-sm"
              >
                Área do Associado
              </Link>
              <Link
                to="/contato"
                className="block text-blue-200 hover:text-white transition-colors text-sm"
              >
                Contato
              </Link>
              <span className="block text-blue-200 text-sm cursor-pointer hover:text-white transition-colors">
                Suporte
              </span>
            </div>
          </div>

          {/* Contato - Horizontal em mobile */}
          <div>
            <span className="text-white font-semibold text-lg mb-4 block">
              Contato
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-2 md:space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-300" />
                <span className="text-blue-200 text-sm">
                  contato@associacao.pt
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-300" />
                <span className="text-blue-200 text-sm">+351 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-300" />
                <span className="text-blue-200 text-sm">Lunda Sul, Saurimo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-6 pt-6 text-center">
          <p className="text-blue-200 text-xs sm:text-sm">
            © 2024 Bolsa de Ideias. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
