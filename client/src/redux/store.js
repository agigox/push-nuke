import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import rootReducer from './reducers';
import { dataApi } from '../api';

const store = configureStore({
  reducer: { ...rootReducer, [dataApi.reducerPath]: dataApi.reducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(dataApi.middleware);
  },
});
setupListeners(store.dispatch);
export default store;
