import { StyleSheet } from "react-native";

import { theme } from "../../global/styles";

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },
  modalTitleText: {
    textAlign: 'center',
    color: theme.colors.primary,
    fontFamily: theme.fonts.regular,
    fontSize: 26,
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
    fontSize: 16  
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
  modalCancelButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  modalCancelButtonText: {
    color: theme.colors.secondary,
  },
  modalConfirmButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: theme.colors.secondary,
  },
  modalConfirmButtonText: {
    color: '#FFF'
  },
  container: {
    marginTop: 30,
    paddingHorizontal: 12,
  },
  cardsContainer: {
    justifyContent: 'space-between',
  },
});