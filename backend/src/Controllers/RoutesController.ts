import { Request, Response } from "express";

import connection from "../database/connection";

import { OrderProducts, CategoryEnum, Order } from "../types";
import fetchProducts from "../utils/fetchProducts";

interface Category {
  category: string;
  itemsCategoryTotal: number;
  data: OrderProducts[];
};

interface RouteId {
  id: number;
};

export default {
  async index(req: Request, res: Response) {
    const routes = await connection('routes')
      .select({
        id: 'routes.id',
        name: 'routes.name',
        date: 'routes.date',
        totalDelivers: connection.count('orders.id')
      })
      .fullOuterJoin('orders', 'routes.id', 'orders.route_id')
      .groupBy('routes.id')
      .orderBy('routes.date')
      .where('routes.finished', '=', false);

    return res.json(routes);
  },

  async showOrders(req: Request, res: Response) {
    const routeId = req.params.id

    const orders: Order[] = await connection('orders')
      .select({
        id: 'id',
        routeId: 'route_id',
        client: 'client',
        payment: 'payment',
        valueToReceive: 'value_to_receive',
        delivered: 'delivered'
      })
      .where('route_id', '=', routeId);

    const ordersProducts = await fetchProducts(orders);

    res.json(ordersProducts);
  },

  async summary(req: Request, res: Response) {
    const routeId = req.params.id;

    let ordersIds = await connection('orders')
      .select('id')
      .where('route_id', '=', routeId);

    ordersIds = ordersIds.map(({ id }) => id);

    const products: OrderProducts[] = await connection('products')
      .select({
        id: 'products.id',
        product: 'products.name',
        categoryId: 'categories.id',
        productAmount: connection.sum('orders_products.product_amount')
      })
      .innerJoin('orders_products', 'orders_products.product_id', 'products.id')
      .innerJoin('categories', 'categories.id', 'products.category_id')
      .groupBy('products.id', 'categories.id', 'products.name')
      .orderBy(['categories.id', 'products.name'])
      .whereIn('order_id', ordersIds);

    let categories: Category[] = [];
    for (let i = 0; i < 3; i++) {
      categories[i] = {
        category: CategoryEnum[i + 1],
        itemsCategoryTotal: 0,
        data: []
      };
    };

    products.forEach(product => {
      product.productAmount = Number(product.productAmount);

      const index = product.categoryId - 1;

      categories[index].itemsCategoryTotal += product.productAmount;
      categories[index].data.push(product);
    });

    const itemsTotal = products
      .map(product => product.productAmount)
      .reduce((sum, value) => sum + value, 0);

    const summary = {
      ordersTotal: ordersIds.length,
      itemsTotal,
      categories
    };

    res.json(summary);
  },

  async create(req: Request, res: Response) {
    const { name, date } = req.body;

    try {
      const [routeId]: RouteId[] = await connection('routes')
        .returning('id')
        .insert({
          name,
          date
        });

      return res.status(201).json({
        message: 'Route created successfully',
        id: routeId.id
      });

    } catch (err) {
      console.log(err);

      return res.status(400).json({ error: 'Unexpected error while creating new route' });
    };
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, date } = req.body;

    try {
      await connection('routes')
        .where('id', '=', id)
        .update({
          name,
          date
        });

      return res.status(201).json({ message: 'Update route successfully' });

    } catch (err) {
      console.log(err);

      return res.status(401).json({ error: 'Unexpected error while update route' });
    };
  },

  async setFinished(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await connection('routes')
        .where('id', '=', id)
        .update('finished', true);

      return res.json({ message: 'Set route finished successfully' });

    } catch (err) {
      console.log(err);

      return res.json({ error: 'Unexpected error while set finished route' });
    };
  }
};