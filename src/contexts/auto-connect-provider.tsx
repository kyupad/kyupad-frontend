import type { FC, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '@solana/wallet-adapter-react';

interface AutoConnectContextState {
  autoConnect: boolean;
  setAutoConnect(autoConnect: boolean): void;
}

const AutoConnectContext = createContext<AutoConnectContextState>(
  {} as AutoConnectContextState,
);

function useAutoConnect(): AutoConnectContextState {
  return useContext(AutoConnectContext);
}

const AutoConnectProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', true);

  return (
    <AutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
      {children}
    </AutoConnectContext.Provider>
  );
};

export default AutoConnectProvider;

export { useAutoConnect };
