import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';


const persistConfig = {
    key: 'root',
    storage,
    // Specify the reducers you want to persist
    whitelist: ['user'], // In this example, we persist the 'user' reducer
  };

  const rootReducer = combineReducers({
    user: userReducer, // Add other reducers here if necessary
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