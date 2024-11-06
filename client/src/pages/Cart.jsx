// function Cart() {
//   return <h1>Welcome to the Cart Page</h1>;
// }

// export default Cart;

//-------------


import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import "./Cart.css";

const Cart = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { returnTo: "/cart" } });
      return;
    }

    const fetchCartItems = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch("http://localhost:3000/cart", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        if (!response.ok) throw new Error("Failed to fetch cart items");

        const data = await response.json();
        setCartItems(data.products);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [isAuthenticated, getAccessTokenSilently, navigate]);

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.length ? (
        cartItems.map(item => (
          <CartItem key={item.productId._id} item={item} />
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
