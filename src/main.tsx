import '@/lib';
import React from 'react';

import ReactDOM from 'react-dom/client';

import { App } from '@/App';

import '@/index.css';

// Wait for React to mount before hiding loading screen
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
