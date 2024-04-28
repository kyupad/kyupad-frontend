'use client';

import React, { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  // Coin98WalletAdapter,
  // CoinbaseWalletAdapter,
  // MathWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  // SpotWalletAdapter,
  // TorusWalletAdapter,
  // TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { env } from 'env.mjs';

function WalletConnectProvider({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      // new Coin98WalletAdapter(),
      // new TrustWalletAdapter(),
      // new TorusWalletAdapter(),
      // new MathWalletAdapter(),
      // new CoinbaseWalletAdapter(),
      // new SpotWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ConnectionProvider
      endpoint={env.NEXT_PUBLIC_RPC_URL}
      config={{
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 30000,
      }}
    >
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default WalletConnectProvider;
