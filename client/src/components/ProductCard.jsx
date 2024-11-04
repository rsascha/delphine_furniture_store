import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Category: {product.categoryId?.name || "N/A"}</p>
      <Link to={`/products/${product._id}`}>See more</Link>
    </div>
  );
};

export default ProductCard;
