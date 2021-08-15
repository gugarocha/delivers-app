import { Alert } from "react-native";

import { useLoading } from "./loading";
import { editOrder } from '../services/Orders';

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

  return {
    updateOrder
  };
};