import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import StoreProvider from './Context/StoreContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </StoreProvider>
);
