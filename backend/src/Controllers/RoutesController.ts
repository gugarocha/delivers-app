import { Request, Response } from "express";

import connection from "../database/connection";
import { Order } from "../types";

import fetchProducts from "../utils/fetchProducts";

export default {
  async index(req: Request, res: Response) {
    const routeId = req.params.id

    const orders: Order[] = await connection('orders')
      .select({
        id: 'id',
        client: 'client',
        payment: 'payment',
        valueToReceive: 'value_to_receive',
        delivered: 'delivered'
      })
      .where('route_id', '=', routeId)

    const ordersProducts = await fetchProducts(orders);

    res.json(ordersProducts);
  }
};