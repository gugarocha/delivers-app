import { Request, Response } from "express";

import connection from "../database/connection";

export default {
  async index(req: Request, res: Response) {
    const products = await connection('products')
      .select('*')
      .where('active', '=', true)
      .orderBy(['category_id', 'name']);

    return res.json(products);
  },

  async showAll(req: Request, res: Response) {
    const products = await connection('products')
      .select('*')
      .orderBy(['category_id', 'name']);

    return res.json(products);
  },

  async create(req: Request, res: Response) {
    const { name, category_id } = req.body;

    try {
      await connection('products').insert({ name, category_id });

      return res.status(201).json({ message: 'Product created successfully' });

    } catch (err) {
      console.log(err);

      return res.status(400).json({ error: 'Unexpected error while creating new product' });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, category_id, active } = req.body;
    
    try {
      await connection('products')
        .where('id', '=', id)
        .update({ name, category_id, active });

      return res.json({ message: "Update product successfully" })
;
    } catch (error) {
      console.log(error);

      return res.json({ error: 'Unexpected error while update product' })
    }
  }
};