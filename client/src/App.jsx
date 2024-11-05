import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";

function App() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <>
      <span>User ID: {isAuthenticated ? user.sub : "-"}</span>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
