import React from "react";
import AppRouter from "./router/AppRouter"; // ✅ C'est lui qui gère Home maintenant
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
