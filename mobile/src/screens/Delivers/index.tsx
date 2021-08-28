import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { SpinLoading } from '../../components/SpinLoading';
import { OrdersList } from '../../components/OrdersList';

import { useSelectedProducts } from '../../hooks/selectedProducts';
import { useLoading } from '../../hooks/loading';
import { useDelivers } from '../../hooks/useDelivers';

import { OrderProductsProps, OrdersProps } from '../../utils/types';

import { styles } from './styles';

export default function Delivers() {
  const navigation = useNavigation();

  const { setSelectedProducts } = useSelectedProducts();
  const { loading } = useLoading();
  const { orders, fetchData } = useDelivers();

  function handleNavigateToOrderCreate() {
    setSelectedProducts([] as OrderProductsProps[]);

    navigation.navigate('OrderCreate', {
      selectedOrder: {
        routeId: null,
        client: '',
        payment: 'Pendente',
        delivered: false,
      } as OrdersProps
    });
  };

  return (
    <View style={styles.container}>
      <Header title='Entregas' showBackButton={false}>
        <TouchableOpacity
          style={styles.buttonIcon}
          onPress={handleNavigateToOrderCreate}
        >
          <Feather name='plus' size={24} color='#FFF' />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonIcon}
        >
          <Feather name='filter' size={24} color='#FFF' />
        </TouchableOpacity>
      </Header>

      {
        loading
          ? <SpinLoading />
          : <OrdersList
            data={orders}
            fetchData={fetchData}
          />
      }
    </View>
  );
};