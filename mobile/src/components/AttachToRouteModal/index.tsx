import React, { useState } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';

import { ActionModal } from '../ActionModal';

import { useRoutes } from '../../hooks/useRoutes';

import { formatDate } from '../../utils/formatDate';

import { styles } from './styles';

interface Props {
  isVisible: boolean;
  routeId: number | null | undefined;
  setRouteId: (id: number | null | undefined) => void;
  closeModal: () => void;
};

export function AttachToRouteModal({
  isVisible,
  routeId,
  setRouteId,
  closeModal
}: Props) {
  const { routes } = useRoutes();

  const [selectedRouteId, setSelectedRouteId] = useState(routeId);

  function handleCancelButton() {
    setSelectedRouteId(null);
    setRouteId(null);
    closeModal();
  };

  function handleConfirmButton() {
    setRouteId(selectedRouteId);
    closeModal();
  };

  return (
    <ActionModal
      isVisible={isVisible}
      title='Anexar à rota'
      cancelButtonAction={handleCancelButton}
      confirmButtonAction={handleConfirmButton}
    >
      <FlatList
        data={routes}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          <Text style={styles.emptyListText}>
            Nenhuma rota encontrada
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.container, item.id === selectedRouteId && styles.selectedRoute]}
            onPress={() => setSelectedRouteId(item.id)}
          >
            <View>
              <Text style={styles.infoLabel}>Rota</Text>
              <Text>{item.name}</Text>
            </View>
            <View>
              <Text style={styles.infoLabel}>Data</Text>
              <Text>{formatDate(item.date)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ActionModal>
  );
};