import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OrdersProps } from '../../utils/types';

export const deliversSlice = createSlice({
  name: 'deliversSlice',
  initialState: {
    delivers: <OrdersProps[]>[]
  },
  reducers: {
    setDelivers: (state, action: PayloadAction<OrdersProps[]>) => {
      state.delivers = action.payload;
    }
  }
});

export default deliversSlice.reducer;

export const { setDelivers } = deliversSlice.actions;