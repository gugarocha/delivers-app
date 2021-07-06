import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0278AE',
    paddingTop: Constants.statusBarHeight,
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
  tilte: {
    color: '#FFF',
    fontSize: 24,
  },
  optionalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});