import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(console.error);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }
  const incrementCounter = () => {
    setCount(count + 1);
  };
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
      <img src="/path/to/product-image.jpg" alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Material: {product.material}</p>
      <p>Size: {product.size}</p>
      <p>Color: {product.color}</p>
      <p>Available: {product.available}</p>
      <button onClick={incrementCounter}>{count}</button>
      <button onClick={() => addToCart(product._id)}>Add to cart</button>
    </div>
  );
}

export default ProductDetails;
