import { Alert } from 'react-native';

import { useLoading } from './useLoading';
import { useRedux } from './useRedux';

import {
  createOrder,
  editOrder,
  changeIsDeliveredStatus,
  deleteOrder
} from '../services/Orders';
import { setOrderDeliveredStatus } from '../store/slices/orders';

import { OrdersProps, SetIsDeliveredStatusProps } from '../utils/types';

export function useOrder() {
  const { enableLoading, disableLoading } = useLoading();
  const { dispatch } = useRedux();

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
    dispatch(setOrderDeliveredStatus(data));

    try {
      await changeIsDeliveredStatus(data);
    } catch {
      Alert.alert('Erro ao definir o status de entrega do pedido');
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

  return {
    addOrder,
    updateOrder,
    setIsDeliveredStatus,
    removeOrder
  };
};