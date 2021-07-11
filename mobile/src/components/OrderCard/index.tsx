import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { OrdersProps } from '../../utils/types';

import { styles } from './styles';
import { theme } from '../../global/styles';

type Props = {
  data: OrdersProps;
};

export function OrderCard({ data }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.orderInfo}>
        <Text style={styles.label}>
          Cliente
        </Text>
        <Text style={styles.value}>
          {data.client}
        </Text>

        <Text style={styles.label}>
          Pedido
        </Text>

        {data.products.map(product => (
          <View style={styles.productsList} key={product.id}>
            <Text style={styles.value}>
              {`${product.productAmount} x `}
            </Text>
            <Text style={styles.value}>
              {product.product}
            </Text>
          </View>
        ))}

        <Text style={styles.label}>
          Pagamento
        </Text>
        <Text style={styles.value}>
          {data.payment}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Feather name='edit' size={25} color={theme.colors.gray} />
          <Text style={styles.buttonText}>
            Editar{'\n'}Pedido
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Feather name='truck' size={25} color={theme.colors.gray} />
          <Text style={styles.buttonText}>
            Entregar{'\n'}Pedido
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Feather name='trash-2' size={25} color={theme.colors.gray} />
          <Text style={styles.buttonText}>
            Excluir{'\n'}Pedido
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};