import { OrdersProps } from "../utils/types";

import api from "./api";

export async function editOrder(data: OrdersProps) {
  try {
    await api.put(`/orders/${data.id}`, data);
  } catch (error) {
    throw new Error(error);
  }
};