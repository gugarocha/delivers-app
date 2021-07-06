import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

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