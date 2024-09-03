'use client';

import React, { useCallback, useMemo } from 'react';
import { Adapter } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  BitgetWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { env } from 'env.mjs';

import AutoConnectProvider from './auto-connect-provider';

function WalletConnectProvider({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BitgetWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const autoConnect = useCallback(async (adapter: Adapter) => {
    adapter.autoConnect().catch((e) => {
      console.error(e);
    });
    return false;
  }, []);

  return (
    <AutoConnectProvider>
      <ConnectionProvider
        endpoint={env.NEXT_PUBLIC_RPC_URL}
        config={{
          commitment: 'confirmed',
          confirmTransactionInitialTimeout: 30000,
        }}
      >
        <WalletProvider wallets={wallets} autoConnect={autoConnect}>
          {children}
        </WalletProvider>
      </ConnectionProvider>
    </AutoConnectProvider>
  );
}

export default WalletConnectProvider;
