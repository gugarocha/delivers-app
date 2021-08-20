import { Alert } from "react-native";

import { useLoading } from "./loading";
import { editOrder, changeDeliverStatus } from '../services/Orders';

import { OrdersProps, SetDeliverStatusProps } from "../utils/types";

export function useOrder() {
  const { setLoading } = useLoading();

  async function updateOrder(data: OrdersProps) {
    setLoading(true);

    try {
      await editOrder(data);
    } catch {
      Alert.alert('Erro ao salvar dados do pedido');
    } finally {
      setLoading(false);
    };
  };

  async function setDeliverStatus(data: SetDeliverStatusProps) {
    setLoading(true);

    try {
      await changeDeliverStatus(data);
    } catch {
      Alert.alert('Erro ao definir o status de entrega do pedido');
    } finally {
      setLoading(false);
    };
  };

  return {
    updateOrder,
    setDeliverStatus
  };
};