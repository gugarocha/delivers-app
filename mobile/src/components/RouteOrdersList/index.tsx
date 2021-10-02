import React from 'react';
import { View } from 'react-native';

import { SpinLoading } from '../SpinLoading';
import { OrdersList } from '../OrdersList'

import { useGlobalStates } from '../../hooks/globalStates';

import { OrdersProps } from '../../utils/types';

import { styles } from './styles';

interface Props {
  notDeliveredOrders: OrdersProps[];
  deliveredOrders: OrdersProps[];
  fetchData: () => Promise<void>;
};

export function RouteOrdersList({ notDeliveredOrders, deliveredOrders, fetchData }: Props) {
  const { loading } = useGlobalStates();

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