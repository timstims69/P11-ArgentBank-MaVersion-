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
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(user?.userName || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName.trim()) {
      await dispatch(updateUsernameThunk({ token, userName: userName.trim() }));
      onCancel(); // Ferme le formulaire après sauvegarde
    }
  };

  return (
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
