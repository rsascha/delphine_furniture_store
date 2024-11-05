import { Link, useLocation } from "react-router-dom";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useEffect } from "react";

export function LoginPage() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { state } = useLocation();
  const [returnTo, setReturnTo] = useLocalStorage("returnTo", "/");
  const redirect_uri = window.location.origin + "/login";

  useEffect(() => {
    if (state?.returnTo) {
      setReturnTo(state.returnTo);
    }
  }, [state, setReturnTo]);

  // Maybe it's a good idea to redirect the user to the page they were trying to access before logging in
  // --> https://reactrouter.com/en/main/hooks/use-navigate

  function handleLogin() {
    loginWithRedirect({ authorizationParams: { redirect_uri } });
  }

  function handleLogout() {
    logout();
  }

  return (
    <div>
      <h1>Login / Logout Page</h1>
      <pre>{JSON.stringify({ state })}</pre>
      <pre>{JSON.stringify({ returnTo })}</pre>
      <span>{isAuthenticated ? "Authenticated" : "Not Authenticated"}</span>

      {isAuthenticated ? (
        <p>Click the button to log out</p>
      ) : (
        <p>Click the button to log in. You will be redirected...</p>
      )}
      {isAuthenticated ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
        <button onClick={handleLogin}>Log In</button>
      )}

      <Profile />
      {returnTo ? (
        <>
          <p>Return to: {returnTo}</p>
          <Link to={returnTo}>zurück</Link>
        </>
      ) : (
        <Link to="/">Home</Link>
      )}
    </div>
  );
}
