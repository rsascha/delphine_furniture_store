import "./CartItem.css";

const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <div className="item-info">
        <div className="image-section">
          <img src={item.productId.image} alt={item.productId.name} />
        </div>
        <div className="info-section">
          <div className="info-container">
            <h3>{item.productId.name}</h3>
            <span className="quantity-section">Quantity: {item.amount}</span>
            {/* <p className="price-section">Price: ${item.productId.price}</p> */}
            <div className="total">
              <p>Total: ${item.amount * item.productId.price}</p>
            </div>{" "}
            <div className="quantity">
              <button>-</button>
              <span>{item.amount}</span>
              <button>+</button>
            </div>{" "}
          </div>
          <button className="delete">DELETE</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
