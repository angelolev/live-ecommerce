import { useMutation, useQueryClient } from '@tanstack/react-query';
import { countdownTimerService } from '../../services/countdownTimerService';
import { queryKeys } from '../../lib/queryKeys';
import type { CountdownTimerFormData } from '../../types/product';

export const useCreateCountdownTimer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CountdownTimerFormData) => countdownTimerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.countdownTimers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.countdownTimers.active() });
    },
  });
};

export const useUpdateCountdownTimer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CountdownTimerFormData }) =>
      countdownTimerService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.countdownTimers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.countdownTimers.active() });
    },
  });
};

export const useDeleteCountdownTimer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => countdownTimerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.countdownTimers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.countdownTimers.active() });
    },
  });
};