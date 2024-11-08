import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import AddToCartButton from "../components/AddToCart.jsx";
import { config } from "../config";

const { API_URL } = config;

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  useEffect(() => {
    fetch(API_URL + `/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(console.error);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <div className="product-details-image">
        <img src={`/${product.image}`} alt={product.image}></img>
      </div>
      <div className="details-container">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">Price: ${product.price}</p>
        <p className="info">Material: {product.material}</p>
        <p className="info">Size: {product.size}</p>
        <p className="info">Color: {product.color}</p>
        <p className="info">Available: {product.available}</p>
        <div className="buttons">
          <button onClick={() => setCount(count - 1)}>-</button>
          <p>{count}</p>
          <button onClick={() => setCount(count + 1)}>+</button>
          <AddToCartButton
            productId={product._id}
            amount={count}
            buttonText="Add to Cart"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
