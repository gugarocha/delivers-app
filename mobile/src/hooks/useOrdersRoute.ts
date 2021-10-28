import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";

import { useRedux } from './useRedux';
import { useLoading } from './useLoading';
import { useConnection } from "./useConnection";

import { getOrders, getSummary } from "../services/Routes";
import { AppThunk } from "../store";
import { setOrdersRoute } from '../store/slices/routes';

import { OrdersProps, SummaryProps } from "../utils/types";

export function useOrdersRoute(routeId: number) {
  const { selector, dispatch } = useRedux();
  const { enableLoading, disableLoading } = useLoading();
  const { isConnected } = useConnection();

  const { ordersRoute } = selector(state => state.routes);
  const selectedOrdersRoute = ordersRoute.find(item => item.routeId === routeId);

  const [notDeliveredOrders, setNotDeliveredOrders] = useState<OrdersProps[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<OrdersProps[]>([]);

  function setOrdersDeliverStatus(orders: OrdersProps[]) {
    setNotDeliveredOrders(orders.filter(order => !order.delivered));
    setDeliveredOrders(orders.filter(order => order.delivered));
  };

  const fetchData = (): AppThunk => async dispatch => {
    enableLoading();

    if (isConnected) {
      const ordersData = await getOrders(routeId);
      const summaryData = await getSummary(routeId);

      dispatch(setOrdersRoute({
        routeId,
        orders: ordersData,
        summary: summaryData,
      }));
    };

    selectedOrdersRoute && setOrdersDeliverStatus(selectedOrdersRoute?.orders);

    disableLoading();
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchData());
    }, [isConnected])
  );

  return {
    notDeliveredOrders,
    deliveredOrders,
    summary: selectedOrdersRoute?.summary || <SummaryProps>{},
    fetchData
  };
};