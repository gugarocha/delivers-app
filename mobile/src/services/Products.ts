import { ProductsCategoryProps } from "../utils/types";

import api from "./api";

export async function getProducts() {
  const response = await api.get('/products');

  const products: ProductsCategoryProps[] = response.data;

  return products;
};