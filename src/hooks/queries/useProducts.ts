import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import { queryKeys } from '../../lib/queryKeys';
import type { ProductFilters } from '../../types/product';

// Hook for getting all products with optional filters
export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: queryKeys.products.list(filters || {}),
    queryFn: () => {
      if (!filters || Object.keys(filters).length === 0) {
        return productService.getAllProducts();
      }
      return productService.getProductsWithFilters(filters);
    },
    staleTime: 3 * 60 * 1000, // Products change more frequently, cache for 3 minutes
  });
};

// Hook for getting products by specific category
export const useProductsByCategory = (categoryName: string, filters?: Omit<ProductFilters, 'category'>) => {
  return useQuery({
    queryKey: queryKeys.products.byCategory(categoryName, filters),
    queryFn: () => productService.getProductsWithFilters({
      category: categoryName,
      ...filters
    }),
    enabled: !!categoryName, // Only run when we have a category name
    staleTime: 3 * 60 * 1000,
  });
};

// Hook for getting a single product
export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId, // Only run when we have a product ID
    staleTime: 5 * 60 * 1000, // Individual products cache longer
  });
};

// Hook for getting featured products (for homepage)
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.featured(),
    queryFn: () => productService.getAllProducts(),
    staleTime: 5 * 60 * 1000,
    select: (data) => data.slice(0, 8), // Take first 8 products as featured
  });
};