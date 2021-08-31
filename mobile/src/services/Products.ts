import { ProductProps, ProductsCategoryProps } from "../utils/types";

import api from "./api";

export async function getProducts() {
  const response = await api.get('/products');

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
  } catch (error) {
    throw new Error(error);
  };
};

export async function editProduct(data: ProductProps) {
  try {
    await api.put(`/products/${data.id}`, data);
  } catch (error) {
    throw new Error(error);
  };
};