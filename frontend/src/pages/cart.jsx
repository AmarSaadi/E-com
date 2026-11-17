import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((s, it) => s + (Number(it.price || 0) * (it.quantity || 1)), 0);

  if (!items || items.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h3>Your cart is empty</h3>
        <p>Browse items and add them to your cart.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go shopping</button>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ maxWidth: 1000, margin: '32px auto', padding: 20 }}>
      <h2>Cart</h2>
      <div className="cart-list" style={{ display: 'grid', gap: 12 }}>
        {items.map((it) => (
          <div key={(it._id || it.id)} className="cart-item" style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'white', padding: 12, borderRadius: 8 }}>
            <img src={it.image} alt={it.productName} style={{ width: 96, height: 80, objectFit: 'cover', borderRadius: 6 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{it.productName}</div>
              <div style={{ color: '#64748b' }}>{it.description}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800 }}>${(Number(it.price || 0) * (it.quantity || 1)).toFixed(2)}</div>
              <div style={{ color: '#64748b' }}>Qty: {it.quantity || 1}</div>
            </div>
            <div>
              <button className="btn btn-secondary" onClick={() => removeFromCart(it._id || it.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button className="btn btn-secondary" onClick={() => clearCart()}>Clear cart</button>
        </div>
        <div style={{ fontWeight: 800 }}>
          Total: ${total.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
