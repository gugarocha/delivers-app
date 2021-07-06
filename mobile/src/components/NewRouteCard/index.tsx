import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../global/styles';

interface Props {
  openModal: () => void
};

export const NewRouteCard = ({ openModal }: Props) => {
  return (
    <RectButton style={styles.cardContainer} onPress={openModal}>
      <Feather name='plus-circle' size={48} color={theme.colors.secondary} />
      <Text style={styles.newRouteText}>Nova Rota</Text>
    </RectButton>
  );
};