import { Navigate } from "react-router-dom";
// 👇 On utilise ton hook (vérifie le chemin vers hooks)
import { useAppSelector } from "../app/hooks";

// ❌ On a supprimé l'interface "PrivateRouteProps" car elle n'existe pas en JS standard

const PrivateRoute = ({ children }) => {
  // 👇 On récupère la vraie info depuis le store Redux
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Si pas connecté, redirection vers Login
    return <Navigate to="/login" />;
  }

  // Si connecté, on affiche la page protégée (User)
  return <>{children}</>;
};

export default PrivateRoute;
