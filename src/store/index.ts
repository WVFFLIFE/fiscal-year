import { configureStore } from '@reduxjs/toolkit';

import appReducer from 'features/appSlice';
import generalPageReducer from 'features/generalPageSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    generalPage: generalPageReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
