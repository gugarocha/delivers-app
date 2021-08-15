import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";

import { useLoading } from "./loading";
import { getOrders, getSummary } from "../services/Routes";

import { OrdersProps, SummaryProps } from "../utils/types";

export function useOrdersRoute(routeId: number) {
  const { setLoading } = useLoading();

  const [orders, setOrders] = useState<OrdersProps[]>([]);
  const [summary, setSummary] = useState<SummaryProps>({} as SummaryProps);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        setLoading(true);

        const ordersData = await getOrders(routeId);
        const summaryData = await getSummary(routeId);

        setOrders(ordersData);
        setSummary(summaryData);

        setLoading(false);
      };

      fetchData();
    }, [])
  );

  return { orders, summary };
};