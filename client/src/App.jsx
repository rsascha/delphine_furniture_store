import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";

function App() {
  return (
    <>
      <Login />
      <Logout />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
