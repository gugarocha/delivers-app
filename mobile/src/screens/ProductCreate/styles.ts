import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    marginTop: 30,
    marginBottom: 5,
    fontSize: 12,
    color: theme.colors.gray,
  },
  productNameInput: {
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: '#FFF',
  },
  button: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
});