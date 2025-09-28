import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AdminLogin from '../../pages/Login';
import AdminLayout from '../Layout/AdminLayout';
import Dashboard from '../../pages/Dashboard';
import Loader from '../../components/UI/Loader';
import Members from '../../pages/Members';
import News from '../../pages/News';
import Events from '../../pages/Events';
import Projects from '../../pages/Projects';
import Finance from '../../pages/Finance';
import Live from '../../pages/Live';
import Applications from '../../pages/Applications';
import Store from '../../pages/Store';
import Orders from '../../pages/Orders';
import Content from '../../pages/Content';
import Files from '../../pages/Files';
import Reports from '../../pages/Reports';
import Schedule from '../../pages/Schedule';
import Settings from '../../pages/Settings';
import ApplicationRoom from '../../pages/ApplicationRoom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="login" replace />;
  }

  return <>{children}</>;
}

export default function AdminRouter() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="news" element={<News />} />
        <Route path="events" element={<Events />} />
        <Route path="projects" element={<Projects />} />
        <Route path="finance" element={<Finance />} />
        <Route path="live" element={<Live />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/:id" element={<ApplicationRoom />} />
        <Route path="store" element={<Store />} />
        <Route path="orders" element={<Orders />} />
        <Route path="content" element={<Content />} />
        <Route path="files" element={<Files />} />
        <Route path="reports" element={<Reports />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}