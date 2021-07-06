import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

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