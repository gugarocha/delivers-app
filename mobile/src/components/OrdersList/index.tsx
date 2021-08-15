import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Text, View } from 'react-native';

import { SpinLoading } from '../SpinLoading';
import { OrderCard } from '../OrderCard';
import { OrdersStatusTitle } from '../OrdersStatusTitle';

import { useLoading } from '../../hooks/loading';
import { OrdersProps } from '../../utils/types';

import { styles } from './styles';

interface Props {
  data: OrdersProps[];
};

export function OrdersList({ data }: Props) {
  const { loading } = useLoading();
  const [notDeliveredOrders, setNotDeliveredOrders] = useState<OrdersProps[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<OrdersProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      setNotDeliveredOrders(data.filter(order => !order.delivered));
      setDeliveredOrders(data.filter(order => order.delivered));
    }, [data])
  );

  return (
    loading
      ? (
        <View style={styles.contentContainer}>
          <SpinLoading />
        </View>
      ) :
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