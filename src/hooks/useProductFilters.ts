import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import type { Product, ProductFilters, SortOption } from '../types/product';

export const useProductFilters = (initialFilters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {});

  const fetchFilteredProducts = useCallback(async (currentFilters: ProductFilters) => {
    try {
      setLoading(true);
      setError(null);

      let fetchedProducts: Product[];

      if (currentFilters.category) {
        // Use the optimized category-specific query
        fetchedProducts = await productService.getProductsWithFilters({
          category: currentFilters.category,
          minPrice: currentFilters.minPrice,
          maxPrice: currentFilters.maxPrice,
          sortBy: currentFilters.sortBy
        });
      } else {
        // Get all products with filters
        fetchedProducts = await productService.getProductsWithFilters({
          minPrice: currentFilters.minPrice,
          maxPrice: currentFilters.maxPrice,
          sortBy: currentFilters.sortBy
        });
      }

      // Apply search filter if present
      if (currentFilters.searchTerm) {
        const searchTerm = currentFilters.searchTerm.toLowerCase();
        fetchedProducts = fetchedProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
      }

      setProducts(fetchedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilteredProducts(filters);
  }, [filters, fetchFilteredProducts]);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  const updateSort = useCallback((sortBy: SortOption) => {
    setFilters(prev => ({ ...prev, sortBy }));
  }, []);

  const updatePriceRange = useCallback((minPrice?: number, maxPrice?: number) => {
    setFilters(prev => ({ ...prev, minPrice, maxPrice }));
  }, []);

  const updateSearch = useCallback((searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  }, []);

  const refetch = useCallback(() => {
    fetchFilteredProducts(filters);
  }, [filters, fetchFilteredProducts]);

  return {
    products,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    updateSort,
    updatePriceRange,
    updateSearch,
    refetch
  };
};