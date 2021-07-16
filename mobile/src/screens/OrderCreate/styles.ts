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
  input: {
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
  },
  addProductsText: {
    marginTop: 5,
    color: theme.colors.secondary,
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