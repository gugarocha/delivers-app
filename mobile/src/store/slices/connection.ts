import { createSlice } from '@reduxjs/toolkit';

export const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    isConnected: undefined
  },
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnectionStatus } = connectionSlice.actions;

export default connectionSlice.reducer;