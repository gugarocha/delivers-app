import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { styles } from './styles';

interface RouteProps {
  data: {
    id: number | undefined;
    name?: string;
    date?: string;
    totalDelivers?: number;
  };
};

export const RouteCard = ({ data }: RouteProps) => {
  const navigation = useNavigation();

  function handleOpenOrders() {
    navigation.navigate('OrdersRoute');
  };

  return (
    <RectButton
      style={styles.cardContainer}
      onPress={handleOpenOrders}
    >
      <Text style={styles.routeName}>{data.name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Data da rota</Text>
        <Text>{data.date}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Total de entregas</Text>
        <Text>{data.totalDelivers}</Text>
      </View>
    </RectButton>
  );
};