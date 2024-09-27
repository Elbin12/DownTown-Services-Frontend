import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user'
import adminReducer from './admin'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
  };

  const rootReducer = combineReducers({
    user: userReducer,
    admin:adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  });


export const persistor = persistStore(store);