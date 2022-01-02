import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  OrdersProps,
  RouteProps,
  SetIsDeliveredStatusProps,
  SummaryProps
} from '../../utils/types';

interface SetOrdersRouteProps {
  routeId: number;
  orders: OrdersProps[];
  summary: SummaryProps;
};

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState: {
    routes: <RouteProps[]>[],
    ordersRoute: <SetOrdersRouteProps[]>[],
    delivers: <OrdersProps[]>[]
  },
  reducers: {
    setRoutes: (state, action: PayloadAction<RouteProps[]>) => {
      state.routes = action.payload;
    },

    setOrdersRoute: (state, action: PayloadAction<SetOrdersRouteProps>) => {
      const orders = action.payload;

      const index = state.ordersRoute.findIndex(item => item.routeId === orders.routeId);

      index >= 0
        ? state.ordersRoute[index] = orders
        : state.ordersRoute.push(orders)
    },

    setDelivers: (state, action: PayloadAction<OrdersProps[]>) => {
      state.delivers = action.payload;
    },

    setOrderDeliveredStatus: (state, action: PayloadAction<SetIsDeliveredStatusProps>) => {
      const { orderId, routeId, isDeliveredStatus } = action.payload;

      if (routeId) {
        const index = state.ordersRoute.findIndex(item => item.routeId === routeId);

        state.ordersRoute[index].orders.forEach(item => {
          if (item.id === orderId) {
            item.delivered = isDeliveredStatus;
          };

          return item;
        });
      } else {
        state.delivers = state.delivers.filter(item => item.id !== orderId);
      }
    }
  }
});

export default ordersSlice.reducer;

export const {
  setRoutes,
  setOrdersRoute,
  setDelivers,
  setOrderDeliveredStatus
} = ordersSlice.actions;