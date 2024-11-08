import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import "./Cart.css";
import { config } from "../config";

const { API_URL } = config;

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
        const response = await fetch(API_URL + "/cart", {
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

  function handleUpdateAmount(productId, amount) {
    console.log("handleUpdateAmount", productId, amount);

    setCartItems(
      cartItems.map((item) => {
        if (item.productId._id === productId) {
          return {
            ...item,
            amount,
          };
        } else {
          return item;
        }
      })
    );
  }

  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + cur.amount * cur.productId.price,
    0
  );
  return (
    <>
      <div className="cart">
        <h2>Your Cart</h2>
        <div className="cart-item-container">
          {cartItems.length ? (
            cartItems.map((item) => (
              <CartItem
                key={item.productId._id}
                item={item}
                productId={item.productId._id}
                onUpdateAmount={handleUpdateAmount}
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="price-total">
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
        <div className="cart-total">
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
