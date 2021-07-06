import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },
  modalTitleText: {
    textAlign: 'center',
    fontSize: 26,
    color: '#0278AE',
  },
  modalRowWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  modalLabel: {
    marginRight: 8,
    color: '#6C757D'
  },
  calendarIcon: {
    marginRight: 5,
  },
  modalInput: {
    flex: 1,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  modalCancelButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6A097D',
  },
  modalCancelButtonText: {
    color: '#6A097D',
  },
  modalConfirmButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#6A097D',
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