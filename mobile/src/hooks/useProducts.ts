import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import { Alert } from "react-native";

import { useLoading } from "./loading";
import { ProductProps, ProductsCategoryProps } from "../utils/types";
import { getProducts, addProduct } from "../services/Products";

export function useProducts() {
  const { setLoading } = useLoading();
  const [products, setProducts] = useState<ProductsCategoryProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchProducts() {
        setLoading(true);

        const data = await getProducts();
        setProducts(data);

        setLoading(false);
      };

      fetchProducts();
    }, [])
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

  return {
    products,
    createProduct
  };
};