import { apiClient } from './client';

export const usersApi = {
  getUsers: async (params = {}) => {
    const { data } = await apiClient.get('/admin/dashboard/users/all', { params });
    return data;
  },

  getUserMetrics: async (params = {}) => {
    const { data } = await apiClient.get('/admin/dashboard/users', { params });
    return data;
  },
};
