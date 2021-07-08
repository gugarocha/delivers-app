import React from 'react';
import { TouchableOpacityProps, TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles';

interface Props extends TouchableOpacityProps {
  type: 'Cancelar' | 'Confirmar';
};

export function ActionButton({ type, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === 'Confirmar' && styles.confirm
      ]}
      {...rest}
    >
      <Text
        style={{ color: type === 'Cancelar' ? theme.colors.secondary : '#FFF' }}
      >
        {type}
      </Text>
    </TouchableOpacity>
  );
};