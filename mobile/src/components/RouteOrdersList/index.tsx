import React from 'react';
import { View } from 'react-native';

import { SpinLoading } from '../SpinLoading';
import { OrdersList } from '../OrdersList'

import { useLoading } from '../../hooks/loading';
import { useOrdersRoute } from '../../hooks/useOrdersRoute';

import { styles } from './styles';

interface Props {
  routeId: number;
};

export function RouteOrdersList({ routeId }: Props) {
  const { loading } = useLoading();
  const {
    notDeliveredOrders,
    deliveredOrders,
  } = useOrdersRoute(routeId);

  return (
    loading
      ? (
        <View style={styles.contentContainer}>
          <SpinLoading />
        </View>
      ) :
      <OrdersList
        data={notDeliveredOrders}
        ListFooterComponent={
          <OrdersList
            data={deliveredOrders}
            isDeliveredOrders
          />
        }
      />
  );
};