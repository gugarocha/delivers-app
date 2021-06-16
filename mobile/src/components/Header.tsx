import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Constants from 'expo-constants';

interface Props {
  title: string;
  showBackButton?: boolean;
  children?: React.ReactNode;
};

export const Header = ({ title, showBackButton = true, children }: Props) => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backAndTitleContainer}>
        {showBackButton && (
          <TouchableOpacity
            onPress={goBack}
            style={styles.backButton}
          >
            <Feather name='arrow-left' size={24} color='#FFF' />
          </TouchableOpacity>
        )}
        <Text style={styles.tilte}>{title}</Text>
      </View>

      <View style={styles.optionalButtonsContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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