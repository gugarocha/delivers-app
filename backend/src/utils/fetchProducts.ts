import connection from "../database/connection";

import { Order, OrderProducts } from "../types";

export default async function fetchProducts(orders: Order[]) {
  const ordersIds = orders.map(order => order.id);

  const products: OrderProducts[] = await connection('orders_products')
    .select({
      id: 'orders_products.product_id',
      product: 'products.name',
      categoryId: 'categories.id',
      productAmount: 'orders_products.product_amount',
      orderId: 'orders_products.order_id'
    })
    .innerJoin('products', 'product_id', 'products.id')
    .innerJoin('categories', 'categories.id', 'products.category_id')
    .orderBy(['categories.id', 'products.name'])
    .whereIn('order_id', ordersIds);

  const ordersProducts = orders.map(order => {
    order.products = products.filter(product => product.orderId === order.id);
    order.products.forEach(product => delete product.orderId);

    return order;
  })

  return ordersProducts;
}