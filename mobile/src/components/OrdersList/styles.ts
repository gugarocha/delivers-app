import { StyleSheet, Dimensions } from 'react-native';

import { theme } from '../../global/styles';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  modalText: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center'
  },
  contentContainer: {
    width: screenWidth,
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  emptyListText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: theme.fonts.light,
    color: theme.colors.gray,
  },

});