import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  orderInfo: {
    paddingHorizontal: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 13,
  },
  value: {
    color: theme.colors.gray,
  },
  productsList: {
    flexDirection: 'row',
  },
  paymentValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    height: 0.5,
    marginTop: 10,
    backgroundColor: theme.colors.gray,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.colors.gray,
  },
});