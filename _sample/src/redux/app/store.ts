import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import logger from "redux-logger";
import rootReducer from "../services/rootReducer.ts";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only auth is persisted
  transforms: [
    // Add a transform to handle the RESET_APP_STATE action
    createTransform(
      // transform state on its way to being serialized and persisted
      (inboundState) => inboundState,
      // transform state being rehydrated
      (outboundState) => outboundState,
      // define which reducers this transform gets called for
      { whitelist: ["auth"] }
    )
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
