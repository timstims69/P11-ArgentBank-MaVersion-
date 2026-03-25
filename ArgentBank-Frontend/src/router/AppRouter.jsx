import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";

import SignIn from "../Pages/SignIn";

import Profile from "../Pages/Profile";

import PrivateRoute from "../components/PrivateRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/sign-in" element={<SignIn />} />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;
