import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function AddToCartButton({ product, qty = 1 }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  return (
    <button className="btn btn-primary" onClick={handleAdd}>
      Add to cart
    </button>
  );
}
