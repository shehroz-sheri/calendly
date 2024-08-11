import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "icsDownload/download/fulfilled",
          "events/exportEvents/fulfilled",
        ],
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["items.dates"],
      },
    }),
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
