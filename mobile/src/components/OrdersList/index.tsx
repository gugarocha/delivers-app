import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { SpinLoading } from '../SpinLoading';
import { ActionModal } from '../ActionModal';
import { OrderCard } from '../OrderCard';
import { OrdersStatusTitle } from '../OrdersStatusTitle';

import { useLoading } from '../../hooks/loading';
import { useOrdersRoute } from '../../hooks/useOrdersRoute';

import { styles } from './styles';

interface Props {
  routeId: number;
};

export function OrdersList({ routeId }: Props) {
  const { loading } = useLoading();
  const {
    notDeliveredOrders,
    deliveredOrders,
    changeDeliverStatus,
    removeOrderRoute
  } = useOrdersRoute(routeId);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  function closeModal() {
    setShowModal(false);
  };

  function handleClickDeleteOrder(id: number) {
    setSelectedId(id);
    setShowModal(true);
  };

  async function handleConfirmDelete() {
    closeModal();

    if (selectedId) {
      await removeOrderRoute(selectedId);
    };
  };

  return (
    loading
      ? (
        <View style={styles.contentContainer}>
          <SpinLoading />
        </View>
      ) :
      <>
        <ActionModal
          isVisible={showModal}
          title='Excluir Pedido'
          cancelButtonAction={closeModal}
          confirmButtonAction={handleConfirmDelete}
        >
          <Text style={styles.modalText}>
            Deseja excluir esse pedido?
          </Text>
        </ActionModal>

        <FlatList
          data={notDeliveredOrders}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Nenhum pedido para ser entregue
            </Text>
          }
          renderItem={({ item }) =>
            <OrderCard
              data={item}
              changeDeliverStatus={() => changeDeliverStatus({
                orderId: item.id,
                deliverStatus: !item.delivered
              })}
              handleRemoveOrder={() => handleClickDeleteOrder(item.id)}
            />
          }
          ListHeaderComponent={<OrdersStatusTitle delivered={false} />}
          ListFooterComponent={() => (
            <FlatList
              data={deliveredOrders}
              keyExtractor={item => String(item.id)}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyListText}>
                  Nenhum pedido entregue
                </Text>
              }
              renderItem={({ item }) =>
                <OrderCard
                  data={item}
                  changeDeliverStatus={() => changeDeliverStatus({
                    orderId: item.id,
                    deliverStatus: !item.delivered
                  })}
                  handleRemoveOrder={() => handleClickDeleteOrder(item.id)}
                />
              }
              ListHeaderComponent={<OrdersStatusTitle delivered />}
            />
          )}
        />
      </>
  );
};