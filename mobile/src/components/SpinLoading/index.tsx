import React from 'react';
import { ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles';

export function SpinLoading() {
  return (
    <ActivityIndicator
      style={styles.spin}
      color={theme.colors.secondary}
      size='large'
    />
  );
};