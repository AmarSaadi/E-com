import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import CreateProductPage from './pages/createProduct';
import AddToCartPage from './pages/addtocart';
import CartPage from './pages/cart';
import { CartProvider } from './contexts/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
            <Route path="/addtocart" element={<AddToCartPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
