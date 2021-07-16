import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyListText: {
    color: theme.colors.gray,
    fontFamily: theme.fonts.light,
  },
  modalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  modalInput: {
    width: 45,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
    fontSize: 24,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 24,
  },
  productInfo: {
    flexDirection: 'row',
  },
  divider: {
    height: 0.5,
    marginVertical: 2,
    backgroundColor: theme.colors.gray,
  }
});