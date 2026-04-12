import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/store/api/auth-api';
import { handleError } from '../../utils/handleError';
import { handleSuccess, successMessages } from '../../utils/handleSuccess';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await authApi.login(credentials);
      if (response?.statusCode === 401 || response?.message === 'Invalid credentials') {
        const error = new Error('Invalid credentials');
        error.response = { data: response, status: 401 };
        throw error;
      }
      return response;
    },
    onSuccess: (response) => {

      // Extract data from response structure
      const { token, admin, mustChangePassword } = response?.data;

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

export const useSendOtp = () => {
  return useMutation({
    mutationFn: authApi.sendOtp,
    onSuccess: () => {
      handleSuccess('OTP sent to your email.');
    },
    onError: (error) => {
      handleError(error, 'Failed to send OTP.');
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: authApi.verifyOtp,
    onError: (error) => {
      handleError(error, 'Invalid OTP. Please try again.');
    },
  });
};

export const useChangePin = () => {
  return useMutation({
    mutationFn: authApi.changePin,
    onSuccess: () => {
      handleSuccess('PIN changed successfully.');
    },
    onError: (error) => {
      handleError(error, 'Failed to change PIN.');
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,
    onError: () => {
      // Logout locally even if API call fails
    },
  });
};