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
      localStorage.setItem('userPermissions', JSON.stringify(admin.permissions || []));

      queryClient.invalidateQueries({ queryKey: ['admin'] });
      handleSuccess(response.message || successMessages.LOGIN_SUCCESS);
    },
    onError: (error) => {
      handleError(error, 'Failed to login. Please check your credentials.');
    },
  });
};

const throwIfErrorStatus = (response, fallbackMessage) => {
  const statusCode = response?.statusCode;
  if (statusCode && statusCode >= 400) {
    const error = new Error(response?.message || fallbackMessage);
    error.response = { data: response, status: statusCode };
    throw error;
  }
  return response;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await authApi.forgotPassword(payload);
      return throwIfErrorStatus(response, 'Failed to request password reset.');
    },
    onSuccess: (response) => {
      handleSuccess(response.message || 'OTP sent to your email.');
    },
    onError: (error) => {
      handleError(error, 'Failed to request password reset.');
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await authApi.resetPassword(payload);
      return throwIfErrorStatus(response, 'Failed to reset password.');
    },
    onSuccess: (response) => {
      handleSuccess(response.message || 'Password reset successfully.');
    },
    onError: (error) => {
      handleError(error, 'Failed to reset password.');
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
