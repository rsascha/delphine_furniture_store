import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth0();
  // const { pathname } = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={() => {
        const searchParams = new URLSearchParams();
        searchParams.append("redirect", "/");
        logout({
          logoutParams: {
            returnTo:
              window.location.origin + "/login?" + searchParams.toString(),
          },
        });
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
