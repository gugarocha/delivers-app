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

export const routesSlice = createSlice({
  name: 'routesSlice',
  initialState: {
    routes: <RouteProps[]>[],
    ordersRoute: <SetOrdersRouteProps[]>[]
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

    setOrderDeliveredStatus: (state, action: PayloadAction<SetIsDeliveredStatusProps>) => {
      const { orderId, routeId, isDeliveredStatus } = action.payload;
      const index = state.ordersRoute.findIndex(item => item.routeId === routeId);

      if (index >= 0) {
        state.ordersRoute[index].orders.forEach(item => {
          if (item.id === orderId) {
            item.delivered = isDeliveredStatus;
          };

          return item;
        });
      };
    }
  }
});

export default routesSlice.reducer;

export const {
  setRoutes,
  setOrdersRoute,
  setOrderDeliveredStatus
} = routesSlice.actions;