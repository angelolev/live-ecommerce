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