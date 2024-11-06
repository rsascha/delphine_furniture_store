import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProductCard from "../components/ProductCard.jsx";
import "./Products.css";
import { Link } from "react-router-dom";
import FilterBar from "../components/Filterbar.jsx";

function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    material: "",
  });
  const [availableColors, setAvailableColors] = useState([]);
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    async function fetchProducts() {
      try {
        let accessToken = "";
        if (isAuthenticated) {
          accessToken = await getAccessTokenSilently();
        }
        console.log(filters);
        // Filter-Parameter in der URL erzeugen
        const query = new URLSearchParams(filters).toString(); // Dies erstellt die Filter-Query
        const url = query
          ? `http://localhost:3000/products?${query}`
          : `http://localhost:3000/products`; // Wenn keine Filter vorhanden, nur /products

        const response = await fetch(url, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        });

        // Überprüfen, ob die Antwort erfolgreich ist
        if (!response.ok) {
          throw new Error("Failed to fetch products: " + response.statusText);
        }

        const data = await response.json();

        // Überprüfen, ob die Antwort ein Array ist
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected an array but got:", data);
          setProducts([]); // Leere Liste setzen, wenn die Antwort nicht wie erwartet ist
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    async function fetchColors() {
      try {
        const response = await fetch("http://localhost:3000/products/colors");
        const colors = await response.json();
        setAvailableColors(colors);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    }

    async function fetchMaterials() {
      try {
        const response = await fetch(
          "http://localhost:3000/products/materials"
        ); // API für Materialien
        const materials = await response.json();
        setAvailableMaterials(materials); // Setze die verfügbaren Materialien
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    }

    fetchMaterials();
    fetchProducts();
    fetchColors();
  }, [isAuthenticated, getAccessTokenSilently, filters]); // Füge filters als Abhängigkeit hinzu

  async function addToCart(productId) {
    try {
      const amount = 1;
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: productId,
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
      console.error("Error adding product to cart:", error);
    }
  }

  return (
    <div>
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        availableColors={availableColors}
        availableMaterials={availableMaterials}
      />
      <h1>All Furniture</h1>
      {/* <Notification show={true} message={"You need to login"}></Notification> */}
      <div className="products-container">
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} addToCart={addToCart} />
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
