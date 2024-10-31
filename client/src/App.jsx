import "./App.css";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import { Outlet } from "react-router-dom";
// import Profile from "./components/Profile.jsx";

function App() {
  return (
    <>
      <Login />
      <Logout />
      <Outlet />
    </>
  );
}

export default App;
