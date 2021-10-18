import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { OrderProductsProps } from "../../utils/types";

export const productsSlice = createSlice({
  name: 'selectedProducts',
  initialState: {
    selectedProducts: <OrderProductsProps[]>[]
  },
  reducers: {
    changeSelectedProducts: (state, action: PayloadAction<OrderProductsProps[]>) => {
      state.selectedProducts = action.payload;
    },
  },
});

export const { changeSelectedProducts } = productsSlice.actions;

export default productsSlice.reducer;