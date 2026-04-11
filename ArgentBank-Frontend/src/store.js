import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";

// Yaakov, ConfigStore c'est le créateur du store de redux
export const store = configureStore({
  reducer: {
    // le reducer ici ne fait rien a aprt deleguer son role a authslice.js,
    //  quand il reçois un dispatch un signal est envoyé a mes extrareducers
    auth: authReducer,
  },
});
