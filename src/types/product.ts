export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryFormData {
  name: string;
  imageUrl: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortOption;
  searchTerm?: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | 'oldest';

export interface FilterOptions {
  categories: Category[];
  priceRange: {
    min: number;
    max: number;
  };
  sortOptions: {
    value: SortOption;
    label: string;
  }[];
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HeroBannerFormData {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}

export interface FavoritesItem {
  id: string;
  product: Product;
  addedAt: Date;
}

export interface Favorites {
  items: FavoritesItem[];
  itemCount: number;
}

export interface FavoritesContextType {
  favorites: Favorites;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}