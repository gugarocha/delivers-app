import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity } from 'react-native';

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
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        {children}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={cancelButtonAction}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirmButtonAction}
          >
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};