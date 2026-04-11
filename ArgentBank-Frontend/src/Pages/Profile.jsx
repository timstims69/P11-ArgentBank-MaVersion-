import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileThunk } from "../features/auth/authSlice";
import AccountCard from "../components/AccountCard";
import EditUserForm from "../components/EditUserForm";

/**
 * Données des comptes (mockées côté front car le backend ne les fournit pas encore)
 * En phase 2 (transactions), ces données viendront de l'API
 */
const accounts = [
  {
    title: "Argent Bank Checking (x8349)",
    amount: "$2,082.79",
    description: "Available Balance",
  },
  {
    title: "Argent Bank Savings (x6712)",
    amount: "$10,928.42",
    description: "Available Balance",
  },
  {
    title: "Argent Bank Credit Card (x8349)",
    amount: "$184.30",
    description: "Current Balance",
  },
];

/**
 * Profile Page - Page du profil utilisateur (protégée par PrivateRoute)
 * - Affiche le nom de l'utilisateur
 * - Permet de modifier le userName via EditUserForm
 * - Affiche la liste des comptes bancaires
 */
function Profile() {
  const [isEditing, setIsEditing] = useState(false); // state local et non pas state global
  const { user, token } = useSelector((state) => state.auth); // par contre ici sdtate global
  const dispatch = useDispatch();

  // Si on a un token mais pas de user (ex: rafraîchissement de page),
  // on re-fetch le profil
  useEffect(() => {
    if (token && !user) {
      // si on as un token mais pas de user demande a fetchProfileThunk en lui envoyant le token
      dispatch(fetchProfileThunk(token));
    }
  }, [token, user, dispatch]); // permet qu'a chaque fois que token ou username change, useEffect sera déclenché

  return (
    <main className="main bg-dark">
      <div className="header">
        {isEditing ? ( // jsute un state qui vérif si j'edite ou pas
          <>
            <h1>Welcome back</h1>
            <EditUserForm onCancel={() => setIsEditing(false)} />
          </>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {user?.firstName} {user?.lastName}{" "}
              {/* "?" veut dire : verifie si user existe et si oui affiche son prenom et nom, sinon affiche rien */}
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <AccountCard
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
}

export default Profile;
