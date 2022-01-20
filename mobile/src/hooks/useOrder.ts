import { Alert } from 'react-native';

import { useLoading } from './useLoading';
import { useConnection } from './useConnection';
import { useRedux } from './useRedux';

import {
  createOrder,
  editOrder,
  changeIsDeliveredStatus,
  deleteOrder
} from '../services/Orders';

import { persistor } from '../store';
import { setOrderDeliveredStatus } from '../store/slices/orders';
import { addActionToQueue, removeHeadOfQueue } from '../store/slices/actionsQueue';

import { OrdersProps, SetIsDeliveredStatusProps } from '../utils/types';

export function useOrder() {
  const { enableLoading, disableLoading } = useLoading();
  const { isConnected } = useConnection();
  const { dispatch, selector } = useRedux();

  const { queue } = selector(state => state.actionsQueue);

  async function addOrder(data: OrdersProps) {
    try {
      enableLoading();

      await createOrder(data);

      disableLoading();
    } catch {
      Alert.alert('Erro ao criar novo pedido');
    };
  };

  async function updateOrder(data: OrdersProps) {
    try {
      enableLoading();

      await editOrder(data);

      disableLoading();
    } catch {
      Alert.alert('Erro ao salvar dados do pedido');
    };
  };

  async function setIsDeliveredStatus(data: SetIsDeliveredStatusProps) {
    await persistor.flush();
    dispatch(setOrderDeliveredStatus(data));

    try {
      await changeIsDeliveredStatus(data);
    } catch {
      dispatch(addActionToQueue(data));
    };
  };

  async function removeOrder(
    id: number,
    fetchData: () => void
  ) {
    try {
      enableLoading();

      await deleteOrder(id);
      fetchData();
    } catch {
      Alert.alert('Erro ao remover pedido');
    };
  };

  async function executeActionsInQueue() {
    if (isConnected && queue.length > 0) {
      try {
        await changeIsDeliveredStatus(queue[0]);

        dispatch(removeHeadOfQueue());
      } catch (error) {
        console.log(error);
      };
    };
  }

  return {
    addOrder,
    updateOrder,
    setIsDeliveredStatus,
    removeOrder,
    executeActionsInQueue
  };
};