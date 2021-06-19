import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

interface Props {
  openModal: () => void
};

export const NewRouteCard = ({ openModal }: Props) => {
  return (
    <RectButton style={styles.cardContainer} onPress={openModal}>
      <Feather name='plus-circle' size={48} color='#6A097D' />
      <Text style={styles.newRouteText}>Nova Rota</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '45%',
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingVertical: 45,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  newRouteText: {
    marginTop: 15,
    color: '#6C757D',
    fontSize: 16,
  },
});