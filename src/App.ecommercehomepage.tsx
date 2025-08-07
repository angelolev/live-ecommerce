import React from 'react';
import { EcommerceHomepage } from './components/EcommerceHomepage/EcommerceHomepage';
import { Header } from './components/Header/Header';
import { HeroBanner } from './components/HeroBanner/HeroBanner';
import { CountdownTimer } from './components/CountdownTimer/CountdownTimer';
import { CategoryCard } from './components/CategoryCard/CategoryCard';
import { ProductCard } from './components/ProductCard/ProductCard';
import { Button } from './components/Button/Button';
import { SearchBar } from './components/SearchBar/SearchBar';
// Remove unused mock data import

// Main preview component
export const EcommerceHomepagePreview: React.FC = () => {
  return <EcommerceHomepage />;
};

// Export all components for preview
export {
  EcommerceHomepage,
  Header,
  HeroBanner,
  CountdownTimer,
  CategoryCard,
  ProductCard,
  Button,
  SearchBar
};

export default EcommerceHomepagePreview;