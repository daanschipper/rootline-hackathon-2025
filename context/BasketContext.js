import React, { createContext, useContext, useState } from 'react';

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);

  const addToBasket = (item, type) => {
    setBasket(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, type, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setBasket(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromBasket = (itemId) => {
    setBasket(prev => prev.filter(item => item.id !== itemId));
  };

  const getBasketCount = () => {
    return basket.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotal = () => {
    return basket.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[€,]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <BasketContext.Provider value={{
      basket,
      addToBasket,
      updateQuantity,
      removeFromBasket,
      getBasketCount,
      calculateTotal
    }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
} 