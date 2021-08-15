import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles';

export function SpinLoading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={styles.spin}
        color={theme.colors.secondary}
        size='large'
      />
    </View>
  );
};