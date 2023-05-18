import React from 'react';
import ReactDOM from 'react-dom/client';

// Tailwind
import './style/index.css';

// Context
import SiteProvider from './context/SiteContext'

// React Router
import { BrowserRouter } from 'react-router-dom';

// Components
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SiteProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SiteProvider>
  </React.StrictMode>
);

