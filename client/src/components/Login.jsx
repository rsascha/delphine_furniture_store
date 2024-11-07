import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, Link } from "react-router-dom";

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <a
        onClick={(e) => {
          e.preventDefault();
          const searchParams = new URLSearchParams();
          searchParams.append("redirect", pathname);
          console.log(searchParams.toString());
          loginWithRedirect({
            authorizationParams: {
              redirect_uri:
                window.location.origin + "/login?" + searchParams.toString(),
            },
          });
        }}
      >
        Login
      </a>
    </>
  );
};

export default LoginButton;
