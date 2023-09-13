import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';
import './services/i18n';
import './index.css';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
