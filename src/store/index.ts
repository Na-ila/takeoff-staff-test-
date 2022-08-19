import { configureStore } from '@reduxjs/toolkit';

import lkSlice from './lkSlice';

const store = configureStore({
  reducer: {
    lkSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
