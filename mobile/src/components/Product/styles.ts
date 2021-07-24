import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: theme.colors.gray,
  },
  productName: {
    textAlign: 'center',
    fontSize: 18,
    color: theme.colors.gray,
  },
});