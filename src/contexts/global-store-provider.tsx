'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { doRefreshToken } from '@/adapters/auth';
import { createGlobalStore, withStorageDOMEvents } from '@/stores';
import type { IGlobalStore } from '@/stores';
import {
  ACCESS_TOKEN_COOKIE_CONFIG,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_STORAGE_KEY,
} from '@/utils/constants';
import { useWallet } from '@solana/wallet-adapter-react';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { useStore, type StoreApi } from 'zustand';

const GlobalStoreContext = createContext<StoreApi<IGlobalStore> | null>(null);

interface GlobalStoreProviderProps {
  children: ReactNode;
}

const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const storeRef = useRef<StoreApi<IGlobalStore>>();
  if (!storeRef.current) {
    storeRef.current = createGlobalStore;
  }

  const { disconnect } = useWallet();

  useEffect(() => {
    withStorageDOMEvents(createGlobalStore);
    storeRef.current?.setState((state) => ({
      ...state,
      is_solana_connected:
        localStorage.getItem('walletName') &&
        hasCookie(ACCESS_TOKEN_STORAGE_KEY)
          ? true
          : false,
    }));
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
  }, []);

  const checkTokenExpiration = async () => {
    const logoutProcess = async () => {
      storeRef.current?.setState((state) => ({
        ...state,
        is_solana_connected: false,
      }));

      await disconnect();
      deleteCookie(ACCESS_TOKEN_STORAGE_KEY);
      deleteCookie(REFRESH_TOKEN_STORAGE_KEY);
      localStorage.removeItem('walletName');
    };

    const token = getCookie(ACCESS_TOKEN_STORAGE_KEY);

    if (!token) {
      const refreshToken = getCookie(REFRESH_TOKEN_STORAGE_KEY);

      if (!refreshToken) {
        await logoutProcess();
        return;
      }

      if (refreshToken) {
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
