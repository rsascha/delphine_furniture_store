import "./CartItem.css";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useLocalStorageState from "use-local-storage-state";

const CartItem = ({ item, productId }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { changeCartCount } = useOutletContext();
  const [amount, setAmount] = useLocalStorageState("amount", {
    defaultValue: item.amount,
  });

  useEffect(() => {
    async function editCart() {
      let accessToken = "";
      if (isAuthenticated) {
        accessToken = await getAccessTokenSilently();
      }
      try {
        const response = await fetch("http://localhost:3000/cart/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
          body: JSON.stringify({
            _id: productId,
            amount,
          }),
        });

        if (!response.ok) {
          throw new Error("Data fetching error");
        }

        const data = await response.json();
        changeCartCount(data.cartCount);
        console.log(data);
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
    editCart();
  }, [
    isAuthenticated,
    getAccessTokenSilently,
    amount,
    productId,
    changeCartCount,
  ]);

  return (
    <div className="cart-item">
      <div className="item-info">
        <div className="image-section">
          <img src={item.productId.image} alt={item.productId.name} />
        </div>
        <div className="info-section">
          <div className="info-container">
            <h3>{item.productId.name}</h3>
            {/* <p className="price-section">Price: ${item.productId.price}</p> */}
            <div className="total">
              <p>Total: ${item.amount * item.productId.price.toFixed(2)}</p>
            </div>{" "}
            <div className="quantity">
              <button onClick={() => setAmount(amount - 1)}>-</button>
              <span>{amount}</span>
              <button onClick={() => setAmount(amount + 1)}>+</button>
            </div>{" "}
          </div>
          <button className="delete">DELETE</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
