import { Request, Response } from "express";

import connection from "../database/connection";

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
  }
};