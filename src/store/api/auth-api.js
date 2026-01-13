import { apiClient } from './client';

export const authApi = {
  login: async (credentials) => {
    const { data } = await apiClient.post('/admin/auth/login', credentials);
    return data;
  },

  changePassword: async (passwordData) => {
    const { data } = await apiClient.patch('/admin/auth/change-password', passwordData);
    return data;
  },
};