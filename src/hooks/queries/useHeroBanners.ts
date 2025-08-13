import { useQuery } from '@tanstack/react-query';
import { heroBannerService } from '../../services/heroBannerService';
import { queryKeys } from '../../lib/queryKeys';

export function useHeroBanners() {
  return useQuery({
    queryKey: queryKeys.heroBanners.list(),
    queryFn: heroBannerService.getAll,
  });
}

export function useActiveHeroBanner() {
  return useQuery({
    queryKey: queryKeys.heroBanners.active(),
    queryFn: heroBannerService.getActive,
  });
}

export function useHeroBanner(id: string) {
  return useQuery({
    queryKey: queryKeys.heroBanners.detail(id),
    queryFn: () => heroBannerService.getById(id),
    enabled: !!id,
  });
}