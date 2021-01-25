import { Request, Response } from "express";

import connection from "../database/connection";

interface ProductItem {
  order_id: number;
  product_id: number;
  product_amount: number;
}

export default {
  async create(req: Request, res: Response) {
    const { routeId, client, products, payment, valueToReceive } = req.body;

    const trx = await connection.transaction();

    try {
      await trx('orders').insert({
        route_id: routeId,
        client: client,
        payment: payment,
        value_to_receive: valueToReceive
      });

      await trx('orders_products').insert(products);

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
    const { routeId, client, products, payment, valueToReceive } = req.body;

    const trx = await connection.transaction();

    try {
      await trx('orders')
        .where('id', '=', id)
        .update({
          route_id: routeId,
          client: client,
          payment: payment,
          value_to_receive: valueToReceive
        });

      await trx('orders_products')
        .where('order_id', '=', id)
        .del();

      await trx('orders_products').insert(products);

      await trx.commit();

      return res.status(201).json({ message: 'Update order successfully' });

    } catch (error) {
      await trx.rollback();

      console.log(error);

      return res.json({ error: 'Unexpected error while update order' });
    };
  },

  async setDelivered(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await connection('orders')
        .where('id', '=', id)
        .update('delivered', true);
      
      return res.json({ message: 'Set order delivered successfully' });

    } catch (error) {
      console.log(error);

      return res.json({ error: 'Unexpected error while set delivered order' })
    };
  }
};