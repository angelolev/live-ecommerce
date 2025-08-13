import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import { queryKeys } from '../../lib/queryKeys';

export const useSearchProducts = (searchTerm: string) => {
  return useQuery({
    queryKey: queryKeys.products.search(searchTerm),
    queryFn: () => productService.searchProducts(searchTerm),
    enabled: searchTerm.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};