import { CategoryEnum, Product } from "../types";

interface ProductsCategoryProps {
  category: string;
  data: Product[];
};

export default function getProductsCategory(products: Product[]) {
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

  return productsCategory;
};