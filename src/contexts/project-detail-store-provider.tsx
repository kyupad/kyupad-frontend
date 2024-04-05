'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import {
  createProjectDetailStore,
  IProjectDetailStore,
} from '@/stores/project-detail';
import { useStore, type StoreApi } from 'zustand';

const ProjectDetailStoreContext =
  createContext<StoreApi<IProjectDetailStore> | null>(null);

interface ProjectDetailProviderProps {
  children: ReactNode;
}

const ProjectDetailStoreProvider = ({
  children,
}: ProjectDetailProviderProps) => {
  const storeRef = useRef<StoreApi<IProjectDetailStore>>();
  if (!storeRef.current) {
    storeRef.current = createProjectDetailStore;
  }

  useEffect(() => {
    storeRef.current && storeRef.current.setState({ viewMode: null });
  }, []);

  return (
    <ProjectDetailStoreContext.Provider value={storeRef.current}>
      {children}
    </ProjectDetailStoreContext.Provider>
  );
};

const useProjectDetailStore = <T,>(
  selector: (store: IProjectDetailStore) => T,
): T => {
  const projectDetailStoreContext = useContext(ProjectDetailStoreContext);

  if (!projectDetailStoreContext) {
    throw new Error(
      `useProjectDetailStore must be use within ProjectDetailStoreProvider`,
    );
  }

  return useStore(projectDetailStoreContext, selector);
};

export default ProjectDetailStoreProvider;

export { useProjectDetailStore };
