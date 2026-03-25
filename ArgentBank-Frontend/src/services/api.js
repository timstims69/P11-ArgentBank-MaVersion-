const API_BASE_URL = "http://localhost:3001/api/v1";

/**
 * Login API call
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token: string}>}
 */
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.status !== 200) {
    throw new Error(data.message || "Login failed");
  }

  return data.body; // { token }
  // mais ou va le token ? dans le localStorage ou dans un cookie ?
}

/**
 * Get user profile
 * @param {string} token - JWT token
 * @returns {Promise<Object>} user profile data
 */
export async function getUserProfile(token) {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (data.status !== 200) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data.body; // { id, email, firstName, lastName, userName, ... }
}

/**
 * Update user profile (username only)
 * @param {string} token - JWT token
 * @param {string} userName - New username
 * @returns {Promise<Object>} updated user profile
 */
export async function updateUserProfile(token, userName) {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT", // et non post car on modifie une ressource existante, tandis que POST ajoute
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userName }),
  });

  const data = await response.json();

  if (data.status !== 200) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data.body;
}
