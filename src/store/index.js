import { configureStore } from '@reduxjs/toolkit';

import lkSlice from './lkSlice';

const store = configureStore({
  reducer: {
    lkSlice,
  },
});

export default store;
