import React, { useState } from 'react';
import { FlatList, Text } from 'react-native';

import { OrderCard } from '../OrderCard';
import { OrdersStatusTitle } from '../OrdersStatusTitle';

import { OrdersProps } from '../../utils/types';

import { styles } from './styles';

interface Props {
  data: OrdersProps[];
};

export function OrdersList({ data }: Props) {
  const [notDeliveredOrders, setNotDeliveredOrders] = useState(
    data.filter(order => !order.delivered)
  );
  const [deliveredOrders, setDeliveredOrders] = useState(
    data.filter(order => order.delivered)
  );

  return (
    <FlatList
      data={notDeliveredOrders}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.emptyListText}>
          Nenhum pedido para ser entregue
        </Text>
      }
      renderItem={({ item }) => <OrderCard data={item} />}
      ListHeaderComponent={<OrdersStatusTitle delivered={false} />}
      ListFooterComponent={() => (
        <FlatList
          data={deliveredOrders}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Nenhum pedido entregue
            </Text>
          }
          renderItem={({ item }) => <OrderCard data={item} />}
          ListHeaderComponent={<OrdersStatusTitle delivered />}
        />
      )}
    />
  );
};