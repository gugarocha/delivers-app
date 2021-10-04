import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import { Alert } from "react-native";

import { useGlobalStates } from "./globalStates";
import { ProductProps, ProductsCategoryProps } from "../utils/types";
import {
  getActiveProducts,
  getInactiveProducts,
  addProduct,
  editProduct
} from "../services/Products";

export function useProducts() {
  const { isConnected, setLoading } = useGlobalStates();
  const [activeProducts, setActiveProducts] = useState<ProductsCategoryProps[]>([]);
  const [inactiveProducts, setInactiveProducts] = useState<ProductsCategoryProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchProducts() {
        setLoading(true);

        if (isConnected) {
          const active = await getActiveProducts();
          setActiveProducts(active);

          const inactive = await getInactiveProducts();
          setInactiveProducts(inactive);

        } else {
          return Alert.alert('Erro', 'Verifique a conexão e tente novamente');
        };

        setLoading(false);
      };

      fetchProducts();
    }, [isConnected])
  );

  async function createProduct({ name, categoryId }: ProductProps) {
    try {
      setLoading(true);

      await addProduct({ name, categoryId });

      setLoading(false);
    } catch (error) {
      Alert.alert('Erro ao criar produto');
    };
  };

  async function updateProduct(data: ProductProps) {
    try {
      setLoading(true);

      await editProduct(data);

      setLoading(false);
    } catch (error) {
      Alert.alert('Erro ao atualizar produto');
    };
  };

  return {
    activeProducts,
    inactiveProducts,
    createProduct,
    updateProduct
  };
};