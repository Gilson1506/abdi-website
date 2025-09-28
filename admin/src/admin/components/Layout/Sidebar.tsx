import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  Calendar, 
  Lightbulb, 
  FileText,
  Newspaper,
  Images,
  Palette,
  Settings,
  BarChart3,
  Shield,
  X,
  Store,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  permission?: string;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Membros', href: '/admin/members', icon: Users, permission: 'users.read' },
  { name: 'Candidaturas', href: '/admin/applications', icon: UserCheck, permission: 'users.read' },
  { name: 'Notícias', href: '/admin/news', icon: Newspaper, permission: 'content.write' },
  { name: 'Finanças', href: '/admin/finance', icon: BarChart3, permission: 'store.read' },
  { name: 'Ao Vivo', href: '/admin/live', icon: Images, permission: 'content.read' },
  { name: 'Loja', href: '/admin/store', icon: Store, permission: 'store.read' },
  { name: 'Pedidos', href: '/admin/orders', icon: ShoppingBag, permission: 'orders.read' },
  { name: 'Eventos', href: '/admin/events', icon: Calendar, permission: 'events.read' },
  { name: 'Projetos', href: '/admin/projects', icon: Lightbulb, permission: 'projects.read' },
  { name: 'Conteúdo', href: '/admin/content', icon: Palette, permission: 'content.read' },
  { name: 'Arquivos', href: '/admin/files', icon: FileText, permission: 'content.read' },
  { name: 'Relatórios', href: '/admin/reports', icon: BarChart3, permission: 'store.read' },
  { name: 'Cronograma', href: '/admin/schedule', icon: Shield, permission: 'users.read' },
  { name: 'Configurações', href: '/admin/settings', icon: Settings, permission: 'content.write' }
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user, hasPermission } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    !item.permission || hasPermission(item.permission)
  );

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
          <div className="fixed inset-0 bg-gray-900/80" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
          <img src="/logo2.png" alt="ABDI Admin" className="h-8 w-auto" />
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-6 py-6">
          <ul className="space-y-1">
            {filteredNavigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => `
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                  onClick={() => onClose()}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User info */}
        {user && (
          <div className="border-t border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.full_name.charAt(0)}
                </div>
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {user.full_name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}