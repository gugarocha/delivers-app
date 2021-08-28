import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  contentContainer: {
    width: screenWidth,
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
});