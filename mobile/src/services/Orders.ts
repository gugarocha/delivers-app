import { OrdersProps, SetIsDeliveredStatusProps } from "../utils/types";

import api from "./api";

export async function createOrder(data: OrdersProps) {
  try {
    await api.post('/orders', data);
  } catch {
    throw new Error();
  };
};

export async function editOrder(data: OrdersProps) {
  try {
    await api.put(`/orders/${data.id}`, data);
  } catch {
    throw new Error();
  };
};

export async function changeIsDeliveredStatus(data: SetIsDeliveredStatusProps) {
  try {
    await api.put(
      `/orders/${data.orderId}/setDeliverStatus`,
      { deliverStatus: data.isDeliveredStatus }
    );
  } catch {
    throw new Error();
  };
};

export async function deleteOrder(id: number) {
  try {
    await api.delete(`/orders/${id}`);
  } catch {
    throw new Error();
  };
};