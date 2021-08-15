import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { RouteDataModal } from '../../components/RouteDataModal';
import { OrdersList } from '../../components/OrdersList';
import { RouteSummary } from '../../components/RouteSummary';

import { useSelectedProducts } from '../../hooks/selectedProducts';
import { useOrdersRoute } from '../../hooks/useOrdersRoute';

import { OrderProductsProps, OrdersProps, RouteProps } from '../../utils/types';
import { formatDate } from '../../utils/formatDate';

import { styles } from './styles';

interface Params {
  selectedRoute: RouteProps;
};

export default function OrdersRoute() {
  const { setSelectedProducts } = useSelectedProducts();

  const navigation = useNavigation();
  const route = useRoute();
  const { selectedRoute } = route.params as Params;

  const [showModal, setShowModal] = useState(false);
  const [routeInfo, setRouteInfo] = useState({
    routeId: selectedRoute.id,
    date: new Date(selectedRoute.date),
    name: selectedRoute.name
  });

  const { orders, summary } = useOrdersRoute(routeInfo.routeId);

  function closeModal() {
    setShowModal(false);
  };

  function handleNavigateToOrderCreate() {
    setSelectedProducts([] as OrderProductsProps[]);

    navigation.navigate('OrderCreate', {
      selectedOrder: {
        routeId: routeInfo.routeId,
        client: '',
        payment: 'Pendente',
        delivered: false,
      } as OrdersProps
    });
  };

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

      <RouteDataModal
        modalVisible={showModal}
        closeModal={closeModal}
        selectedRoute={routeInfo}
        setRouteInfo={setRouteInfo}
      />

      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <View style={styles.infoRouteContainer}>
          <View style={styles.infoRouteBlock}>
            <Text style={styles.infoRouteLabel}>
              Rota
            </Text>
            <Text style={styles.infoRouteValue}>
              {routeInfo.name}
            </Text>
          </View>

          <View style={styles.infoRouteDivider} />

          <View style={styles.infoRouteBlock}>
            <Text style={styles.infoRouteLabel}>
              Data
            </Text>
            <Text style={styles.infoRouteValue}>
              {formatDate(routeInfo.date)}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <OrdersList data={orders} />
        <RouteSummary data={summary} />
      </ScrollView>
    </View>
  );
};