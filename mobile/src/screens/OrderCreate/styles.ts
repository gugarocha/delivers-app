import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    marginVertical: 30,
    paddingHorizontal: 8,
  },
  label: {
    marginTop: 30,
    marginBottom: 5,
    fontSize: 12,
    color: theme.colors.gray,
  },
  clientNameInput: {
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
  },
  addProductsText: {
    marginTop: 5,
    color: theme.colors.secondary,
  },
  paymentSelectContainer: {
    flexDirection: 'row',
  },
  valueToReceiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
    marginLeft: 20,
  },
  currencyPrefix: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: theme.colors.gray,
  },
  valueToReceiveInput: {
    width: 65,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  button: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
});