import React from 'react';
import { View } from 'react-native';

import { SpinLoading } from '../SpinLoading';
import { OrdersList } from '../OrdersList'

import { useGlobalStates } from '../../hooks/globalStates';
import { useOrdersRoute } from '../../hooks/useOrdersRoute';

import { styles } from './styles';

interface Props {
  routeId: number;
};

export function RouteOrdersList({ routeId }: Props) {
  const { loading } = useGlobalStates();
  const {
    notDeliveredOrders,
    deliveredOrders,
    fetchData
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
        fetchData={fetchData}
        ListFooterComponent={
          <OrdersList
            data={deliveredOrders}
            fetchData={fetchData}
            isDeliveredOrders
          />
        }
      />
  );
};