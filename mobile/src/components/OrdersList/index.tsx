import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { SpinLoading } from '../SpinLoading';
import { OrderCard } from '../OrderCard';
import { OrdersStatusTitle } from '../OrdersStatusTitle';

import { useLoading } from '../../hooks/loading';
import { useOrdersRoute } from '../../hooks/useOrdersRoute';

import { styles } from './styles';

interface Props {
  routeId: number;
};

export function OrdersList({ routeId }: Props) {
  const { loading } = useLoading();
  const {
    notDeliveredOrders,
    deliveredOrders,
    handleChangeDeliverStatus
  } = useOrdersRoute(routeId);

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
        renderItem={({ item }) =>
          <OrderCard
            data={item}
            changeDeliverStatus={() => handleChangeDeliverStatus({
              orderId: item.id,
              deliverStatus: !item.delivered
            })}
          />
        }
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
            renderItem={({ item }) =>
              <OrderCard
                data={item}
                changeDeliverStatus={() => handleChangeDeliverStatus({
                  orderId: item.id,
                  deliverStatus: !item.delivered
                })}
              />
            }
            ListHeaderComponent={<OrdersStatusTitle delivered />}
          />
        )}
      />
  );
};