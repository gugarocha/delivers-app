import React from 'react';
import { View, SectionList, Text } from 'react-native';

import { SpinLoading } from '../SpinLoading';
import { Product } from '../Product';

import { useLoading } from '../../hooks/useLoading';
import { ProductProps, ProductsCategoryProps } from '../../utils/types';

import { styles } from './styles';

interface Props {
  data: ProductsCategoryProps[];
  onSelectProduct: (product: ProductProps) => void;
  ListHeaderComponent: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
};

export function ListProducts({
  data,
  onSelectProduct,
  ListHeaderComponent,
  ListFooterComponent
}: Props) {
  const { isLoading } = useLoading();

  return (
    isLoading
      ? <SpinLoading />
      : (
        <View style={styles.container}>
          <SectionList
            sections={data}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={styles.contentContainer}
            renderItem={({ item }) => (
              <Product
                product={item}
                onPress={() => onSelectProduct(item)}
              />
            )}
            renderSectionHeader={({ section }) =>
              section.data.length > 0 ? (
                <Text style={styles.sectionHeader}>
                  {section.category}
                </Text>
              ) : <View />
            }
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )
  );
};