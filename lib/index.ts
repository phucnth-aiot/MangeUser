// lib/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/store/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { registerReducer } from "@/store/registerSlice";

const persistConfig = {
  key: "root",
  storage,
  // if don't have whiteList it defaults (store all of slice)
  whitelist: ["auth","register"]
};

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
});



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
