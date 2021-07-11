import { StyleSheet } from "react-native";

import { theme } from "../../global/styles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalRowWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  modalLabel: {
    marginRight: 8,
    color: theme.colors.gray,
    fontFamily: theme.fonts.light,
    fontSize: 16,
  },
  calendarIcon: {
    marginRight: 5,
  },
  modalInput: {
    flex: 1,
    borderColor: theme.colors.gray,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 12,
  },
  cardsContainer: {
    justifyContent: 'space-between',
  },
});