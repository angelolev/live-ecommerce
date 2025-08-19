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
    search: (searchTerm: string) => [...queryKeys.products.all, 'search', searchTerm] as const,
  },

  // Hero Banners
  heroBanners: {
    all: ['heroBanners'] as const,
    lists: () => [...queryKeys.heroBanners.all, 'list'] as const,
    list: () => [...queryKeys.heroBanners.lists()] as const,
    details: () => [...queryKeys.heroBanners.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.heroBanners.details(), id] as const,
    active: () => [...queryKeys.heroBanners.all, 'active'] as const,
  },

  // Countdown Timers
  countdownTimers: {
    all: ['countdownTimers'] as const,
    lists: () => [...queryKeys.countdownTimers.all, 'list'] as const,
    list: () => [...queryKeys.countdownTimers.lists()] as const,
    details: () => [...queryKeys.countdownTimers.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.countdownTimers.details(), id] as const,
    byId: (id: string) => [...queryKeys.countdownTimers.details(), id] as const,
    active: () => [...queryKeys.countdownTimers.all, 'active'] as const,
  },

  // Website Navigation
  websiteNav: {
    all: ['websiteNav'] as const,
    lists: () => [...queryKeys.websiteNav.all, 'list'] as const,
    list: () => [...queryKeys.websiteNav.lists()] as const,
    details: () => [...queryKeys.websiteNav.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.websiteNav.details(), id] as const,
    enabled: () => [...queryKeys.websiteNav.all, 'enabled'] as const,
  },
} as const;

// Helper functions for cache invalidation
export const invalidateCategories = () => queryKeys.categories.all;
export const invalidateProducts = () => queryKeys.products.all;
export const invalidateProductsByCategory = (categoryName: string) => 
  [...queryKeys.products.lists(), { category: categoryName }] as const;
export const invalidateHeroBanners = () => queryKeys.heroBanners.all;
export const invalidateCountdownTimers = () => queryKeys.countdownTimers.all;
export const invalidateWebsiteNav = () => queryKeys.websiteNav.all;