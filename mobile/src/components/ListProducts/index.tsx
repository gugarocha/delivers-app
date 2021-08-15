import React from 'react';
import { SectionList, Text } from 'react-native';

import { SpinLoading } from '../SpinLoading';
import { Product } from '../Product';

import { ProductProps } from '../../utils/types';
import { useLoading } from '../../hooks/loading';
import { useProducts } from '../../hooks/useProducts';

import { styles } from './styles';

interface Props {
  onSelectProduct: (product: ProductProps) => void;
  ListHeaderComponent: React.ComponentType;
};

export function ListProducts({ onSelectProduct, ListHeaderComponent }: Props) {
  const { loading } = useLoading();
  const { products } = useProducts();

  return (
    loading
      ? <SpinLoading />
      : (
        <SectionList
          sections={products}
          keyExtractor={item => String(item.id)}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => (
            <Product
              product={item}
              onPress={() => onSelectProduct(item)}
            />
          )}
          renderSectionHeader={({ section: { category } }) => (
            <Text style={styles.sectionHeader}>
              {category}
            </Text>
          )}
          ListHeaderComponent={() => <ListHeaderComponent />}
          showsVerticalScrollIndicator={false}
        />
      )
  );
};