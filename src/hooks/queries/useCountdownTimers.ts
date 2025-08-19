import { useQuery } from '@tanstack/react-query';
import { countdownTimerService } from '../../services/countdownTimerService';
import { queryKeys } from '../../lib/queryKeys';

export const useCountdownTimers = () => {
  return useQuery({
    queryKey: queryKeys.countdownTimers.list(),
    queryFn: countdownTimerService.getAll,
  });
};

export const useActiveCountdownTimer = () => {
  return useQuery({
    queryKey: queryKeys.countdownTimers.active(),
    queryFn: countdownTimerService.getActive,
    refetchInterval: 1000, // Refetch every second to update countdown
    staleTime: 0, // Always consider data stale to ensure fresh countdown
  });
};

export const useCountdownTimer = (id: string) => {
  return useQuery({
    queryKey: queryKeys.countdownTimers.detail(id),
    queryFn: () => countdownTimerService.getById(id),
    enabled: !!id,
  });
};