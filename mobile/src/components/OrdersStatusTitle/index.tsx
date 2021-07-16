import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles';

interface Props {
  delivered: boolean;
};

export function OrdersStatusTitle({ delivered }: Props) {
  return (
    <View style={styles.container}>
      <Feather
        name={delivered ? 'check-circle' : 'x-circle'}
        size={24}
        color={theme.colors.primary}
      />
      <Text style={styles.status}>
        {
          delivered
            ? 'Pedidos entregues'
            : 'Pedidos não entregues'
        }
      </Text>
    </View>
  );
};