import { Request, Response } from "express";

import connection from "../database/connection";

import { CategoryEnum, Order, Product } from "../types";
import fetchProducts from "../utils/fetchProducts";

interface Category {
  category: string;
  itemsCategoryTotal: number;
  products: Product[];
};

export default {
  async index(req: Request, res: Response) {
    const routes = await connection('routes')
      .select('*')
      .where('finished', '=', false);

    return res.json(routes);
  },

  async showOrders(req: Request, res: Response) {
    const routeId = req.params.id

    const orders: Order[] = await connection('orders')
      .select({
        id: 'id',
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

    const products: Product[] = await connection('products')
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

    products.forEach(product => {
      const index = product.categoryId - 1;

      if (categories[index] === undefined) {
        categories[index] = {
          category: CategoryEnum[product.categoryId],
          itemsCategoryTotal: 0,
          products: []
        };
      };

      categories[index].itemsCategoryTotal += Number(product.productAmount);
      categories[index].products.push(product);
    });

    const itemsTotal = products
      .map(product => Number(product.productAmount))
      .reduce((sum, value) => sum + value);

    const summary = {
      ordersTotal: ordersIds.length,
      itemsTotal,
      categories
    };

    res.json(summary);
  },

  async create(req: Request, res: Response) {
    const {name, date} = req.body;
    
    try {
      await connection('routes').insert({
        name,
        date
      });

      return res.status(201).json({ message: 'Route created successfully' });

    } catch (err) {
      console.log(err);

      return res.status(400).json({ error: 'Unexpected error while creating new route' });
    };
  }
};