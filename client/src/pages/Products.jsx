import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProductCard from "../components/ProductCard.jsx";
import "../components/ProductCard.css";

function Products() {
  const [products, setProducts] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const accessToken = await getAccessTokenSilently().catch((error) => {
          console.warn("Could not get access token:", error);
          return null;
        });

        const response = await fetch("http://localhost:3000/products", {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts(); // Trigger the fetch on component load
  }, [getAccessTokenSilently]); // Include getAccessTokenSilently in the dependency array

  return (
    <div>
      <h1>Welcome to the Products Page</h1>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
