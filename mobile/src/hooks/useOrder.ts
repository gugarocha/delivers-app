import { Alert } from "react-native";

import { editOrder, changeDeliverStatus } from '../services/Orders';

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

  return {
    updateOrder,
    setDeliverStatus
  };
};