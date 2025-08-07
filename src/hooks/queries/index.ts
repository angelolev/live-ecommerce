// Export all query hooks from a single file for clean imports
export { useCategories } from './useCategories';
export { 
  useProducts, 
  useProductsByCategory, 
  useProduct, 
  useFeaturedProducts 
} from './useProducts';
export { 
  useCreateProduct, 
  useUpdateProduct, 
  useDeleteProduct 
} from './useProductMutations';
export { 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory 
} from './useCategoryMutations';