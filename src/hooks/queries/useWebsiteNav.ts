import { useQuery } from '@tanstack/react-query';
import { websiteNavService } from '../../services/websiteNavService';
import { queryKeys } from '../../lib/queryKeys';

export const useWebsiteNav = () => {
  return useQuery({
    queryKey: queryKeys.websiteNav.list(),
    queryFn: () => websiteNavService.getAllWebsiteNavItems(),
    staleTime: 5 * 60 * 1000, // Website navigation changes less frequently, cache for 5 minutes
  });
};

export const useEnabledWebsiteNav = () => {
  return useQuery({
    queryKey: queryKeys.websiteNav.enabled(),
    queryFn: () => websiteNavService.getEnabledWebsiteNavItems(),
    staleTime: 5 * 60 * 1000, // Cache enabled navigation items for 5 minutes
  });
};