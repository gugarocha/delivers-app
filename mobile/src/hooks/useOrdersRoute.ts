import { useFocusEffect } from "@react-navigation/core";
import { useState, useCallback } from "react";

import { OrdersProps, SummaryProps } from "../utils/types";
import { getOrders, getSummary } from "../services/Routes";

export function useOrdersRoute(routeId: number) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrdersProps[]>([]);
  const [summary, setSummary] = useState<SummaryProps>({} as SummaryProps);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        const ordersData = await getOrders(routeId);
        const summaryData = await getSummary(routeId);

        setOrders(ordersData);
        setSummary(summaryData);
        setLoading(false);
      };
      
      fetchData();
    }, [])
  );

  return { loading, orders, summary };
};