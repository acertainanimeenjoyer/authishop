import React, { createContext, useReducer, useEffect } from 'react';

// Initial state (empty cart)
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

// Reducer for cart logic
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const exists = state.cart.find(item => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case 'REMOVE':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };

    case 'CLEAR':
      return { ...state, cart: [] };

    default:
      return state;
  }
}

// Create Context
export const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
