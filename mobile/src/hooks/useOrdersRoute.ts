import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";

import { useGlobalStates } from "./globalStates";
import { getOrders, getSummary } from "../services/Routes";

import { OrdersProps, SummaryProps } from "../utils/types";

export function useOrdersRoute(routeId: number) {
  const { setLoading } = useGlobalStates();

  const [notDeliveredOrders, setNotDeliveredOrders] = useState<OrdersProps[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<OrdersProps[]>([]);
  const [summary, setSummary] = useState<SummaryProps>({} as SummaryProps);

  async function fetchData() {
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

  return {
    notDeliveredOrders,
    deliveredOrders,
    summary,
    fetchData
  };
};