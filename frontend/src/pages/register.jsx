import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialForm = {
  username: '',
  email: '',
  password: '',
  role: 'user',
};

function RegisterPage() {
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

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status !== 201) {
        throw new Error(response.data.message || 'Registration failed');
      }
      setMessage(response.data.message || 'User registered successfully');
      setFormData(initialForm);
      console.log('Registration successful:', response.data);
      navigate('/login'); 

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
          <h2>Create account</h2>
          <p>Start your shopping journey with exclusive deals.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder=""
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder=""
              value={formData.email}
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

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;
