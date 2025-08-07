import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import { queryKeys, invalidateProducts } from '../../lib/queryKeys';
import type { ProductFormData } from '../../types/product';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: ProductFormData) => 
      productService.createProduct(productData),
    onSuccess: () => {
      // Invalidate all product queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: invalidateProducts() });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, productData }: { id: string; productData: ProductFormData }) =>
      productService.updateProduct(id, productData),
    onSuccess: (_, { id }) => {
      // Invalidate all product queries and the specific product
      queryClient.invalidateQueries({ queryKey: invalidateProducts() });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(id) });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: (_, id) => {
      // Remove the specific product from cache and invalidate lists
      queryClient.removeQueries({ queryKey: queryKeys.products.detail(id) });
      queryClient.invalidateQueries({ queryKey: invalidateProducts() });
    },
  });
};