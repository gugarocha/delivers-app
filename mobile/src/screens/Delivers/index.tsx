import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { OrdersList } from '../../components/OrdersList';
import { OrdersStatusTitle } from '../../components/OrdersStatusTitle';

import { useSelectedProducts } from '../../hooks/selectedProducts';
import { OrderProductsProps, OrdersProps } from '../../utils/types';

import { styles } from './styles';

export default function Delivers() {
  const data: OrdersProps[] = [
    {
      id: 3,
      client: "Sicrano",
      payment: 'Receber',
      valueToReceive: "350,00",
      delivered: false,
      products: [
        {
          id: 1,
          product: "Milho Saco",
          categoryId: 1,
          productAmount: 1
        },
        {
          id: 2,
          product: "Poim Saco",
          categoryId: 1,
          productAmount: 2
        },
        {
          id: 4,
          product: "Rezido",
          categoryId: 1,
          productAmount: 1
        },
        {
          id: 3,
          product: "Água Norte",
          categoryId: 2,
          productAmount: 3
        }
      ]
    },
    {
      id: 4,
      client: "Sicrano",
      payment: 'Ok',
      delivered: true,
      products: [
        {
          id: 1,
          product: "Milho Saco",
          categoryId: 1,
          productAmount: 1
        },
        {
          id: 4,
          product: "Rezido",
          categoryId: 1,
          productAmount: 2
        },
      ]
    },
    {
      id: 5,
      client: "Sicrano",
      payment: 'Ok',
      delivered: true,
      products: [
        {
          id: 1,
          product: "Milho Saco",
          categoryId: 1,
          productAmount: 1
        },
        {
          id: 3,
          product: "Água Norte",
          categoryId: 2,
          productAmount: 3
        },
      ]
    }
  ];

  const navigation = useNavigation();

  const { setSelectedProducts } = useSelectedProducts();

  function handleNavigateToOrderCreate() {
    setSelectedProducts([] as OrderProductsProps[]);

    navigation.navigate('OrderCreate', {
      selectedOrder: {
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

      <OrdersList
        data={data}
        ListHeaderComponent={() => <OrdersStatusTitle delivered={false} />}
      />
    </View>
  );
};