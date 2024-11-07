import "./CartItem.css";

const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <img src={item.productId.image} alt={item.productId.name} />
      <div className="cart-item-details">
        <h2>{item.productId.name}</h2>
        <p>Quantity: {item.amount}</p>
        <p>Price: ${item.productId.price}</p>
        <p>Total: ${(item.amount * item.productId.price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
