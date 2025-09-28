import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
// Theme bootstrap
try {
  const dark = localStorage.getItem('admin_theme_dark') === '1';
  document.documentElement.classList.toggle('dark', dark);
} catch {}
