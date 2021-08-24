import { Alert } from "react-native";

import { editOrder, changeDeliverStatus, deleteOrder } from '../services/Orders';

import { OrdersProps, SetDeliverStatusProps } from "../utils/types";

export function useOrder() {
  async function updateOrder(data: OrdersProps) {
    try {
      await editOrder(data);
    } catch {
      Alert.alert('Erro ao salvar dados do pedido');
    };
  };

  async function setDeliverStatus(data: SetDeliverStatusProps) {
    try {
      await changeDeliverStatus(data);
    } catch {
      Alert.alert('Erro ao definir o status de entrega do pedido');
    };
  };

  async function removeOrder(id: number) {
    try {
      await deleteOrder(id);
    } catch (error) {
      Alert.alert('Erro ao remover pedido');
    };
  };

  return {
    updateOrder,
    setDeliverStatus,
    removeOrder
  };
};