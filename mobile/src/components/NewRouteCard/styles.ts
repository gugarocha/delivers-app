import { StyleSheet } from "react-native";

import { theme } from "../../global/styles";

export const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '45%',
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingVertical: 45,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  newRouteText: {
    marginTop: 15,
    color: theme.colors.gray,
    fontSize: 16,
  },
});