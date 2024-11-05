import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <>
      <span>User ID: {isAuthenticated ? user.sub : "-"}</span>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/login" state={{ returnTo: "/" }}>
          Login
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
