import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { useState } from "react";

function App() {
  const [cartCount, setCartCount] = useState(0);

  function changeCartCount(newCartCount) {
    setCartCount(newCartCount);
  }

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Outlet context={{ changeCartCount }} />
    </>
  );
}

export default App;
