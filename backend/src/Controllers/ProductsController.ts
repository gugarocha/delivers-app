import { Request, Response } from "express";

import connection from "../database/connection";

export default {
  async index(req: Request, res: Response) {
    const products = await connection('products')
      .select('*')
      .orderBy('category_id');

    return res.json(products);
  },
};