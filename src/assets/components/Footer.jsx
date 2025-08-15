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
    <footer className="glass-effect border-t border-gray-200/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold gradient-text">
                Associação
              </span>
            </div>
            <p className="text-gray-700 text-sm">
              Fomentando inovação e colaboração através de ideias
              transformadoras e projetos impactantes.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <span className="text-gray-800 font-semibold text-lg mb-4 block">
              Links Rápidos
            </span>
            <div className="space-y-2">
              <Link
                to="/sobre"
                className="block text-gray-700 hover:text-blue-600 transition-colors text-sm"
              >
                Sobre Nós
              </Link>
              <Link
                to="/bolsa-ideias"
                className="block text-gray-700 hover:text-blue-600 transition-colors text-sm"
              >
                Bolsa de Ideias
              </Link>
              <Link
                to="/projetos"
                className="block text-gray-700 hover:text-blue-600 transition-colors text-sm"
              >
                Projetos
              </Link>
              <Link
                to="/eventos"
                className="block text-gray-700 hover:text-blue-600 transition-colors text-sm"
              >
                Eventos
              </Link>
            </div>
          </div>

          {/* Recursos */}
          <div>
            <span className="text-gray-800 font-semibold text-lg mb-4 block">
              Recursos
            </span>
            <div className="space-y-2">
              <Link
                to="/noticias"
                className="block text-gray-700 hover:text-blue-600 transition-colors text-sm"
              >
                Notícias
              </Link>
              <Link
                to="/area-associado"
                className="block text-gray-700 hover:text-blue-600 transition-colors text-sm"
              >
                Área do Associado
              </Link>
              <Link
                to="/contato"
                className="block text-gray-700 hover:text-blue-600 transition-colors text-sm"
              >
                Contato
              </Link>
              <span className="block text-gray-700 text-sm cursor-pointer hover:text-blue-600 transition-colors">
                Suporte
              </span>
            </div>
          </div>

          {/* Contato */}
          <div>
            <span className="text-gray-800 font-semibold text-lg mb-4 block">
              Contato
            </span>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 text-sm">
                  contato@associacao.pt
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 text-sm">+351 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700 text-sm">Lisboa, Portugal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200/50 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 Associação. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
