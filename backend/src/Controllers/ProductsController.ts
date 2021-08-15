import { Request, Response } from "express";

import connection from "../database/connection";
import { CategoryEnum } from "../types";

interface ProductsProps {
  id: number;
  categoryId: number;
  name: string;
  active: boolean;
};

interface ProductsCategoryProps {
  category: string;
  data: ProductsProps[];
};

export default {
  async index(req: Request, res: Response) {
    const products: ProductsProps[] = await connection('products')
      .select({
        id: 'id',
        categoryId: 'category_id',
        name: 'name',
        active: 'active'
      })
      .where('active', '=', true)
      .orderBy(['category_id', 'name']);

    let productsCategory: ProductsCategoryProps[] = [];
    for (let i = 0; i < 3; i++) {
      productsCategory[i] = {
        category: CategoryEnum[i + 1],
        data: []
      };
    };

    products.forEach(product => {
      const index = product.categoryId - 1;

      productsCategory[index].data.push(product);
    });

    return res.json(productsCategory);
  },

  async showAll(req: Request, res: Response) {
    const products = await connection('products')
      .select('*')
      .orderBy(['category_id', 'name']);

    return res.json(products);
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
    const { name, categoryId, isActive } = req.body;

    try {
      await connection('products')
        .where('id', '=', id)
        .update({
          name: name,
          category_id: categoryId,
          active: isActive
        });

      return res.json({ message: "Update product successfully" })
        ;
    } catch (error) {
      console.log(error);

      return res.json({ error: 'Unexpected error while update product' })
    }
  }
};