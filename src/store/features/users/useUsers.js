import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../../api/users-api';
import { handleError } from '../../utils/handleError';
import { handleSuccess } from '../../utils/handleSuccess';

export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => usersApi.getUsers(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserMetrics = (params = {}) => {
  return useQuery({
    queryKey: ['user-metrics', params],
    queryFn: () => usersApi.getUserMetrics(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserById = (userId, userType = 'users') => {
  return useQuery({
    queryKey: ['user', userType, userId],
    queryFn: () => usersApi.getUserById(userId, userType),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserTransactions = (userId, userType = 'users', params = {}) => {
  return useQuery({
    queryKey: ['user-transactions', userType, userId, params],
    queryFn: () => usersApi.getUserTransactions(userId, userType, params),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useSuspendUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) => usersApi.suspendUser(userId),
    onSuccess: () => {
      handleSuccess('User suspended successfully.');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      handleError(error, 'Failed to suspend user.');
    },
  });
};

export const useActivateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) => usersApi.activateUser(userId),
    onSuccess: () => {
      handleSuccess('User activated successfully.');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      handleError(error, 'Failed to activate user.');
    },
  });
};
