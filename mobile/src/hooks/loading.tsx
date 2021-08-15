import React, { createContext, useContext, useState } from 'react';

interface ContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

interface ProviderProps {
  children: React.ReactNode;
};

const LoadingContext = createContext({} as ContextProps);

function LoadingProvider({ children }: ProviderProps) {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{
      loading,
      setLoading
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

function useLoading() {
  const context = useContext(LoadingContext);

  return context;
};

export { LoadingProvider, useLoading };