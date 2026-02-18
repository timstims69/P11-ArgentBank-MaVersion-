import React from "react";
import AppRouter from "./router/AppRouter"; // ✅ C'est lui qui gère Home maintenant
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
