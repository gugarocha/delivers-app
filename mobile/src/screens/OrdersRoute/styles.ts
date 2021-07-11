import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles';

export const styles = StyleSheet.create({
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
  contentContainer: {
    flex: 1,
    paddingTop: 2,
    paddingHorizontal: 12,
  }
});