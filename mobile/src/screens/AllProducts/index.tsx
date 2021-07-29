import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { ListProducts } from '../../components/ListProducts';

import { ProductProps } from '../../utils/types';

import { styles } from './styles';

export default function AllProducts() {
  const navigation = useNavigation();

  function handleNewProduct() {
    navigation.navigate('ProductCreate', {
      product: {
        name: '',
        categoryId: 1,
        active: true,
      }
    });
  };

  function handleSelectProduct(product: ProductProps) {
    navigation.navigate('ProductCreate', { product });
  };

  return (
    <>
      <Header title='Produtos' showBackButton={false}>
        <TouchableOpacity
          style={styles.buttonIcon}
          onPress={handleNewProduct}
        >
          <Feather name='plus' size={24} color='#FFF' />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonIcon}
        >
          <Feather name='filter' size={24} color='#FFF' />
        </TouchableOpacity>
      </Header>

      <ListProducts
        onSelectProduct={handleSelectProduct}
        ListHeaderComponent={() => (
          <Text style={styles.headerTitle}>
            Produtos Ativos
          </Text>
        )}
      />
    </>
  );
};