import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { RouteProps } from '../../utils/types';
import { formatDate } from '../../utils/formatDate';

import { styles } from './styles';

interface Props {
  data: RouteProps;
};

export const RouteCard = ({ data }: Props) => {
  const navigation = useNavigation();

  function handleOpenOrders() {
    navigation.navigate('OrdersRoute', {
      selectedRoute: data
    });
  };

  return (
    <RectButton
      style={styles.cardContainer}
      onPress={handleOpenOrders}
    >
      <Text style={styles.routeName}>{data.name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Data da rota</Text>
        <Text>{formatDate(data.date)}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Total de entregas</Text>
        <Text>{data.totalDelivers}</Text>
      </View>
    </RectButton>
  );
};