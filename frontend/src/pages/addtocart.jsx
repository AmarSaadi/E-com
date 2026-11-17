import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

function AddToCartPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="empty-state">
          <h3>No product selected</h3>
          <p>Choose a product from the store to see details.</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Back to shopping</button>
        </div>
      </div>
    );
  }

  const priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.price || 0));

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <div className="product-media">
          <img src={product.image} alt={product.productName} />
        </div>

        <div className="product-detail-info">
          <h2 className="pd-title">{product.productName}</h2>
          <p className="pd-desc">{product.description}</p>

          <div className="pd-meta">
            <div className="pd-price">{priceFormatted}</div>
            <div className="pd-stock">Stock: <strong>{product.stoke ?? product.stock ?? 0}</strong></div>
          </div>

          <div className="pd-actions">
            <div className="qty">
              <label>Quantity</label>
              <div className="qty-controls">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                <input value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))} />
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary" onClick={() => { addToCart(product, qty); navigate('/cart'); }}>Add to cart</button>
              <button className="btn btn-secondary" onClick={() => navigate(-1)}>Continue shopping</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCartPage;
