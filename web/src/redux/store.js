import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './slice';
export default configureStore({
  reducer: {
    coin: coinReducer,
  },
});
