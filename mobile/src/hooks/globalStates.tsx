import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface ContextProps {
  isConnected: boolean | null;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

interface ProviderProps {
  children: React.ReactNode;
};

const GlobalStatesContext = createContext({} as ContextProps);

function GlobalStatesProvider({ children }: ProviderProps) {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  });

  return (
    <GlobalStatesContext.Provider value={{
      isConnected,
      loading,
      setLoading,
    }}>
      {children}
    </GlobalStatesContext.Provider>
  );
};

function useGlobalStates() {
  const context = useContext(GlobalStatesContext);

  return context;
};

export { GlobalStatesProvider, useGlobalStates };