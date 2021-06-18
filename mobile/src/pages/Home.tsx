import React from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

import { Header } from '../components/Header';
import { RouteCard } from '../components/RouteCard';

const Home: React.FC = () => {
  const data = [
    {
      id: 1,
      name: "Sexta-Feira",
      date: "2021-02-05",
      totalDelivers: 20
    },
    {
      id: 2,
      name: "Sexta-Feira",
      date: "2021-02-05",
      totalDelivers: 20
    },
  ];

  return (
    <>
      <Header title='Rotas' showBackButton={false}>
        <TouchableOpacity >
          <Feather name='filter' size={24} color='#FFF' />
        </TouchableOpacity>
      </Header>

      <View style={styles.container}>
        <FlatList
          data={[...data, { id: undefined }]}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <RouteCard data={item} />}
          numColumns={2}
          columnWrapperStyle={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 12,
  },
  cardsContainer: {
    justifyContent: 'space-between',
  },
});