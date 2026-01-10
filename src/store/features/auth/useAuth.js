import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/store/api/auth-api';
import { handleError } from '../../utils/handleError';
import { handleSuccess, successMessages } from '../../utils/handleSuccess';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      // Extract data from response structure
      const { token, admin, mustChangePassword } = response.data;
      
      // Store token and user data
      localStorage.setItem('adminToken', token);
      localStorage.setItem('userRole', admin.role);
      localStorage.setItem('userId', admin._id);
      localStorage.setItem('userEmail', admin.emailAddress);
      localStorage.setItem('userName', `${admin.firstName} ${admin.lastName}`);
      localStorage.setItem('mustChangePassword', mustChangePassword);
      
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      handleSuccess(response.message || successMessages.LOGIN_SUCCESS);
    },
    onError: (error) => {
      handleError(error, 'Failed to login. Please check your credentials.');
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      handleSuccess(successMessages.PASSWORD_CHANGED);
      localStorage.setItem('mustChangePassword', 'false');
    },
    onError: (error) => {
      handleError(error, 'Failed to change password.');
    },
  });
};