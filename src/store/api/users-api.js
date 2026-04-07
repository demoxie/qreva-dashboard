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

  getUserById: async (userId) => {
    const { data } = await apiClient.get(`/admin/dashboard/users/${userId}`);
    return data;
  },

  suspendUser: async (userId) => {
    const { data } = await apiClient.patch(`/admin/dashboard/users/${userId}/suspend`);
    return data;
  },

  activateUser: async (userId) => {
    const { data } = await apiClient.patch(`/admin/dashboard/users/${userId}/activate`);
    return data;
  },
};
