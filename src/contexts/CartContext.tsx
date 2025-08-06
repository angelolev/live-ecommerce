import React, { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Cart, CartItem, CartContextType } from '../types/cart';
import type { Product } from '../types/product';
import { v4 as uuidv4 } from 'uuid';

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  shipping: 0,
  total: 0,
  itemCount: 0,
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; size?: string; color?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

const calculateCartTotals = (items: CartItem[]): { subtotal: number; shipping: number; total: number; itemCount: number } => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 10) : 0; // Free shipping over $100
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { subtotal, shipping, total, itemCount };
};

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, size, color } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && 
                 item.size === size && 
                 item.color === color
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: uuidv4(),
          product,
          quantity,
          size,
          color,
        };
        newItems = [...state.items, newItem];
      }

      const totals = calculateCartTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload.itemId);
      const totals = calculateCartTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== itemId);
        const totals = calculateCartTotals(newItems);
        return { items: newItems, ...totals };
      }

      const newItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const totals = calculateCartTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'CLEAR_CART':
      return initialCart;

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.items.length > 0 || cart.subtotal > 0) {
      localStorage.setItem('shopping-cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('shopping-cart');
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity, size, color },
    });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { itemId },
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { itemId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};