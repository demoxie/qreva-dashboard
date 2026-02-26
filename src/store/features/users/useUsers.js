import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../api/users-api';
import { handleError } from '../../utils/handleError';

export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => usersApi.getUsers(params),
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      handleError(error, 'Failed to fetch users.');
    },
  });
};

export const useUserMetrics = (params = {}) => {
  return useQuery({
    queryKey: ['user-metrics', params],
    queryFn: () => usersApi.getUserMetrics(params),
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      handleError(error, 'Failed to fetch user metrics.');
    },
  });
};
