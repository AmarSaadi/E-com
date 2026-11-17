
import { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

const initialForm = {
  usernameOrEmail: '',
  password: '',
};

function Login() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const payload = {
      usernameOrEmail: formData.usernameOrEmail,
      password: formData.password,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setMessage(response.data.message || 'Login successful');
      navigate('/');
      setFormData(initialForm);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-badge">ShopEase</span>
          <h2>Welcome back</h2>
          <p>Sign in to continue shopping and track your orders.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
              id="usernameOrEmail"
              type="text"
              name="usernameOrEmail"
              placeholder="Enter username or email"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;