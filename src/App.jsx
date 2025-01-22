
import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Nabar";
import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
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
import { projectId, metadata, networks, wagmiAdapter, solanaWeb3JsAdapter,config } from './config/index';
import Menu from "./components/Menu";
import StoreProvider from "./Context/StoreContext";
import Footer from "./components/Footer";





const generalConfig = {
  projectId,
  metadata,
  networks,
  themeMode: 'light' ,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  ...generalConfig,
})

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
        <Router>
      <Navbar />
      <Hero />
              <Menu />
      <Routes>

        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
          </div>

    </WagmiProvider>
      
    </StoreProvider>

    
    
        
        
    
  );
};

export default App;

