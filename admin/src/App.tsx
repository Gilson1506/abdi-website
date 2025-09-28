import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './admin/hooks/useAuth.tsx';
import AdminRouter from './admin/components/Router/AdminRouter';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/admin/login" replace /> },
    { path: '/admin/*', element: <AdminRouter /> },
  ], {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  });

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;