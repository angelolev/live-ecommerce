import { useMutation, useQueryClient } from '@tanstack/react-query';
import { websiteNavService } from '../../services/websiteNavService';
import { queryKeys, invalidateWebsiteNav } from '../../lib/queryKeys';
import type { WebsiteNavItemFormData } from '../../types/product';

export const useWebsiteNavMutations = () => {
  const queryClient = useQueryClient();

  const createWebsiteNavItem = useMutation({
    mutationFn: (itemData: WebsiteNavItemFormData) => 
      websiteNavService.createWebsiteNavItem(itemData),
    onSuccess: () => {
      // Invalidate all website navigation queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: invalidateWebsiteNav() });
    },
  });

  const updateWebsiteNavItem = useMutation({
    mutationFn: ({ id, data }: { id: string; data: WebsiteNavItemFormData }) =>
      websiteNavService.updateWebsiteNavItem(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate all website navigation queries and the specific item
      queryClient.invalidateQueries({ queryKey: invalidateWebsiteNav() });
      queryClient.invalidateQueries({ queryKey: queryKeys.websiteNav.detail(id) });
    },
  });

  const deleteWebsiteNavItem = useMutation({
    mutationFn: (id: string) => websiteNavService.deleteWebsiteNavItem(id),
    onSuccess: (_, id) => {
      // Remove the specific website navigation item from cache and invalidate lists
      queryClient.removeQueries({ queryKey: queryKeys.websiteNav.detail(id) });
      queryClient.invalidateQueries({ queryKey: invalidateWebsiteNav() });
    },
  });

  return {
    createWebsiteNavItem,
    updateWebsiteNavItem,
    deleteWebsiteNavItem,
  };
};