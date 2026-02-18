// Fichier : src/Pages/SignIn.tsx

// On importe les composants qu'on a déjà faits (Navbar et Footer)
import Navbar from "../Components/Navbar"; // Vérifie le chemin "../components"
import Footer from "../Components/Footer";

export default function SignIn() {
  return (
    <>
      <Navbar />

      {/* 👇 DÉBUT DU CODE VENANT DE SIGN-IN.HTML 👇 */}
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              {/* En React, les input doivent se fermer avec /> */}
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            {/* J'ai changé le <a> en <button> car c'est un formulaire */}
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      {/* 👆 FIN DU CODE VENANT DE SIGN-IN.HTML 👆 */}

      <Footer />
    </>
  );
}
