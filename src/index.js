import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container); // Crea el root con createRoot
root.render(<App />); // Renderiza la aplicación
