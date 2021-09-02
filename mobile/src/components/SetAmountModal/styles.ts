import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  product: {
    textAlign: 'center',
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 15,
  },
  inputLabel: {
    marginRight: 10,
    fontSize: 16,
    color: theme.colors.gray,
    fontFamily: theme.fonts.light,
  },
  input: {
    width: 45,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
    fontSize: 24,
    textAlign: 'center',
  },
});