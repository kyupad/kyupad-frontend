import { persist, PersistStorage } from 'zustand/middleware';
import { createStore, Mutate, StoreApi } from 'zustand/vanilla';

interface IGlobalStore {
  is_agree_terms: boolean;
  is_solana_connected: boolean;
  agreeTerms: () => void;
  changeSolanaConnection: (value: boolean) => void;
}

type StoreWithPersist = Mutate<
  StoreApi<IGlobalStore>,
  [['zustand/persist', any]]
>;

const withStorageDOMEvents = (store: StoreWithPersist) => {
  const storageEventCallback = (e: StorageEvent) => {
    if (e.key === store.persist.getOptions().name && e.newValue) {
      store.persist.rehydrate();
    }
  };

  window.addEventListener('storage', storageEventCallback);

  return () => {
    window.removeEventListener('storage', storageEventCallback);
  };
};

const storage: PersistStorage<IGlobalStore> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

const initialState: IGlobalStore = {
  is_agree_terms: false,
  is_solana_connected: false,
  agreeTerms: () => {},
  changeSolanaConnection: () => {},
};

const createGlobalStore = createStore<IGlobalStore>()(
  persist(
    (set) => ({
      ...initialState,
      agreeTerms: () => set(() => ({ is_agree_terms: true })),
      changeSolanaConnection: (value: boolean) =>
        set({ is_solana_connected: value }),
    }),
    {
      name: 'global-storage',
      storage,
    },
  ),
);

export { createGlobalStore, withStorageDOMEvents };

export type { IGlobalStore };
