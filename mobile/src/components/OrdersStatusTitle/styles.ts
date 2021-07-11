import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  status: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: theme.fonts.regular,
    color: theme.colors.primary,
  },
});