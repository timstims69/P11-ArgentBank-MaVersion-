// Fichier : src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice.Js"; // 👈 On importe le reducer de ton authSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

// On exporte les types pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
