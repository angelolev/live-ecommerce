import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';
import { queryKeys, invalidateCategories } from '../../lib/queryKeys';
import type { CategoryFormData } from '../../types/product';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryData: CategoryFormData) => 
      categoryService.createCategory(categoryData),
    onSuccess: () => {
      // Invalidate all category queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: invalidateCategories() });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, categoryData }: { id: string; categoryData: CategoryFormData }) =>
      categoryService.updateCategory(id, categoryData),
    onSuccess: (_, { id }) => {
      // Invalidate all category queries and the specific category
      queryClient.invalidateQueries({ queryKey: invalidateCategories() });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.detail(id) });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: (_, id) => {
      // Remove the specific category from cache and invalidate lists
      queryClient.removeQueries({ queryKey: queryKeys.categories.detail(id) });
      queryClient.invalidateQueries({ queryKey: invalidateCategories() });
    },
  });
};