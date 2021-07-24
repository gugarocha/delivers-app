import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { ProductProps } from '../../utils/types';

import { styles } from './styles';

interface Props {
  product: ProductProps;
  onPress: () => void;
};

export function Product({ product, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.productName}>
        {product.name}
      </Text>
    </TouchableOpacity>
  );
};