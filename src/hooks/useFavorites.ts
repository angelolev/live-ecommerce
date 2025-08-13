import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import type { FavoritesContextType } from '../types/product';

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  
  return context;
};