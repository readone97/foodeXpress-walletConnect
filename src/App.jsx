import { createAppKit } from '@reown/appkit/react';
import React from 'react';
import Navbar from './components/Navbar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import Footer from './components/Footer';
import {
  metadata,
  networks,
  projectId,
  solanaWeb3JsAdapter,
  wagmiAdapter,
} from './config/index';
import StoreProvider from './Context/StoreContext';
import Cart from './pages/Cart';
import Home from './pages/Home';

const generalConfig = {
  projectId,
  metadata,
  networks,
  themeMode: 'light',
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  },
};

// Create modal
createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  ...generalConfig,
});

const App = () => {
  return (
    <StoreProvider>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </WagmiProvider>
    </StoreProvider>
  );
};

export default App;
