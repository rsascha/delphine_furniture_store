import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const { isAuthenticated } = useAuth0();
  const [cartCount, setCartCount] = useState(0);
  const [returnTo, setReturnTo] = useLocalStorageState("returnTo", {
    defaultValue: "/",
  });

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

  function changeReturnLocation(newLocation) {
    setReturnTo(newLocation);
  }

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Outlet
        context={{
          changeCartCount,
          changeReturnLocation,
          returnLocation: returnTo,
        }}
      />
    </>
  );
}

export default App;
