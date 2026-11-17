import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialForm = {
  productName: '',
  description: '',
  price: '',
  category: '',
  stoke: '0',
};

function CreateProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!image) {
      setError('Please select a product image');
      setLoading(false);
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });
    payload.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/api/product', payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message || 'Product created successfully');
      setFormData(initialForm);
      setImage(null);
      e.target.reset();

      setTimeout(() => {
        navigate('/');
      }, 600);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '620px' }}>
        <div className="auth-header">
          <span className="auth-badge">ShopEase</span>
          <h2>Create Product</h2>
          <p>Add a new product to your shop.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              name="price"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category ID</label>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="Enter category id"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stoke">Stock</label>
            <input
              id="stoke"
              type="number"
              name="stoke"
              min="0"
              value={formData.stoke}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating Product...' : 'Create Product'}
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default CreateProductPage;
