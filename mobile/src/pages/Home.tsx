import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

import { Header } from '../components/Header';

const Home: React.FC = () => {
  return (
    <>
      <Header title='Rotas' showBackButton={false}>
        <TouchableOpacity >
          <Feather name='filter' size={24} color='#FFF' />
        </TouchableOpacity>
      </Header>
    </>
  );
};

export default Home;