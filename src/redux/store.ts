import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TransactionReducer } from "./slice/TransactionSlice";


const persistConfig = {
    key: "root",
    storage,
      whitelist: ["TransactionReducer"], 
};


const rootReducer = combineReducers({
    TransactionReducer,
    //   chatReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;