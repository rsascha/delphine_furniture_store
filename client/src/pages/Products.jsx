import { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import ProductCard from "../components/ProductCard.jsx";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  // const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function fetchProducts() {
      try {
        // const accessToken = await getAccessTokenSilently().catch((error) => {
        //   console.warn("Could not get access token:", error);
        //   return null;
        // });

        const response = await fetch("http://localhost:3000/products", {
          // headers: {
          //   Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          // },
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts(); // Trigger the fetch on component load
  }, []);
  // }, [getAccessTokenSilently]); // Include getAccessTokenSilently in the dependency array
  // Funktion zum Hinzufügen eines Produkts in den Warenkorb

  async function addToCart(productId) {
    try {
      const sessionId = "123";
      const amount = 1;
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: productId,
          sessionId,
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
    <div>
      <h1>Welcome to the Products Page</h1>
      <div className="products-container">
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard key={product._id} product={product} />
            <button onClick={() => addToCart(product._id)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
