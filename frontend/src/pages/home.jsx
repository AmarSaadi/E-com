import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddToCartButton from '../components/AddToCartButton';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(price || 0));

  return (
    <div className="home-page">
      <header className="topbar">
        <div className="brand">ShopEase</div>
        <nav className="nav-links">
          <a href="#new">New Arrivals</a>
          <a href="#featured">Featured</a>
          <a href="#offers">Offers</a>
        </nav>
        <div className="nav-actions">
          <Link to="/login" className="btn btn-light">Login</Link>
          <Link to="/register" className="btn btn-dark">Register</Link>
          <Link to="/create-product" className="btn btn-primary">Create Product</Link>
        </div>
        
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="badge">New Season Collection</span>
          <h1>Upgrade your everyday essentials</h1>
          <p>
            Discover premium gadgets, style essentials, and everyday favorites at prices you’ll love.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-one">
            <span>Trending</span>
            <strong>50% OFF</strong>
          </div>
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80"
            alt="Shopping scene"
          />
        </div>
      </section>

      <section id="featured" className="products-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <a href="#offers">View all</a>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.length === 0 ? (
              <p>No products available yet.</p>
            ) : (
              products.map((product) => (
                <article className="product-card" key={product._id || product.id}>
                  <img src={product.image} alt={product.productName} />
                  <div className="product-info">
                    <h3>{product.productName}</h3>
                    <div className="product-meta">
                      <span>{formatPrice(product.price)}</span>
            {/* <Link to="/register" className="btn btn-primary">Add to cart</Link> */}

                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </section>

      <section id="offers" className="promo-strip">
        <div>
          <p>Weekend Sale</p>
          <h3>Save up to 70% on selected items</h3>
        </div>
        <Link to="/register" className="btn btn-primary">Shop now</Link>
      </section>
    </div>
  );
}

export default HomePage;
