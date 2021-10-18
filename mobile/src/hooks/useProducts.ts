import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { Alert } from 'react-native';

import { useLoading } from './useLoading';
import { useConnection } from './useConnection';

import {
  getActiveProducts,
  getInactiveProducts,
  addProduct,
  editProduct
} from '../services/Products';

import { ProductProps, ProductsCategoryProps } from '../utils/types';

export function useProducts() {
  const { enableLoading, disableLoading } = useLoading();
  const { isConnected } = useConnection();

  const [activeProducts, setActiveProducts] = useState<ProductsCategoryProps[]>([]);
  const [inactiveProducts, setInactiveProducts] = useState<ProductsCategoryProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchProducts() {
        enableLoading();

        if (isConnected) {
          const active = await getActiveProducts();
          setActiveProducts(active);

          const inactive = await getInactiveProducts();
          setInactiveProducts(inactive);

        } else {
          return Alert.alert('Erro', 'Verifique a conexão e tente novamente');
        };

        disableLoading();
      };

      fetchProducts();
    }, [isConnected])
  );

  async function createProduct({ name, categoryId }: ProductProps) {
    try {
      enableLoading();

      await addProduct({ name, categoryId });

      disableLoading();
    } catch {
      Alert.alert('Erro ao criar produto');
    };
  };

  async function updateProduct(data: ProductProps) {
    try {
      enableLoading();

      await editProduct(data);

      disableLoading();
    } catch {
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