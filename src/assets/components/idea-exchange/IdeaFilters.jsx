import React from 'react';
import { Search } from 'lucide-react';

const categories = [
  'Tecnologia',
  'Sustentabilidade',
  'Educação',
  'Saúde',
  'Inovação Social',
  'Empreendedorismo',
  'Arte & Cultura',
  'Outro',
];

const IdeaFilters = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="glass-effect p-6 rounded-2xl">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              name="searchTerm"
              placeholder="Pesquisar ideias..."
              value={filters.searchTerm}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas as Categorias</option>
            {categories.map((category) => (
              <option key={category} value={category} className="bg-white">
                {category}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os Status</option>
            <option value="under-review" className="bg-white">
              Em Análise
            </option>
            <option value="approved" className="bg-white">
              Aprovado
            </option>
            <option value="in-progress" className="bg-white">
              Em Execução
            </option>
            <option value="completed" className="bg-white">
              Concluído
            </option>
            <option value="rejected" className="bg-white">
              Rejeitado
            </option>
          </select>

          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleInputChange}
            className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent" className="bg-white">
              Mais Recentes
            </option>
            <option value="votes" className="bg-white">
              Mais Votadas
            </option>
            <option value="comments" className="bg-white">
              Mais Comentadas
            </option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default IdeaFilters;
