import React from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { OrdersList } from '../../components/OrdersList';
import { OrdersStatusTitle } from '../../components/OrdersStatusTitle';

import { OrdersProps } from '../../utils/types';

import { styles } from './styles';

export default function OrdersRoute() {
  const navigation = useNavigation();

  function handleNavigateToOrderCreate() {
    navigation.navigate('OrderCreate');
  };

  const data: OrdersProps[] = [
    {
      id: 3,
      client: "Sicrano",
      payment: 'Receber',
      valueToReceive: "350.00",
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
      payment: 'Receber',
      valueToReceive: "350.00",
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
    }
  ];

  return (
    <View style={styles.container}>
      <Header title='Pedidos'>
        <TouchableOpacity
          style={styles.buttonIcon}
          onPress={handleNavigateToOrderCreate}
        >
          <Feather name='plus' size={24} color='#FFF' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonIcon}>
          <Feather name='check' size={24} color='#FFF' />
        </TouchableOpacity>
      </Header>

      <TouchableWithoutFeedback>
        <View style={styles.infoRouteContainer}>
          <View style={styles.infoRouteBlock}>
            <Text style={styles.infoRouteLabel}>
              Rota
            </Text>
            <Text style={styles.infoRouteValue}>
              Sexta-feira
            </Text>
          </View>

          <View style={styles.infoRouteDivider} />

          <View style={styles.infoRouteBlock}>
            <Text style={styles.infoRouteLabel}>
              Data
            </Text>
            <Text style={styles.infoRouteValue}>
              09/07/2021
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.contentContainer}>
        <OrdersList
          data={data}
          ListHeaderComponent={() => <OrdersStatusTitle delivered={false} />}
          ListFooterComponent={() =>
            <OrdersList
              data={data}
              ListHeaderComponent={() => <OrdersStatusTitle delivered={true} />}
            />
          }
        />
      </View>
    </View>
  );
};