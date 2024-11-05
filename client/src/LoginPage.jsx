import { Link, useLocation } from "react-router-dom";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

export function LoginPage() {
  const { isAuthenticated } = useAuth0();
  let { state } = useLocation();

  // Maybe it's a good idea to redirect the user to the page they were trying to access before logging in
  // --> https://reactrouter.com/en/main/hooks/use-navigate

  return (
    <div>
      <h1>Login / Logout Page</h1>

      <span>{isAuthenticated ? "Authenticated" : "Not Authenticated"}</span>

      {isAuthenticated ? (
        <p>Click the button to log out</p>
      ) : (
        <p>Click the button to log in. You will be redirected...</p>
      )}
      <LoginButton />
      <LogoutButton />
      <Profile />
      {state && state.returnTo ? (
        <>
          <p>Return to: {state.returnTo}</p>
          <Link to={state.returnTo}>zurück</Link>
        </>
      ) : (
        <Link to="/">Home</Link>
      )}
    </div>
  );
}
