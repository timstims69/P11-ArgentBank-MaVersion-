import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import argentBankLogo from "../assets/img/argentBankLogo.png";

/**
 * Header / Navigation
 * - Si l'utilisateur est connecté : affiche son userName + Sign Out
 * - Sinon : affiche le lien Sign In
 */
function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout()); // Sert a se déconnecter en dispatchant logout
    // quand j'appuye sur le bouton qui est sur le header
    navigate("/"); // va sur la pgae d'acceuil apres la déco
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {isAuthenticated && user ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {user.userName || user.firstName}
            </Link>
            <button
              className="main-nav-item"
              onClick={handleSignOut}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#2c3e50",
                fontSize: "inherit",
                fontFamily: "inherit",
              }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
