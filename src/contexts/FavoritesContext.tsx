import React, { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Favorites, FavoritesItem, FavoritesContextType, Product } from '../types/product';
import { v4 as uuidv4 } from 'uuid';

const initialFavorites: Favorites = {
  items: [],
  itemCount: 0,
};

type FavoritesAction =
  | { type: 'ADD_TO_FAVORITES'; payload: { product: Product } }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: { productId: string } }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'LOAD_FAVORITES'; payload: Favorites };

const favoritesReducer = (state: Favorites, action: FavoritesAction): Favorites => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES': {
      const { product } = action.payload;
      
      // Check if product is already in favorites
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        return state; // Already in favorites, no change
      }

      const newItem: FavoritesItem = {
        id: uuidv4(),
        product,
        addedAt: new Date(),
      };

      const newItems = [...state.items, newItem];
      return {
        items: newItems,
        itemCount: newItems.length,
      };
    }

    case 'REMOVE_FROM_FAVORITES': {
      const newItems = state.items.filter(item => item.product.id !== action.payload.productId);
      return {
        items: newItems,
        itemCount: newItems.length,
      };
    }

    case 'CLEAR_FAVORITES':
      return initialFavorites;

    case 'LOAD_FAVORITES':
      return action.payload;

    default:
      return state;
  }
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, initialFavorites);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('user-favorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        // Convert date strings back to Date objects
        const itemsWithDates = parsedFavorites.items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
          product: {
            ...item.product,
            createdAt: new Date(item.product.createdAt),
            updatedAt: new Date(item.product.updatedAt),
          },
        }));
        dispatch({ 
          type: 'LOAD_FAVORITES', 
          payload: { 
            ...parsedFavorites, 
            items: itemsWithDates 
          } 
        });
      } catch (error) {
        console.error('Failed to load favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (favorites.items.length > 0) {
      localStorage.setItem('user-favorites', JSON.stringify(favorites));
    } else {
      localStorage.removeItem('user-favorites');
    }
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    dispatch({
      type: 'ADD_TO_FAVORITES',
      payload: { product },
    });
  };

  const removeFromFavorites = (productId: string) => {
    dispatch({
      type: 'REMOVE_FROM_FAVORITES',
      payload: { productId },
    });
  };

  const isFavorite = (productId: string): boolean => {
    return favorites.items.some(item => item.product.id === productId);
  };

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  };

  const contextValue: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};