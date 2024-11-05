import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  const returnTo = window.location.origin + "/login";
  console.debug({ returnTo });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button onClick={() => logout({ logoutParams: { returnTo } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;
