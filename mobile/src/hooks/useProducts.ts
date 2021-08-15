import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";

import { ProductsCategoryProps } from "../utils/types";
import { useLoading } from "./loading";
import { getProducts } from "../services/Products";

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

  return {
    products
  };
};