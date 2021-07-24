import React, { useState } from 'react';
import { useRoute } from '@react-navigation/core';
import { View, Text } from 'react-native';

import { Header } from '../../components/Header';
import { ListProducts } from '../../components/ListProducts';
import { SelectedProductsList } from '../../components/SelectedProductsList';

import { OrderProductsProps } from '../../utils/types';

import { styles } from './styles';

interface Params {
  products: OrderProductsProps[];
};

export default function AddProducts() {
  const route = useRoute();
  const { products } = route.params as Params;

  const [selectedProducts, setSelectedProducts] = useState(products);

  return (
    <>
      <Header title='Adicionar Produto' />

      <ListProducts
        ListHeaderComponent={() => (
          <>
            <View style={styles.selectedProductsContainer}>
              <Text style={styles.selectedProductsHeader}>
                Produtos Selecionados
              </Text>
              <SelectedProductsList
                products={selectedProducts}
                setProducts={setSelectedProducts}
              />
            </View>

            <Text style={styles.listProductsHeader}>
              Selecione os Produtos
            </Text>
          </>
        )}
      />
    </>
  );
};