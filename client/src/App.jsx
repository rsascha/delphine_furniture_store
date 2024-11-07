import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      setCartCount(0);
    } else {
      // TODO: get cartCount for logged in user from server
    }
  }, [isAuthenticated]);

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
