import { Alert } from "react-native";

import { useLoading } from "./loading";
import { editOrder, setDeliveredOrder } from '../services/Orders';

import { OrdersProps } from "../utils/types";

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

  async function setToDelivered(orderId: number) {
    setLoading(true);

    try {
      await setDeliveredOrder(orderId);
    } catch {
      Alert.alert('Erro ao definir o pedido como entregue');
    } finally {
      setLoading(false);
    };
  };

  return {
    updateOrder,
    setToDelivered
  };
};