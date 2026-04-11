// Envoie Login et MDP à l'API, reçoit le token et
// le stocke dans le state global (Redux)
import * as api from "../../services/api";
// 1. On sépare les imports : Les vraies fonctions d'un côté, les Types de l'autre
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
// ici c'est le initial state, il reste le même sur toute l'appmli, et je peut l'atteindre de partout

const initialState = {
  token: localStorage.getItem("token") || null, // Persistance

  user: null,

  isAuthenticated: false,

  isLoading: false,

  error: null,
};

export const loginThunk = createAsyncThunk(
  // Se lit de DROITE à GAUCHE T_T
  "auth/login", // nom de l'action (visible dans Redux DevTools)

  async ({ email, password }, { dispatch, rejectWithValue }) => {
    // Juste au dessus dispact et rejectWithValue sont des arguments, c'est comme si je les reserve pour l'utiliser plus tard dans la fonction
    // quand tu arrivera a là, tu pourra enfin les lires pour les interpreter
    // { email, password } son envoyés et exportés depuis le composant "login et email" sur la page de connexion, c'est la que je les ai envoyé, et je les reçois ici pour les utiliser dans ma fonction
    try {
      // 1. Appel API login
      // La constant du nom de {token} RECOIS la réponse de l'api,
      //  si je lui donne le bon mdp et passwrd
      // du coup maintenant j'ai lme token dans ma constante,
      const { token } = await api.loginUser(email, password); //await et un envoi de la demande, avec le email et passwrd dedans, et on attend al réponse
      // (token et entre grochets car il est DECOMPOSE, le code et epluche et garde uniquement la partie voulue)

      // 2. Maintenant que j'ai le token, je récup le profil utilisateur

      dispatch(fetchProfileThunk(token));
      //"j'ai le token envoie le profil"

      // 3. Retourne le token

      return token; // permet de garder le token dans le state global (Redux) et de le stocker dans localStorage
    } catch (error) {
      // 4. En cas d'erreur → sera dans action.payload du "rejected"

      return rejectWithValue(error.message);
    }
  },
);

export const fetchProfileThunk = createAsyncThunk(
  "auth/fetchProfile",

  // aussi elle est entre des accolades car c'est une fonction de thunk API
  // ici le paramètre token est défini dans le dispatch du loginThunk ligne 39,
  // puis aussi défini pas la fonction async qui attend le dispatch précedant pour définir son paramètre token, c'est un peu comme une chaîne de promesses, le token est passé de l'un à l'autre jusqu'à ce qu'il arrive ici pour être utilisé dans la fonction async token

  async (token, { rejectWithValue }) => {
    try {
      //j'envoie une demande a l'api avec le token pour récup le profil
      const profile = await api.getUserProfile(token);

      return profile;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
); // ici rejectWithValue est juste là au cas où ya une erreure,
// sans elle si erreur le site plante

// sert a mettre a jour le profil utilisateur,
// la synthaxe est la même que dans les fonctions précédentes

export const updateUsernameThunk = createAsyncThunk(
  "auth/updateUsername",
  // ici userName est une variable qui est notre nouveau nom de profil qu'on a défini dans editUserForm.jsx Ligne 11,
  async ({ token, userName }, { rejectWithValue }) => {
    try {
      const updatedProfile = await api.updateUserProfile(token, userName);

      return updatedProfile; // Le profil complet mis à jour
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ici ça sert a ce déco
const authSlice = createSlice({
  name: "auth",

  initialState, // on avait fait une variable initialState plus haut
  // je l'invoque ici et le slice va le digérer

  reducers: {
    // est ce que cette partie sert a déconnecter ? = Oui
    logout: (state) => {
      state.token = null; // je t'enleve le token  pour  déco

      state.user = null; // le profil user est enlevé autrement ça reste leolam vaed

      state.isAuthenticated = false; // pareil je nettoye, je me désauthentifie

      state.error = null; // pas d'erreur mais je nettoye quand même

      localStorage.removeItem("token"); // ok la on cherche variment a enlever le token
    },
  },

  // Ici c'est un réducer pour fonctions asynchrones (les thunks)
  extraReducers: (builder) => {
    // ---- LOGIN ----

    builder // Permet de mettre ensemble plusieur cas d'utilisations

      //Addcase gère plusieures étapes de fonctions asynchrone
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        // Quand loginThunk est pending alors prend le state et met le en loading true
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.token = action.payload;

        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload);
        // quand loginThunk est fullfilled alors prend le state et met loading en false, puis met le token en paylaod
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
        // quand loginThunk est rejected alors prend le state et met loading en false, puis met l'erreur en payload
      });

    // ---- FETCH PROFILE ----

    builder
      // Pour bein comprendre le fonctionnement de tout ces addcase n'oublie pas de regarder la fonction qu'on met dedans
      // je met ça en note parcque je n'arrivais pas a comprendre cette partie a cause de ça avant
      .addCase(fetchProfileThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload;

        state.isAuthenticated = true;
      })

      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;

        state.token = null;

        state.isAuthenticated = false;

        localStorage.removeItem("token");
      });

    // ---- UPDATE USERNAME ----

    builder

      .addCase(updateUsernameThunk.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })

      .addCase(updateUsernameThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        state.user = action.payload;
      })

      .addCase(updateUsernameThunk.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

// Pour résumer authslice sert a gere toutes les fonction d'authenthification
//en premier on met toutes les fonctions asynchrone qui vont faire les appels a l'api,
// ensuite on met le slice qui va gérer les états de ces fonctions asynchrone,

// et enfin on exporte les actions et le reducer pour les utiliser dans le reste de l'application
// Login, conexion > Fetch Profile, choppe le profil .
// on met aussi updateusername dans le tas ,c''est plus paratique
// puis porte logique reduceer selon ou je me trouve dans l'authentification oppour update le state
