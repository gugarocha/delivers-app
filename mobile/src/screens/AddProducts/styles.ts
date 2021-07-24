import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  selectedProductsContainer: {
    marginBottom: 30,
  },
  selectedProductsHeader: {
    marginBottom: 10,
    fontFamily: theme.fonts.bold,
    color: theme.colors.secondary,
  },
  listProductsHeader: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.secondary,
  },
});