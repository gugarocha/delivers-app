import { useCallback } from "react";
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

  const fetchData = (): AppThunk => async dispatch => {
    enableLoading();

    if (isConnected) {
      const ordersData = await getOrders(routeId);
      const summaryData = await getSummary(routeId);

      const deliveredOrders = ordersData.filter(item => item.delivered);
      const notDeliveredOrders = ordersData.filter(item => !item.delivered);

      dispatch(
        setOrdersRoute({
          routeId,
          orders: {
            delivered: deliveredOrders,
            notDelivered: notDeliveredOrders
          },
          summary: summaryData,
        })
      );
    };

    disableLoading();
  };

  const fetchOrdersRoute = () => {
    dispatch(fetchData());
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrdersRoute();
    }, [isConnected])
  );

  return {
    notDeliveredOrders: selectedOrdersRoute?.orders.notDelivered || <OrdersProps[]>[],
    deliveredOrders: selectedOrdersRoute?.orders.delivered || <OrdersProps[]>[],
    summary: selectedOrdersRoute?.summary || <SummaryProps>{},
    fetchOrdersRoute
  };
};