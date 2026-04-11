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

// Yaakov matte moi ça: ici c'est entre crocher parceque c'est une décomposition de tableau, c'est pour
// extratirrae rapidemant les données sinon faut tout déclarer séparement que emaiol et setEmail= usestate
function SignIn() {
  const [email, setEmail] = useState(""); //email c'est la variable qui contient l'email, setEmail change la variable email,
  // MAI useState("") ici ? je sais pas :) je sais que c'est vide pour qu y'ai une valeure initiale vide, pas de valeure de base faut que l'utilsateur rentre son mail.
  const [password, setPassword] = useState("");
  // Remember me peut etre seulement V ou F (Donc ici false par défaut), setRememberMe la change
  const [rememberMe, setRememberMe] = useState(false);

  // attention yaakov les deux sont des hooks,
  const dispatch = useDispatch(); // remarque biens que je dois attribuer useDispatch a une variable que j'utiliserais ensuite
  const navigate = useNavigate(); // j'asisgne useNavigte a une varible pour bouger de page, (voir la ligne 33)
  const { isAuthenticated, error, isLoading } = useSelector(
    // le useSelector est un hook qui va chercher dans le state, que vas t'il chercher dans le state ?
    // Il va chercher tout ce qui est en "parametre",

    (state) => state.auth, // ou je vais  chercher ce qui est en parametre ? dans le state, dans authslice
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
    // e ici veut dire event, c'est un objet qui est le kéli du formulaire
    // on gere l'evenemlent du click sur le bouton de co'
    e.preventDefault(); //preventdefault empeche le comportement par défaut du formulaire qui fait recharger la page pour des raison que j'ignore,
    // en tout cas nous on veut juste envoyer un formulaire
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
              vb
              type="text"
              id="username"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              } /* des que tu vois un event mes a jour la valeure dde setEmail */
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
