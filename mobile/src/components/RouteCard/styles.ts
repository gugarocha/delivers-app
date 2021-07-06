import { StyleSheet } from "react-native";

import { theme } from "../../global/styles";

export const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    maxWidth: '45%',
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  routeName: {
    color: theme.colors.secondary,
    fontFamily: theme.fonts.bold,
    fontSize: 15,
  },
  infoContainer: {
    marginTop: 14,
  },
  label: {
    color: theme.colors.gray,
    fontFamily: theme.fonts.light,
    fontSize: 13,
  },
});