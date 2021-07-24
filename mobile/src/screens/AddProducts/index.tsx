import React from 'react';
import { View, Text } from 'react-native';

import { Header } from '../../components/Header';
import { ListProducts } from '../../components/ListProducts';
import { SelectedProductsList } from '../../components/SelectedProductsList';

import { styles } from './styles';

export default function AddProducts() {
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
              <SelectedProductsList />
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