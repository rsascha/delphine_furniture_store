import "./ProductCard.css";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCart.jsx";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={`${product.image}`} alt={product.image}></img>
      <p className="productCategory">{product.categoryId?.name || "N/A"}</p>
      <h2 className="productName">{product.name}</h2>

      <div className="productCardBottomContainer">
        <p className="productPrice">${product.price}</p>

        <AddToCartButton productId={product._id} />
      </div>
      <Link to={`/products/${product._id}`}>See more</Link>
    </div>
  );
};

export default ProductCard;
