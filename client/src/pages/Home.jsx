import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
// import ProductCard from "../components/ProductCard.jsx";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const [products, setProducts] = useState([]);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBestSelling() {
      try {
        let accessToken = "";
        if (isAuthenticated) {
          accessToken = await getAccessTokenSilently();
        }
        const response = await fetch(
          "http://localhost:3000/products/bestSelling",
          {
            headers: {
              Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
            },
          }
        );

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchBestSelling();
  }, [isAuthenticated, getAccessTokenSilently]);

  async function addToCart(productId) {
    try {
      const amount = 1;
      let accessToken = "";
      if (isAuthenticated) {
        accessToken = await getAccessTokenSilently();
      } else {
        alert(
          "Bitte loggen Sie sich ein, um Produkte in den Warenkorb zu legen."
        );
        navigate("/login", { state: { returnTo: "/products" } });
        return;
      }
      const response = await fetch("http://localhost:3000/cart/add", {
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
      console.log(data);
      alert("Product added to cart");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <>
      <div className="home-content">
        <div className="home-header">
          <h1>Make Your Interior More Minimalistic & Modern</h1>
          <p>
            Turn your room with panto into a lot more minimalist and modern with
            ease and speed
          </p>
        </div>

        <section className="best-selling">
          <h2>Best Selling Products</h2>
          <div className="product-cards">
            {products.map((product) => (
              <div className="card" key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <h4>{product.categoryId?.name || "N/A"}</h4>
                <h3>{product.name}</h3>
                {/* <div> */}
                <p>
                  <span>${product.price}</span>

                  <button onClick={() => addToCart(product._id)}>+</button>
                  {/* </div> */}
                </p>
              </div>
            ))}
          </div>

          <Link to="/products" className="view-all">
            View All →
          </Link>
        </section>

        <section className="subscription">
          <h2>Subscribe to get the latest news about us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
          <div className="qr-code">
            <img src="../../public/qr-code.png" alt="QR Code" />
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
