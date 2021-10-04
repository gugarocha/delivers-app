import { ProductProps, ProductsCategoryProps } from "../utils/types";

import api from "./api";

export async function getActiveProducts() {
  const response = await api.get('/products');

  const products: ProductsCategoryProps[] = response.data;

  return products;
};

export async function getInactiveProducts() {
  const response = await api.get('/products/inactive');

  const products: ProductsCategoryProps[] = response.data;

  return products;
};

interface CreateProductProps {
  name: string;
  categoryId: number;
};
export async function addProduct(data: CreateProductProps) {
  try {
    await api.post('/products', data);
  } catch {
    throw new Error();
  };
};

export async function editProduct(data: ProductProps) {
  try {
    await api.put(`/products/${data.id}`, data);
  } catch {
    throw new Error;
  };
};