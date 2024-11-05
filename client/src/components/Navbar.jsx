import { Link } from "react-router-dom";
import "./Navbar.css";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Luxora</h1>
      </div>
      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <div className="navbar-right">
        <Login />
        <Logout />
      </div>
    </nav>
  );
};

export default Navbar;
