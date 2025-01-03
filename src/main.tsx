import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
// Importa solo Analytics si lo necesitas
import { getAnalytics } from "firebase/analytics";

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
