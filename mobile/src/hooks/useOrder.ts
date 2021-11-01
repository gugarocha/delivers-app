import { Alert } from 'react-native';

import { useLoading } from './useLoading';

import {
  createOrder,
  editOrder,
  changeDeliverStatus,
  deleteOrder
} from '../services/Orders';

import { OrdersProps, SetDeliverStatusProps } from '../utils/types';

export function useOrder() {
  const { enableLoading, disableLoading } = useLoading();

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

  async function setDeliverStatus(
    data: SetDeliverStatusProps,
    fetchData: () => void
  ) {
    try {
      enableLoading();

      await changeDeliverStatus(data);
      fetchData();
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
    setDeliverStatus,
    removeOrder
  };
};