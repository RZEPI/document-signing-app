import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from "./user-type";
import userDataReducer from "./user-data";
import fileReducer from "./file";

const store = configureStore({
  reducer: {
    userType: userTypeReducer,
    userData: userDataReducer,
    file: fileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
