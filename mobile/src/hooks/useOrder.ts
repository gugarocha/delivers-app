import { Alert } from "react-native";

import {
  createOrder,
  editOrder,
  changeDeliverStatus,
  deleteOrder
} from '../services/Orders';

import { OrdersProps, SetDeliverStatusProps } from "../utils/types";
import { useLoading } from "./loading";

export function useOrder() {
  const { setLoading } = useLoading();

  async function addOrder(data: OrdersProps) {
    try {
      setLoading(true);

      await createOrder(data);

      setLoading(false);
    } catch (error) {
      Alert.alert('Erro ao criar novo pedido');
    };
  };

  async function updateOrder(data: OrdersProps) {
    try {
      setLoading(true);

      await editOrder(data);

      setLoading(false);
    } catch {
      Alert.alert('Erro ao salvar dados do pedido');
    };
  };

  async function setDeliverStatus(
    data: SetDeliverStatusProps,
    fetchData: () => Promise<void>
  ) {
    try {
      setLoading(true);

      await changeDeliverStatus(data);
      await fetchData();
    } catch {
      Alert.alert('Erro ao definir o status de entrega do pedido');
    };
  };

  async function removeOrder(
    id: number,
    fetchData: () => Promise<void>
  ) {
    try {
      setLoading(true);

      await deleteOrder(id);
      await fetchData();
    } catch (error) {
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