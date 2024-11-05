import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProductCard from "../components/ProductCard.jsx";
import "./Products.css";
import { Link } from "react-router-dom";
import Notification from "../components/Notification.jsx";

function Products() {
  const [products, setProducts] = useState([]);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    async function fetchProducts() {
      try {
        let accessToken = "";
        if (isAuthenticated) {
          accessToken = await getAccessTokenSilently();
        }
        const response = await fetch("http://localhost:3000/products", {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        });

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [isAuthenticated, getAccessTokenSilently]);

  async function addToCart(productId) {
    try {
      // const userId = "";
      const amount = 1;
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
      console.log(data);
      alert("Product added to cart");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <div>
      <h1>All Furniture</h1>
      {/* <Notification show={true} message={"You need to login"}></Notification> */}
      <div className="products-container">
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          </div>
        ))}
      </div>
      <Link to="/login" state={{ returnTo: "/products" }}>
        Login
      </Link>
    </div>
  );
}

export default Products;
