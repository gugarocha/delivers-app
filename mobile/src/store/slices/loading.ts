import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: true
  },
  reducers: {
    setIsLoading: state => {
      state.isLoading = true;
    },
    setIsNotLoading: state => {
      state.isLoading = false;
    },
  },
});

export const { setIsLoading, setIsNotLoading } = loadingSlice.actions;

export default loadingSlice.reducer;