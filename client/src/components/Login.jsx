import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const redirect_uri = window.location.origin + "/login";
  console.debug({ redirect_uri });

  if (isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={() =>
        loginWithRedirect({ authorizationParams: { redirect_uri } })
      }
    >
      Log In
    </button>
  );
};

export default LoginButton;
