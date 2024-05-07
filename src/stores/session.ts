import { persist, PersistStorage } from 'zustand/middleware';
import { createStore, Mutate, StoreApi } from 'zustand/vanilla';

interface ISessionStore {
  poolsCounter: any;
  updatePoolCounter: (key: string, value: number) => void;
  user_season_minted: number;
  updateUserSeasonMinted: (value: number) => void;
  seasonMinted: any;
  updateSeasonMinted: (key: string, value: number) => void;
}

type StoreWithPersist = Mutate<
  StoreApi<ISessionStore>,
  [['zustand/persist', any]]
>;

const withSessionStorageDOMEvents = (store: StoreWithPersist) => {
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

const storage: PersistStorage<ISessionStore> = {
  getItem: (name) => {
    if (typeof window === 'undefined') return null;
    const str = sessionStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  setItem: (name, value) => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(name);
  },
};

const initialState: ISessionStore = {
  poolsCounter: {},
  updatePoolCounter: () => {},
  user_season_minted: 0,
  updateUserSeasonMinted: () => {},
  seasonMinted: {},
  updateSeasonMinted: () => {},
};

const createSessionStore = createStore<ISessionStore>()(
  persist(
    (set) => ({
      ...initialState,
      updatePoolCounter: (key: string, value: number) =>
        set((state) => ({
          ...state,
          poolsCounter: {
            ...state.poolsCounter,
            [`${key}`]: value,
          },
        })),
      updateUserSeasonMinted: (value: number) =>
        set({ user_season_minted: value }),
      updateSeasonMinted: (key: string, value: number) =>
        set((state) => ({
          seasonMinted: {
            ...state.seasonMinted,
            [`${key}`]: value,
          },
        })),
    }),
    {
      name: 'session-storage',
      storage,
    },
  ),
);

export { createSessionStore, withSessionStorageDOMEvents };

export type { ISessionStore };
