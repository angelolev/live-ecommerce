import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';
import { queryKeys } from '../../lib/queryKeys';

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () => categoryService.getAllCategories(),
    staleTime: 10 * 60 * 1000, // Categories change less frequently, cache for 10 minutes
  });
};