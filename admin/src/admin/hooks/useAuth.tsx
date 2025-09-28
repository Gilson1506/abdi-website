import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '../../lib/supabase';

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'SuperAdmin' | 'Admin' | 'StoreManager' | 'EventManager' | 'ContentEditor' | 'Support' | 'Moderator';
  is_active: boolean;
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const rolePermissions = {
  SuperAdmin: ['*'],
  Admin: ['users.read', 'users.write', 'store.read', 'store.write', 'events.read', 'events.write', 'content.read', 'content.write', 'projects.read', 'projects.write'],
  StoreManager: ['store.read', 'store.write', 'orders.read', 'orders.write'],
  EventManager: ['events.read', 'events.write', 'registrations.read', 'registrations.write'],
  ContentEditor: ['content.read', 'content.write', 'navigation.read', 'navigation.write'],
  Support: ['users.read', 'orders.read', 'projects.read'],
  Moderator: ['projects.read', 'projects.write', 'content.read']
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadAdminUser(session.user.email!);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await loadAdminUser(session.user.email!);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setLoading(false);
    }
  };

  const loadAdminUser = async (email: string) => {
    try {
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Error fetching admin user:', error);
        setLoading(false);
        return;
      }

      if (adminUser && adminUser.is_active) {
        setUser({
          id: adminUser.id,
          email: adminUser.email,
          full_name: adminUser.full_name,
          role: adminUser.role,
          is_active: adminUser.is_active
        });
      } else {
        console.error('Admin user not found or inactive');
        setUser(null);
      }
    } catch (error) {
      console.error('Error loading admin user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      if (data.user) {
        // Get admin user data
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', email)
          .single();

        if (adminError || !adminUser || !adminUser.is_active) {
          console.error('Admin user not found or inactive:', adminError);
          await supabase.auth.signOut();
          return false;
        }

        setUser({
          id: adminUser.id,
          email: adminUser.email,
          full_name: adminUser.full_name,
          role: adminUser.role,
          is_active: adminUser.is_active
        });

        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const permissions = rolePermissions[user.role] || [];
    return permissions.includes('*') || permissions.includes(permission);
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};


