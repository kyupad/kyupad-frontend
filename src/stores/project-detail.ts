import { createStore } from 'zustand/vanilla';

interface IProjectDetailStore {
  viewMode: 'registration' | 'snapshot' | 'investment' | 'claim' | null;
  changeViewMode: (
    mode: 'registration' | 'snapshot' | 'investment' | 'claim' | null,
  ) => void;
}

const initialState: IProjectDetailStore = {
  viewMode: null,
  changeViewMode: () => {},
};

const createProjectDetailStore = createStore<IProjectDetailStore>()((set) => ({
  ...initialState,
  changeViewMode: (mode) => set((state) => ({ ...state, viewMode: mode })),
}));

export { createProjectDetailStore };

export type { IProjectDetailStore };
