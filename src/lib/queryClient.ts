import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Data stays in cache for 30 minutes when unused
      gcTime: 30 * 60 * 1000, // 30 minutes (previously cacheTime)
      // Retry failed requests 3 times
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.status && error.status < 500) return false;
        return failureCount < 3;
      },
      // Refetch on window focus for fresh data
      refetchOnWindowFocus: true,
      // Don't refetch on reconnect by default (Firebase handles this)
      refetchOnReconnect: 'always',
    },
    mutations: {
      // Retry mutations only once on server errors
      retry: (failureCount, error: any) => {
        // Only retry on 500+ server errors, not client errors
        if (error?.status && error.status < 500) return false;
        return failureCount < 1;
      },
    },
  },
});