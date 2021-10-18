import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useLoading } from './useLoading';
import { useConnection } from "./useConnection";

import { getOrders, getSummary } from "../services/Routes";

import { OrdersProps, SummaryProps } from "../utils/types";
import {
  COLLECTION_ORDERS_ROUTE,
  COLLECTION_SUMMARY_ROUTE
} from '../configs/database';

export function useOrdersRoute(routeId: number) {
  const { enableLoading, disableLoading } = useLoading();
  const { isConnected } = useConnection();

  const [notDeliveredOrders, setNotDeliveredOrders] = useState<OrdersProps[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<OrdersProps[]>([]);
  const [summary, setSummary] = useState<SummaryProps>({} as SummaryProps);

  const COLLECTION_ORDERS = `${COLLECTION_ORDERS_ROUTE}:${routeId}`;
  const COLLECTION_SUMMARY = `${COLLECTION_SUMMARY_ROUTE}:${routeId}`;

  function loadDataToStates(orders: OrdersProps[], summary: SummaryProps) {
    setNotDeliveredOrders(orders.filter(order => !order.delivered));
    setDeliveredOrders(orders.filter(order => order.delivered));
    setSummary(summary);
  };

  async function fetchData() {
    enableLoading();

    if (isConnected) {
      const ordersData = await getOrders(routeId);
      const summaryData = await getSummary(routeId);

      loadDataToStates(ordersData, summaryData);

      await AsyncStorage.setItem(COLLECTION_ORDERS, JSON.stringify(ordersData));
      await AsyncStorage.setItem(COLLECTION_SUMMARY, JSON.stringify(summaryData));
    } else {
      const storagedOrders = await AsyncStorage.getItem(COLLECTION_ORDERS);
      const storagedSummary = await AsyncStorage.getItem(COLLECTION_SUMMARY);

      storagedOrders && storagedSummary &&
        loadDataToStates(
          JSON.parse(storagedOrders),
          JSON.parse(storagedSummary)
        );
    };

    disableLoading();
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [isConnected])
  );

  return {
    notDeliveredOrders,
    deliveredOrders,
    summary,
    fetchData
  };
};