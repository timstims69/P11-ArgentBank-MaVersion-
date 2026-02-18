import { configureStore } from "@reduxjs/toolkit";
// Assure-toi que le chemin vers authSlice est correct selon tes dossiers
import authReducer from "./Features/auth/authSlice";

// 👇 C'est ici l'important : il faut "export const" !
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
