import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import {
  mainnet,
  arbitrum,
  solana,
  solanaDevnet,
  solanaTestnet,
} from '@reown/appkit/networks';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

// Get projectId from https://cloud.reown.com
// Use the project ID here (this is an example public project ID for localhost)
export const projectId = '50d19ad50711238c2c9aeae2d4a54f99';
if (!projectId) {
  throw new Error('Project ID is not defined');
}

// Metadata for the application
export const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://foode-xpress-wallet-connect.vercel.app/' // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// Define the networks to be used
export const networks = [
  mainnet,
  arbitrum,
  solana,
  solanaDevnet,
  solanaTestnet,
];

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

// Set up Solana Adapter
export const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

// Export configurations
export const config = wagmiAdapter.wagmiConfig;
