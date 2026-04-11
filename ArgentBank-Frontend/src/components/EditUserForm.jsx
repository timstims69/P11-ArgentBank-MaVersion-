// Formulaire d'édition du userName
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUsernameThunk } from "../features/auth/authSlice";

/**
 * EditUserForm - Formulaire d'édition du userName
 * Le firstName et lastName sont affichés mais non modifiables (disabled)
 * Seul le userName peut être modifié via l'API PUT /profile
 *
 * @param {function} onCancel - callback pour fermer le formulaire
 */

function EditUserForm({ onCancel }) {
  // n'importe qui qui utilise EditUserForm doit lui passer une fonction onCancel, c'est une sorte de contrat, sinon le code va planter, car dans le code de EditUserForm on utilise onCancel pour fermer le formulaire, si on ne lui passe pas de fonction alors onCancel est undefined et quand on essaye de l'utiliser ça plante
  const { user, token } = useSelector((state) => state.auth); // je vais chzercher le token et le suername dans le state
  const dispatch = useDispatch(); // comme ça je peut afficher le username actuel et envoyer le token pour changer ce suername

  const [userName, setUserName] = useState(user?.userName || ""); // verifie si user.username existe  dans le state, si undefined alors met moi une chaine de etxte vide

  const handleSubmit = async (e) => {
    // gere l'evenement du submit du formulaire
    e.preventDefault();
    if (userName.trim()) {
      // trim enleve les espaces dans username
      await dispatch(updateUsernameThunk({ token, userName: userName.trim() })); // ici en parenthese c'est un objet js qui contient le token et le userName, c'est ce que attend la fonction updateUsernameThunk dans authSlice.js ligne 82
    } // ici il est ecrit userName: userName.trim() car il faut attribuer la variable userName à la clé userName de l'objet, sans ça updateUsernameThunk ne peut pas digérer les données que je lmui envoie ici
  };

  return (
    // quand le input de type submite (L59) du formulaire est déclenché, la fonction handleSUIbmit est appelée
    // grace a la propriété onSubmit, qui lorsqu'elle est déclenché execute la fonction handleSubmit,

    // en gros ici c'est juste un detecteur d'evenement
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="userName">User name:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          autoFocus
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          value={user?.firstName || ""}
          disabled
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          value={user?.lastName || ""}
          disabled
        />
      </div>
      <div className="edit-form-buttons">
        <button type="submit" className="save-button">
          Save
        </button>
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditUserForm;
