import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
// Importa solo Analytics si lo necesitas
import { getAnalytics } from "firebase/analytics";
import { environment } from './environments/environment';

// Inicializar Firebase
const app = initializeApp(environment.firebase);

// Inicializar Analytics (opcional)
if (process.env.NODE_ENV === 'production' || location.hostname === 'localhost') {
  const analytics = getAnalytics(app);
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
