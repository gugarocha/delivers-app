import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { ListProducts } from '../../components/ListProducts';

import { useProducts } from '../../hooks/useProducts';

import { ProductProps } from '../../utils/types';

import { styles } from './styles';

interface ListHeaderProps {
  isActiveProducts: boolean;
};
function IsActiveProductsHeader({ isActiveProducts }: ListHeaderProps) {
  return (
    <Text style={styles.headerTitle}>
      {
        isActiveProducts
          ? 'Produtos Ativos'
          : 'Produtos Inativos'
      }
    </Text>
  );
};

export default function AllProducts() {
  const navigation = useNavigation();

  const { activeProducts, inactiveProducts } = useProducts();

  function hasInactiveProducts() {
    return inactiveProducts.some(item => item.data.length > 0);
  };

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
        data={activeProducts}
        onSelectProduct={handleSelectProduct}
        ListHeaderComponent={<IsActiveProductsHeader isActiveProducts />}
        ListFooterComponent={hasInactiveProducts() ?
          <ListProducts
            data={inactiveProducts}
            onSelectProduct={handleSelectProduct}
            ListHeaderComponent={<IsActiveProductsHeader isActiveProducts={false} />}
          /> : <View />
        }
      />
    </>
  );
};