import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface RouteProps {
  data: {
    id: number | undefined;
    name?: string;
    date?: string;
    totalDelivers?: number;
  };
};

export const RouteCard = ({ data }: RouteProps) => {
  return (
    <RectButton style={styles.cardContainer}>
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

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    maxWidth: '45%',
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  routeName: {
    color: '#6A097D',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 14,
  },
  label: {
    color: '#6C757D',
    fontSize: 12,
  },
});