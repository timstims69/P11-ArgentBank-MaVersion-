import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginThunk } from "../features/auth/authSlice";

/**
 * SignIn Page - Formulaire de connexion
 * - Envoie les credentials via le thunk loginThunk
 * - Redirige vers /profile en cas de succès
 * - Affiche un message d'erreur en cas d'échec
 */
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // attention yaakov les deux sont des hooks,
  const dispatch = useDispatch();
  const navigate = useNavigate(); // si connecté, navigue à page profile
  const { isAuthenticated, error, isLoading } = useSelector(
    (state) => state.auth,
  );

  // Redirection automatique si déjà connecté
  // useEffect est un hook qui permet d'executer du code à chaque fois que le composant se met à jour, ou au montage du composant, ou au démontage du composant, ou quand une variable change, etc... ici on utilise useEffect pour rediriger vers la page profile si isAuthenticated devient true
  useEffect(() => {
    if (isAuthenticated) {
      // Ici on test si authentifié est vrai, si oui alors on navigue vers la page profile, si je voulais tester si il est faut alors il suffit de rajouetr ! au début, pourquoi ne pas precisez si true ? car ici on utilise un language raccourci car en general on teste toujour si true,
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]); // ici c'est des parametres, ils sont al a fin ne cherche aps a comprendre, on met isAutenticated pour pouvoir verif si autorisé ou pas , et navigate pour pouvoir navigue, oui je sais c'est c'est logique mais sans ça le code peut pas naviguer

  const handleSubmit = (e) => {
    // on gere l'evenemlent du click sur le bouton de co'
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              } /* le e entre parenthese ici est l'Event */
              autoComplete="email"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default SignIn;
