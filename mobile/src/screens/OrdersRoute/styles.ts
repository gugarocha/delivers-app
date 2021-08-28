import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
  setFinishedModalText: {
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  buttonIcon: {
    marginLeft: 15,
  },
  infoRouteContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: '#FFF',
  },
  infoRouteBlock: {
    flex: 1,
    alignItems: 'center'
  },
  infoRouteLabel: {
    fontSize: 12,
    color: theme.colors.gray,
  },
  infoRouteValue: {
    color: theme.colors.secondary,
  },
  infoRouteDivider: {
    width: 0.5,
    backgroundColor: theme.colors.gray,
  },
});