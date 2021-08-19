import { OrdersProps } from "../utils/types";

import api from "./api";

export async function editOrder(data: OrdersProps) {
  try {
    await api.put(`/orders/${data.id}`, data);
  } catch (error) {
    throw new Error(error);
  };
};

export async function setDeliveredOrder(orderId: number) {
  try {
    await api.put(`/orders/${orderId}/delivered`);
  } catch (error) {
    throw new Error(error);
  };
};