'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { createSessionStore, withSessionStorageDOMEvents } from '@/stores';
import type { ISessionStore } from '@/stores';
import { useStore, type StoreApi } from 'zustand';

const SessionStoreContext = createContext<StoreApi<ISessionStore> | null>(null);

interface SessionStoreProviderProps {
  children: ReactNode;
}

const SessionStoreProvider = ({ children }: SessionStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ISessionStore>>();
  if (!storeRef.current) {
    storeRef.current = createSessionStore;
  }

  useEffect(() => {
    withSessionStorageDOMEvents(createSessionStore);
  }, []);

  return (
    <SessionStoreContext.Provider value={storeRef.current}>
      {children}
    </SessionStoreContext.Provider>
  );
};

const useSessionStore = <T,>(selector: (store: ISessionStore) => T): T => {
  const sessionStoreContext = useContext(SessionStoreContext);

  if (!sessionStoreContext) {
    throw new Error(`useSessionStore must be use within SessionStoreProvider`);
  }

  return useStore(sessionStoreContext, selector);
};

export default SessionStoreProvider;

export { useSessionStore };
