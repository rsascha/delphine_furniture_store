import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();

  console.log({ pathname });

  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => {
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
      </button>
    </>

    // <Link to="/login" state={{ returnTo: pathname }}>
    //   Log In {pathname}
    // </Link>
  );
};

export default LoginButton;
