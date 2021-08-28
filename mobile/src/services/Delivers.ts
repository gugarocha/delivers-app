import { OrdersProps } from "../utils/types";
import api from "./api";

export async function getDelivers() {
  const response = await api.get('/delivers');

  const orders: OrdersProps[] = response.data;

  return orders;
};