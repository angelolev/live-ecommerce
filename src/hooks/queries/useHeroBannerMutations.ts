import { useMutation, useQueryClient } from '@tanstack/react-query';
import { heroBannerService } from '../../services/heroBannerService';
import { queryKeys } from '../../lib/queryKeys';
import type { HeroBannerFormData } from '../../types/product';

export function useCreateHeroBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: heroBannerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.heroBanners.all });
    },
  });
}

export function useUpdateHeroBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: HeroBannerFormData }) =>
      heroBannerService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.heroBanners.all });
    },
  });
}

export function useDeleteHeroBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: heroBannerService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.heroBanners.all });
    },
  });
}