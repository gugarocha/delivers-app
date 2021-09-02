import { Request, Response } from "express";

import connection from "../database/connection";
import { Product } from "../types";

import getProductsCategory from "../utils/getProductsCategory";

export default {
  async index(req: Request, res: Response) {
    const products: Product[] = await connection('products')
      .select({
        id: 'id',
        categoryId: 'category_id',
        name: 'name',
        active: 'active'
      })
      .where('active', '=', true)
      .orderBy(['category_id', 'name']);

    const productsCategory = getProductsCategory(products);

    return res.json(productsCategory);
  },

  async getInactiveProducts(req: Request, res: Response) {
    const products = await connection('products')
      .select({
        id: 'id',
        categoryId: 'category_id',
        name: 'name',
        active: 'active'
      })
      .where('active', '=', false)
      .orderBy(['category_id', 'name']);

    const productsCategory = getProductsCategory(products);

    return res.json(productsCategory);
  },

  async create(req: Request, res: Response) {
    const { name, categoryId } = req.body;

    try {
      await connection('products').insert({
        name: name,
        category_id: categoryId
      });

      return res.status(201).json({ message: 'Product created successfully' });

    } catch (err) {
      console.log(err);

      return res.status(400).json({ error: 'Unexpected error while creating new product' });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, categoryId, active } = req.body;

    try {
      await connection('products')
        .where('id', '=', id)
        .update({
          name: name,
          category_id: categoryId,
          active: active
        });

      return res.json({ message: "Update product successfully" })
        ;
    } catch (error) {
      console.log(error);

      return res.json({ error: 'Unexpected error while update product' })
    }
  }
};