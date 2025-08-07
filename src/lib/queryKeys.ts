import type { ProductFilters } from '../types/product';

// Query key factories for consistent caching
export const queryKeys = {
  // Categories
  categories: {
    all: ['categories'] as const,
    lists: () => [...queryKeys.categories.all, 'list'] as const,
    list: () => [...queryKeys.categories.lists()] as const,
    details: () => [...queryKeys.categories.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.categories.details(), id] as const,
  },

  // Products
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: ProductFilters) => [...queryKeys.products.lists(), filters] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.products.details(), id] as const,
    // Specific query types
    byCategory: (categoryName: string, filters?: Omit<ProductFilters, 'category'>) => 
      [...queryKeys.products.lists(), { category: categoryName, ...filters }] as const,
    featured: () => [...queryKeys.products.all, 'featured'] as const,
  },
} as const;

// Helper functions for cache invalidation
export const invalidateCategories = () => queryKeys.categories.all;
export const invalidateProducts = () => queryKeys.products.all;
export const invalidateProductsByCategory = (categoryName: string) => 
  [...queryKeys.products.lists(), { category: categoryName }] as const;