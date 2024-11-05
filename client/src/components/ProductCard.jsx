import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <img src={`${product.image}`} alt={product.image}></img>
      <p>Price: ${product.price}</p>
      <p>Category: {product.categoryId?.name || "N/A"}</p>
      <div className="productCardBottomContainer">
        <Link to={`/products/${product._id}`}>See more</Link>
        <p>Add to Cart</p>
      </div>
    </div>
  );
};

export default ProductCard;
