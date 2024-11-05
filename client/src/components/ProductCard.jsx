import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <img src={`${product.image}`} alt={product.image}></img>
      <p>Price: ${product.price}</p>
      <p>Category: {product.categoryId?.name || "N/A"}</p>
      <div className="productCardBottomContainer">
        <Link to={`/products/${product._id}`}>See more</Link>
        <button onClick={() => addToCart(product._id)}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
