import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Category: {product.categoryId?.name || "N/A"}</p>
    </div>
  );
};

export default ProductCard;
