import { Link } from "react-router-dom";
// Assure-toi que le chemin vers ton image est correct
// Si ton image est directement dans 'src/assets', c'est "../assets/..."
import logo from "../assets/argentBankLogo.png";

export default function Navbar() {
  return (
    <nav className="main-nav">
      {/* Lien vers la page d'accueil */}
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {/* Lien vers la page de connexion */}
        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
}
