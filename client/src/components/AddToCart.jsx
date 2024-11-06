import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addToCart } from "../util/addToCart.js";

function AddToCartButton({ productId, amount = 1, buttonText = "+" }) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { setCartCount } = useOutletContext();

  const handleAddToCart = () => {
    addToCart({
      productId,
      amount,
      isAuthenticated,
      getAccessTokenSilently,
      navigate,
      setCartCount,
    });
  };
  return <button onClick={handleAddToCart}>{buttonText}</button>;
}

export default AddToCartButton;
