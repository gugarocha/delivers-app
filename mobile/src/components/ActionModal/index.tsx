import React from 'react';
import Modal from 'react-native-modal';
import { View, Text } from 'react-native';

import { ActionButton } from '../ActionButton';

import { styles } from './styles';

interface Props {
  isVisible: boolean;
  title: string;
  children: React.ReactNode;
  cancelButtonAction: () => void;
  confirmButtonAction: () => void;
};

export function ActionModal({
  isVisible,
  title,
  children,
  cancelButtonAction,
  confirmButtonAction,
}: Props) {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.2}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackButtonPress={cancelButtonAction}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        {children}

        <View style={styles.buttonsContainer}>
          <ActionButton
            type='Cancelar'
            onPress={cancelButtonAction}
          />

          <ActionButton
            type='Confirmar'
            onPress={confirmButtonAction}
          />
        </View>
      </View>
    </Modal>
  );
};