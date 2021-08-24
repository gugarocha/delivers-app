import { Request, Response } from "express";

import connection from "../database/connection";

interface Product {
  id: number;
  productAmount: number;
};

export default {
  async create(req: Request, res: Response) {
    const { routeId, client, products, payment, valueToReceive } = req.body;

    const trx = await connection.transaction();

    try {
      const orderId = await trx('orders')
        .returning('id')
        .insert({
          route_id: routeId,
          client: client,
          payment: payment,
          value_to_receive: valueToReceive
        });

      const prods = products.map((product: Product) => {
        return {
          order_id: orderId[0],
          product_id: product.id,
          product_amount: product.productAmount
        };
      });

      await trx('orders_products').insert(prods);

      await trx.commit();

      return res.status(201).json({ message: 'Order created successfully' });

    } catch (error) {
      await trx.rollback();

      console.log(error);

      return res.json({ error: 'Unexpected error while create order' });
    };
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      routeId,
      client,
      products,
      payment,
      valueToReceive,
      delivered
    } = req.body;

    const trx = await connection.transaction();

    try {
      await trx('orders')
        .where('id', '=', id)
        .update({
          route_id: routeId,
          client: client,
          payment: payment,
          value_to_receive: valueToReceive,
          delivered: delivered
        });

      await trx('orders_products')
        .where('order_id', '=', id)
        .del();

      const prods = products.map((product: Product) => {
        return {
          order_id: id,
          product_id: product.id,
          product_amount: product.productAmount
        };
      });

      await trx('orders_products').insert(prods);

      await trx.commit();

      return res.status(201).json({ message: 'Update order successfully' });

    } catch (error) {
      await trx.rollback();

      console.log(error);

      return res.status(400).json({ error: 'Unexpected error while update order' });
    };
  },

  async setDeliverStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { deliverStatus } = req.body;

    try {
      await connection('orders')
        .where('id', '=', id)
        .update('delivered', deliverStatus);

      return res.json({ message: 'Set order delivered successfully' });

    } catch (error) {
      console.log(error);

      return res.json({ error: 'Unexpected error while set delivered order' })
    };
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await connection('orders')
        .where('id', '=', id)
        .del();

      return res.json({ message: 'Delete order successfully' });

    } catch (error) {
      console.log(error);

      return res.json({ error: 'Unexpected error while delete order' });
    };
  }
};