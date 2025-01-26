import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const cartItemCount = Object.values(cartItems).reduce(
    (total, count) => total + count,
    0
  );

  return (
    <StoreContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartItemCount }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
