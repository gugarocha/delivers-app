import React, { useState } from 'react';
import { Text, FlatList } from 'react-native';

import { ActionModal } from '../ActionModal';
import { OrderCard } from '../OrderCard';
import { OrdersStatusTitle } from '../OrdersStatusTitle';

import { OrdersProps } from '../../utils/types';
import { useOrder } from '../../hooks/useOrder';

import { styles } from './styles';

interface Props {
  data: OrdersProps[];
  isDeliveredOrders?: boolean;
  ListFooterComponent?: React.ReactElement;
};

export function OrdersList({
  data,
  isDeliveredOrders = false,
  ListFooterComponent,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const { setDeliverStatus, removeOrder } = useOrder();

  function closeModal() {
    setShowModal(false);
  };

  function openDeleteOrderModal(id: number) {
    setSelectedId(id);
    setShowModal(true);
  };

  async function handleConfirmDelete() {
    if (selectedId) {
      await removeOrder(selectedId);
    };

    closeModal();
  };

  return (
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
        data={data}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            {
              isDeliveredOrders
                ? 'Nenhum pedido entregue'
                : 'Nenhum pedido para ser entregue'
            }
          </Text>
        }
        renderItem={({ item }) =>
          <OrderCard
            data={item}
            changeDeliverStatus={() => setDeliverStatus({
              orderId: item.id,
              deliverStatus: !item.delivered
            })}
            handleDeleteOrder={() => openDeleteOrderModal(item.id)}
          />
        }
        ListHeaderComponent={<OrdersStatusTitle delivered={isDeliveredOrders} />}
        ListFooterComponent={ListFooterComponent}
      />
    </>
  );
};