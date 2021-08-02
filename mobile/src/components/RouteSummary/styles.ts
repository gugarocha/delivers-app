import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray,
  },
  headerLabel: {
    textAlign: 'center',
    color: theme.colors.gray,
  },
  headerTotalsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  headerTotalBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTotalText: {
    fontSize: 22,
    color: theme.colors.primary
  },
  headerDivider: {
    width: 1,
    backgroundColor: theme.colors.gray
  },
  sectionHeaderContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sectionHeaderItemsTotal: {
    color: theme.colors.secondary,
  },
  container: {
    width: screenWidth,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  contentContainer: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  itemSeparator: {
    marginHorizontal: 20,
    height: 1,
    backgroundColor: theme.colors.gray,
  },
  productItem: {
    paddingHorizontal: 20,
    lineHeight: 24,
    fontSize: 16,
    color: theme.colors.gray,
  },
});