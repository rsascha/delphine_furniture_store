import { useAuth0 } from "@auth0/auth0-react";
import { useOutletContext, Link } from "react-router-dom";
import { addToCart } from "../util/addToCart.js";
import { useLocation } from "react-router-dom";

function AddToCartButton({ productId, amount = 1, buttonText = "+" }) {
  const { pathname } = useLocation();
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0();
  const { changeCartCount } = useOutletContext();

  const handleAddToCart = async () => {
    let accessToken = "";
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    } else {
      alert(
        "Bitte loggen Sie sich ein, um Produkte in den Warenkorb zu legen."
      );
      const searchParams = new URLSearchParams();
      searchParams.append("redirect", pathname);
      loginWithRedirect({
        authorizationParams: {
          redirect_uri:
            window.location.origin + "/login?" + searchParams.toString(),
        },
      });
      return;
    }
    const cartCount = await addToCart({
      productId,
      amount,
      accessToken,
    });
    changeCartCount(cartCount);
  };
  return (
    <>
      <button onClick={handleAddToCart}>{buttonText}</button>
    </>
  );
}

export default AddToCartButton;
