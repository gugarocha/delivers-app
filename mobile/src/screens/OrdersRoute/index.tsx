import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
  Alert,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { ActionModal } from '../../components/ActionModal';
import { Header } from '../../components/Header';
import { RouteDataModal } from '../../components/RouteDataModal';
import { RouteOrdersList } from '../../components/RouteOrdersList';
import { RouteSummary } from '../../components/RouteSummary';

import { useSelectedProducts } from '../../hooks/selectedProducts';
import { useRoutes } from '../../hooks/useRoutes';

import { OrderProductsProps, OrdersProps, RouteProps } from '../../utils/types';
import { formatDate } from '../../utils/formatDate';

import { styles } from './styles';

interface Params {
  selectedRoute: RouteProps;
};

export default function OrdersRoute() {
  const { setSelectedProducts } = useSelectedProducts();
  const { setFinished } = useRoutes();

  const navigation = useNavigation();
  const route = useRoute();
  const { selectedRoute } = route.params as Params;

  const [showSetFinishedModal, setShowSetFinishedModal] = useState(false);
  const [showRouteDataModal, setShowRouteDataModal] = useState(false);
  const [routeInfo, setRouteInfo] = useState({
    routeId: selectedRoute.id,
    date: new Date(selectedRoute.date),
    name: selectedRoute.name
  });

  function closeRouteDataModal() {
    setShowRouteDataModal(false);
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

  function closeSetFinishedModal() {
    setShowSetFinishedModal(false);
  };

  async function handleSetRouteFinished() {
    try {
      await setFinished(routeInfo.routeId);

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao finalizar rota');
    };
  };

  return (
    <>
      <ActionModal
        isVisible={showSetFinishedModal}
        title='Finalizar Rota'
        cancelButtonAction={closeSetFinishedModal}
        confirmButtonAction={handleSetRouteFinished}
      >
        <Text style={styles.setFinishedModalText}>
          Deseja finalizar essa rota?
        </Text>
      </ActionModal>

      <RouteDataModal
        modalVisible={showRouteDataModal}
        closeModal={closeRouteDataModal}
        selectedRoute={routeInfo}
        setRouteInfo={setRouteInfo}
      />

      <View style={styles.container}>
        <Header title='Pedidos'>
          <TouchableOpacity
            style={styles.buttonIcon}
            onPress={handleNavigateToOrderCreate}
          >
            <Feather name='plus' size={24} color='#FFF' />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonIcon}
            onPress={() => setShowSetFinishedModal(true)}
          >
            <Feather name='check' size={24} color='#FFF' />
          </TouchableOpacity>
        </Header>

        <TouchableWithoutFeedback onPress={() => setShowRouteDataModal(true)}>
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
          <RouteOrdersList routeId={routeInfo.routeId} />
          <RouteSummary routeId={routeInfo.routeId} />
        </ScrollView>
      </View>
    </>
  );
};