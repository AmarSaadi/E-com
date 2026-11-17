import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function useCart() {
  return useContext(CartContext);
}

const STORAGE_KEY = 'shopease_cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  function addToCart(product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((p) => (p._id && product._id && p._id === product._id) || (p.id && product.id && p.id === product.id));
      if (existing) {
        return prev.map((p) => ((p._id && existing._id && p._id === existing._id) || (p.id && existing.id && p.id === existing.id) ? { ...p, quantity: (p.quantity || 1) + quantity } : p));
      }
      return [...prev, { ...(product._id ? { _id: product._id } : {}), ...product, quantity }];
    });
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((p) => (p._id || p.id) !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const count = items.reduce((s, it) => s + (it.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, count }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
