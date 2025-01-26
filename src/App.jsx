import { createAppKit } from '@reown/appkit/react';
import React from 'react';
import Navbar from './components/Navbar';

import { WagmiProvider } from 'wagmi';
//import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
//import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
//import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
//import {
// PhantomWalletAdapter,
// SolflareWalletAdapter,
//} from "@solana/wallet-adapter-wallets";
//import { clusterApiUrl } from "@solana/web3.js";

// Default styles for wallet modal
//import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletProvider } from '@solana/wallet-adapter-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
  //const network = WalletAdapterNetwork.Devnet; // Use Mainnet or Testnet as needed
  //const endpoint = clusterApiUrl(network);

  // Initialize wallets
  //const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <StoreProvider>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        {/* Your app components */}
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
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
