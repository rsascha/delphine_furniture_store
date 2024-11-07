import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addToCart } from "../util/addToCart.js";

function AddToCartButton({ productId, amount = 1, buttonText = "+" }) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { changeCartCount } = useOutletContext();

  const handleAddToCart = async () => {
    let accessToken = "";
    if (isAuthenticated) {
      accessToken = await getAccessTokenSilently();
    } else {
      alert(
        "Bitte loggen Sie sich ein, um Produkte in den Warenkorb zu legen."
      );
      navigate("/login", { state: { returnTo: "/products" } });
      return;
    }
    const cartCount = await addToCart({
      productId,
      amount,
      accessToken,
    });
    changeCartCount(cartCount);
  };
  return <button onClick={handleAddToCart}>{buttonText}</button>;
}

export default AddToCartButton;
