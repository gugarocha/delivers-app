import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import { theme } from "../../global/styles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    paddingTop: Constants.statusBarHeight + 8,
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  backAndTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 24,
  },
  title: {
    color: '#FFF',
    fontFamily: theme.fonts.regular,
    fontSize: 24,
  },
  optionalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});