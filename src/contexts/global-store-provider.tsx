/* eslint-disable no-unused-vars */
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { doRefreshToken } from '@/adapters/auth';
import { createGlobalStore, withStorageDOMEvents } from '@/stores';
import type { IGlobalStore } from '@/stores';
import {
  ACCESS_TOKEN_COOKIE_CONFIG,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_STORAGE_KEY,
} from '@/utils/constants';
import * as Sentry from '@sentry/nextjs';
import { useWallet } from '@solana/wallet-adapter-react';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { env } from 'env.mjs';
import jsonwebtoken from 'jsonwebtoken';
import { useStore, type StoreApi } from 'zustand';
import { EWalletName } from '@utils/enums/solana';

const GlobalStoreContext = createContext<StoreApi<IGlobalStore> | null>(null);

interface GlobalStoreProviderProps {
  children: ReactNode;
  revalidatePath: Function;
}

const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const pathName = usePathname();
  const storeRef = useRef<StoreApi<IGlobalStore>>();
  if (!storeRef.current) {
    storeRef.current = createGlobalStore;
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Sentry.init({
        dsn: env.NEXT_PUBLIC_SENTRY_DSN,

        // Adjust this value in production, or use tracesSampler for greater control
        tracesSampleRate: 1,

        // Setting this option to true will print useful information to the console while you're setting up Sentry.
        debug: false,

        replaysOnErrorSampleRate: 1.0,

        // This sets the sample rate to be 10%. You may want this to be 100% while
        // in development and sample at a lower rate in production
        replaysSessionSampleRate: 0.1,

        // You can remove this option if you're not planning to use the Sentry Session Replay feature:
        integrations: [
          Sentry.replayIntegration({
            // Additional Replay configuration goes in here, for example:
            maskAllText: true,
            blockAllMedia: true,
          }),
          Sentry.captureConsoleIntegration({
            levels: ['error', 'debug'],
          }),
        ],
      });
    }
  }, []);

  const { disconnect, connected, wallet, connecting, publicKey } = useWallet();

  useEffect(() => {
    storeRef.current?.setState((state) => ({
      ...state,
      is_solana_connected: connected && hasCookie(ACCESS_TOKEN_STORAGE_KEY),
    }));
  }, [connected]);

  const handleAccountChange = async () => {
    logoutProcess();
  };

  useEffect(() => {
    if (!publicKey || !wallet || connecting) return;
    const w = window as any;
    let walletName = '';

    switch (wallet.adapter.name) {
      case EWalletName.Backpack:
        walletName = EWalletName.Backpack;
        break;
      case EWalletName.Phantom:
        walletName = EWalletName.Phantom;
        break;
      default:
        break;
    }

    if (w?.xnft?.solana) {
      w?.xnft?.solana.on('disconnect', handleAccountChange);
    }

    if (w?.solana) {
      w?.solana.on('disconnect', handleAccountChange);
    }

    if (walletName === EWalletName.Phantom) {
      w?.phantom?.solana?.on('accountChanged', handleAccountChange);
    }

    if (walletName === EWalletName.Backpack) {
      w?.backpack?.on('accountChanged', handleAccountChange);
    }

    return () => {
      if (walletName === EWalletName.Phantom) {
        w?.phantom?.solana?.off('accountChanged', handleAccountChange);
      }

      if (walletName === EWalletName.Backpack) {
        w?.backpack?.off('accountChanged', handleAccountChange);
      }

      if (w?.xnft?.solana) {
        w?.xnft?.solana.off('disconnect', handleAccountChange);
      }

      if (w?.solana) {
        w?.solana.off('disconnect', handleAccountChange);
      }
    };
  }, [connecting, publicKey, wallet]);

  useEffect(() => {
    withStorageDOMEvents(createGlobalStore);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkTokenExpiration();
      }
    };

    const handleFocus = () => {
      checkTokenExpiration();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [publicKey]);

  useEffect(() => {
    if (pathName) {
      checkTokenExpiration();
    }
  }, [pathName, publicKey]);

  const logoutProcess = async () => {
    deleteCookie(ACCESS_TOKEN_STORAGE_KEY, ACCESS_TOKEN_COOKIE_CONFIG);
    deleteCookie(REFRESH_TOKEN_STORAGE_KEY, REFRESH_TOKEN_COOKIE_CONFIG);
    sessionStorage.clear();
    localStorage.clear();
    await disconnect();
    storeRef.current?.setState((state) => ({
      ...state,
      is_solana_connected: false,
    }));
    window.location.reload();
  };

  const checkTokenExpiration = async () => {
    const token = getCookie(ACCESS_TOKEN_STORAGE_KEY);
    const refreshToken = getCookie(REFRESH_TOKEN_STORAGE_KEY);

    if (token && publicKey) {
      const sub = token ? jsonwebtoken.decode(token)?.sub : '';

      if (sub !== publicKey.toBase58()) {
        await logoutProcess();
        return;
      }
    }

    if (!token && !refreshToken && connected) {
      await logoutProcess();
      return;
    }

    if (!token && refreshToken) {
      try {
        const data = await doRefreshToken({ refresh_token: refreshToken });

        if (data?.data?.access_token) {
          setCookie(
            ACCESS_TOKEN_STORAGE_KEY,
            data.data.access_token,
            ACCESS_TOKEN_COOKIE_CONFIG,
          );

          setCookie(
            REFRESH_TOKEN_STORAGE_KEY,
            data.data.refresh_token,
            REFRESH_TOKEN_COOKIE_CONFIG,
          );
        }

        storeRef.current?.setState((state) => ({
          ...state,
          is_solana_connected: true,
        }));
        return;
      } catch (e) {
        console.error(e);
        await logoutProcess();
      }
    }
  };

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

const useGlobalStore = <T,>(selector: (store: IGlobalStore) => T): T => {
  const globalStoreContext = useContext(GlobalStoreContext);

  if (!globalStoreContext) {
    throw new Error(`useGlobalStore must be use within GlobalStoreProvider`);
  }

  return useStore(globalStoreContext, selector);
};

export default GlobalStoreProvider;

export { useGlobalStore };
