import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";

const LoginButton = () => {
  const { isAuthenticated } = useAuth0();
  const { pathname } = useLocation();

  if (isAuthenticated) {
    return null;
  }

  return (
    <Link to="/login" state={{ returnTo: pathname }}>
      Log In {pathname}
    </Link>
  );
};

export default LoginButton;
