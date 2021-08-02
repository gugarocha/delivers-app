import React from 'react';
import { SectionList, Text } from 'react-native';

import { Product } from '../Product';

import { ProductProps } from '../../utils/types';

import { styles } from './styles';

interface Props {
  onSelectProduct: (product: ProductProps) => void;
  ListHeaderComponent: React.ComponentType;
};

export function ListProducts({ onSelectProduct, ListHeaderComponent }: Props) {
  const allProducts = [
    {
      category: 'Sacarias',
      data: [
        {
          id: 10,
          categoryId: 1,
          name: "Babaçu",
          active: true
        },
        {
          id: 5,
          categoryId: 1,
          name: "Cimento",
          active: true
        },
        {
          id: 8,
          categoryId: 1,
          name: "Massa de milho",
          active: true
        },
        {
          id: 1,
          categoryId: 1,
          name: "Milho saco",
          active: true
        },
        {
          id: 9,
          categoryId: 1,
          name: "Milho meio saco",
          active: true
        },
        {
          id: 2,
          categoryId: 1,
          name: "Poim saco",
          active: true
        },
        {
          id: 4,
          categoryId: 1,
          name: "Rezido",
          active: true
        },
      ]
    },
    {
      category: 'Águas',
      data: [
        {
          id: 3,
          categoryId: 2,
          name: "Água Norte",
          active: true
        }
      ]
    },
    {
      category: 'Mercadorias',
      data: [
        {
          id: 7,
          categoryId: 3,
          name: "Sacola",
          active: true
        },
        {
          id: 6,
          categoryId: 3,
          name: "Volume",
          active: true
        },
      ]
    }
  ];

  return (
    <SectionList
      sections={allProducts}
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
  );
};