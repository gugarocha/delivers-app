import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  input: {
    width: 45,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
    fontSize: 24,
    textAlign: 'center',
  },
  product: {
    fontSize: 24,
  },
});