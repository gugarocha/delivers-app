import React, { createContext, useContext, useState } from "react";

import { OrderProductsProps } from "../utils/types";

interface ContextProps {
  selectedProducts: OrderProductsProps[];
  setSelectedProducts: (products: OrderProductsProps[]) => void;
};

interface ProviderProps {
  children: React.ReactNode;
};

const SelectedProductsContext = createContext({} as ContextProps);

function SelectedProductsProvider({ children }: ProviderProps) {
  const [selectedProducts, setSelectedProducts] = useState(
    [] as OrderProductsProps[]
  );

  return (
    <SelectedProductsContext.Provider value={{
      selectedProducts,
      setSelectedProducts,
    }}>
      {children}
    </SelectedProductsContext.Provider>
  );
};

function useSelectedProducts() {
  const context = useContext(SelectedProductsContext);

  return context
};

export { SelectedProductsProvider, useSelectedProducts };