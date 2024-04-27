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
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { useStore, type StoreApi } from 'zustand';
import { EWalletName } from '@utils/enums/solana';

const GlobalStoreContext = createContext<StoreApi<IGlobalStore> | null>(null);

interface GlobalStoreProviderProps {
  children: ReactNode;
  revalidatePath: Function;
}

const GlobalStoreProvider = ({
  children,
  revalidatePath,
}: GlobalStoreProviderProps) => {
  const pathName = usePathname();
  const storeRef = useRef<StoreApi<IGlobalStore>>();
  if (!storeRef.current) {
    storeRef.current = createGlobalStore;
  }

  const previousWallet = useRef<PublicKey>(null);

  const { disconnect, connected } = useWallet();

  useEffect(() => {
    storeRef.current?.setState((state) => ({
      ...state,
      is_solana_connected: connected && hasCookie(ACCESS_TOKEN_STORAGE_KEY),
    }));
  }, [connected]);

  useEffect(() => {
    let valildateLoginPolling: any;
    const startValidateLogin = setTimeout(() => {
      valildateLoginPolling = setInterval(async () => {
        const walletName = localStorage.getItem('walletName');
        let isConnected = true;
        let incomingWallet;
        switch (walletName) {
          case EWalletName.Backpack:
            incomingWallet = (window as any)?.backpack?.publicKey?.toBase58();
            isConnected = (window as any)?.backpack?.isConnected;
            break;
          case EWalletName.Phantom:
            incomingWallet = window?.solana?.publicKey?.toBase58();
            isConnected = window?.solana?.isConnected;
            break;
          default:
            break;
        }
        if (incomingWallet) {
          if (
            previousWallet.current?.toBase58() !== incomingWallet &&
            previousWallet.current?.toBase58()
          ) {
            await logoutProcess();
          }

          (previousWallet as any).current = new PublicKey(incomingWallet);

          return;
        }

        if (!isConnected && hasCookie(REFRESH_TOKEN_STORAGE_KEY)) {
          await logoutProcess();
        }
      }, 1000);
    }, 3000);

    return () => {
      clearInterval(valildateLoginPolling);
      clearTimeout(startValidateLogin);
    };
  }, []);

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
  }, []);

  useEffect(() => {
    if (pathName) {
      checkTokenExpiration();
    }
  }, [pathName]);

  const logoutProcess = async () => {
    storeRef.current?.setState((state) => ({
      ...state,
      is_solana_connected: false,
    }));

    await disconnect();
    deleteCookie(ACCESS_TOKEN_STORAGE_KEY, ACCESS_TOKEN_COOKIE_CONFIG);
    deleteCookie(REFRESH_TOKEN_STORAGE_KEY, REFRESH_TOKEN_COOKIE_CONFIG);
    sessionStorage.clear();
    revalidatePath(pathName);
  };

  const checkTokenExpiration = async () => {
    const token = getCookie(ACCESS_TOKEN_STORAGE_KEY);
    const refreshToken = getCookie(REFRESH_TOKEN_STORAGE_KEY);

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
