import { useRedux } from './useRedux';
import { changeSelectedProducts } from '../store/slices/products';

import { OrderProductsProps } from '../utils/types';

export function useSelectedProducts() {
  const { selector, dispatch } = useRedux();

  const { selectedProducts } = selector(state => state.products);

  function setSelectedProducts(products: OrderProductsProps[]) {
    dispatch(changeSelectedProducts(products));
  };

  return {
    selectedProducts,
    setSelectedProducts,
  };
};