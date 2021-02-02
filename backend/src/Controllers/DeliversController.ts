import { Request, Response } from "express";
import connection from "../database/connection";

import { Order } from "../types";
import fetchProducts from "../utils/fetchProducts";

export default {
  async index(req: Request, res: Response) {
    const orders: Order[] = await connection('orders')
      .select({
        id: 'orders.id',
        routeId: 'route_id',
        client: 'client',
        payment: 'payment',
        valueToReceive: 'value_to_receive',
        delivered: 'delivered',
      })
      .whereNull('route_id')
      .where('delivered', false);
      
    const ordersProducts = await fetchProducts(orders);

    return res.json(ordersProducts);
  }
};