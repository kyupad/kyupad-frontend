import { persist, PersistStorage } from 'zustand/middleware';
import { createStore, Mutate, StoreApi } from 'zustand/vanilla';

interface ISessionStore {
  poolsCounter: any;
  updatePoolCounter: (key: string, value: number) => void;
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
    const str = sessionStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => sessionStorage.removeItem(name),
};

const initialState: ISessionStore = {
  poolsCounter: {},
  updatePoolCounter: () => {},
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
    }),
    {
      name: 'session-storage',
      storage,
    },
  ),
);

export { createSessionStore, withSessionStorageDOMEvents };

export type { ISessionStore };
