import React, { useState } from 'react';
import { FlatList, View, TouchableOpacity, } from "react-native";
import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { RouteDataModal } from '../../components/RouteDataModal';
import { RouteCard } from '../../components/RouteCard';
import { NewRouteCard } from '../../components/NewRouteCard';

import { useRoutes } from '../../hooks/useRoutes';

import { styles } from './styles';

export default function RoutesList() {
  const { routes } = useRoutes();

  const [modalVisible, setModalVisible] = useState(false);

  function closeModal() {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header title='Rotas' showBackButton={false}>
        <TouchableOpacity >
          <Feather name='filter' size={24} color='#FFF' />
        </TouchableOpacity>
      </Header>

      <RouteDataModal
        modalVisible={modalVisible}
        closeModal={closeModal}
      />

      <View style={styles.container}>
        <FlatList
          data={[...routes, { id: undefined }]}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) =>
            item.id
              ? <RouteCard data={item} />
              : <NewRouteCard openModal={() => setModalVisible(true)} />
          }
          numColumns={2}
          columnWrapperStyle={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};