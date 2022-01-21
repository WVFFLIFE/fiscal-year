import { configureStore, Middleware } from '@reduxjs/toolkit';

import appReducer from 'features/appSlice';
import generalPageReducer from 'features/generalPageSlice';
import balanceReducer from 'features/balanceSlice';
import settingsReducer from 'features/settingsSlice';
import commentsReducer from 'features/commentsSlice';

import _pick from 'lodash/pick';

function getBrowserStorage(type: 'localStorage' | 'sessionStorage') {
  switch (type) {
    case 'localStorage':
      return window.localStorage;
    case 'sessionStorage':
      return window.sessionStorage;
    default:
      return window.localStorage;
  }
}

const whitelist = ['app'];
const PERSISTED_KEY = 'uds_accounting_module:persist:root';
const storage = getBrowserStorage('sessionStorage');

const rehydrateStore = () => {
  const persistedStore = storage.getItem(PERSISTED_KEY);
  if (persistedStore !== null) {
    return JSON.parse(persistedStore);
  }
};

const persistStoreMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const persistedReducer = _pick(getState(), whitelist);

    storage.setItem(PERSISTED_KEY, JSON.stringify(persistedReducer));

    return next(action);
  };
};

const store = configureStore({
  preloadedState: rehydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistStoreMiddleware),
  reducer: {
    app: appReducer,
    generalPage: generalPageReducer,
    balance: balanceReducer,
    settings: settingsReducer,
    comments: commentsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
