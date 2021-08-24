import { OrdersProps, SetDeliverStatusProps } from "../utils/types";

import api from "./api";

export async function createOrder(data: OrdersProps) {
  try {
    await api.post('/orders', data);
  } catch (error) {
    throw new Error(error);
  };
};

export async function editOrder(data: OrdersProps) {
  try {
    await api.put(`/orders/${data.id}`, data);
  } catch (error) {
    throw new Error(error);
  };
};

export async function changeDeliverStatus(data: SetDeliverStatusProps) {
  try {
    await api.put(
      `/orders/${data.orderId}/setDeliverStatus`,
      { deliverStatus: data.deliverStatus }
    );
  } catch (error) {
    throw new Error(error);
  };
};

export async function deleteOrder(id: number) {
  try {
    await api.delete(`/orders/${id}`);
  } catch (error) {
    throw new Error(error);
  };
};