import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  contentContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
  },
  emptyListText: {
    paddingVertical: 15,
    textAlign: 'center',
    color: theme.colors.gray,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  selectedRoute: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(2, 120, 174, 0.3)',
    backgroundColor: 'rgba(2, 120, 174, 0.15)',
  },
  infoLabel: {
    fontSize: 12,
    color: theme.colors.gray,
  },
});