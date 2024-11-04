
import { useEffect,useState } from 'react';
import{useParams} from 'react-router-dom';
function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
  
    useEffect(() => {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch(console.error);
    }, [id]);
  
    if (!product) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="product-details">
        <img src="/path/to/product-image.jpg" alt={product.name} />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Material: {product.material}</p>
        <p>Size: {product.size}</p>
        <p>Color: {product.color}</p>
        <p>Available: {product.available}</p>
        <button>Add to Cart</button>
      </div>
    );
  }
  
  export default ProductDetails;
  