import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";

import { useLoading } from "./loading";
import { useOrder } from "./useOrder";
import { getOrders, getSummary } from "../services/Routes";

import { OrdersProps, SetDeliverStatusProps, SummaryProps } from "../utils/types";

export function useOrdersRoute(routeId: number) {
  const { setLoading } = useLoading();
  const { setDeliverStatus, removeOrder } = useOrder();

  const [notDeliveredOrders, setNotDeliveredOrders] = useState<OrdersProps[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<OrdersProps[]>([]);
  const [summary, setSummary] = useState<SummaryProps>({} as SummaryProps);

  async function fetchData() {
    setLoading(true);

    const ordersData = await getOrders(routeId);
    const summaryData = await getSummary(routeId);

    setNotDeliveredOrders(ordersData.filter(order => !order.delivered));
    setDeliveredOrders(ordersData.filter(order => order.delivered));
    setSummary(summaryData);

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      fetchData();
    }, [])
  );

  async function changeDeliverStatus(data: SetDeliverStatusProps) {
    await setDeliverStatus(data);

    await fetchData();
  };

  async function removeOrderRoute(id: number) {
    await removeOrder(id);

    await fetchData();
  }; 

  return {
    notDeliveredOrders,
    deliveredOrders,
    summary,
    changeDeliverStatus,
    removeOrderRoute
  };
};