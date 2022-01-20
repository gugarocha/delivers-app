import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetIsDeliveredStatusProps } from '../../utils/types';

export const actionsQueue = createSlice({
  name: 'actionsQueue',
  initialState: {
    queue: <SetIsDeliveredStatusProps[]>[]
  },
  reducers: {
    addActionToQueue: (state, action: PayloadAction<SetIsDeliveredStatusProps>) => {
      state.queue.push(action.payload);
    },

    removeHeadOfQueue: (state) => {
      state.queue.shift();
    }
  }
});

export default actionsQueue.reducer;

export const { addActionToQueue, removeHeadOfQueue } = actionsQueue.actions;