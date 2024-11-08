import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { config } from "./config";

const { API_URL } = config;

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(API_URL + "/cart/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCartCount(data.cartCount);
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartCount(0);
      }
    };

    if (isAuthenticated) {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  function changeCartCount(newCartCount) {
    setCartCount(newCartCount);
  }

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Outlet
        context={{
          changeCartCount,
        }}
      />
    </>
  );
}

export default App;
