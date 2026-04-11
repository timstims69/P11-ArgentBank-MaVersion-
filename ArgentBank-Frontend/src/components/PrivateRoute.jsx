import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * PrivateRoute - Protège les routes qui nécessitent une authentification
 * Redirige vers /sign-in si l'utilisateur n'est pas connecté
 *
 * @param {ReactNode} children - composant enfant à rendre si authentifié
 */
function PrivateRoute({ children }) {
  // children ici représente la balise qui est enfant a private route, regarde AppRouter ligne 21
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  // useSelector va récupere dans le state,  isAuthenticated et token poru qu'on puisse les mettre dans le if juset en dessous
  // Si pas de token ni d'authentification, on redirige vers le login
  if (!isAuthenticated && !token) {
    return <Navigate to="/sign-in" replace />;
  }

  return children; // Si authentifié, on rend le composant enfant (ex: Profile)
}

export default PrivateRoute;

// Sans cette page, on pourrait accéder à /profile même sans être connecté, ce qui causerait des erreurs
// tu veut voir où ont l'utilise ? => Approuter ligne 21 et 23, regarde comme elle protège la page profil

// yaakov stp note que le useSelector chope les variables du states
// comme  isAuthenticated, donc ici on verifie si isAuthenticated true, et si token true
// dans la ligne 11, oui je sais la synthaxe ne montre pas ça, c'est un language abrégé pour verif si vrais
