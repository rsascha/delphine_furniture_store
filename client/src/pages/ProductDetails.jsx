import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(console.error);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  async function addToCart(productId) {
    try {
      // const userId = "";
      const amount = count;
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: productId,
          // userId,
          amount,
        }),
      });
      if (!response.ok) {
        throw new Error("Data fetching error");
      }
      const data = await response.json();
      alert("Product added to cart");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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
          <button onClick={() => addToCart(product._id)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
