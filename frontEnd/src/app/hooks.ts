// Fichier : src/app/hooks.ts (ou hook.ts)
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux"; // 👈 On ajoute "type" ici
import type { RootState, AppDispatch } from "./store";

// Utilise ces hooks dans toute l'app au lieu des versions de base
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
