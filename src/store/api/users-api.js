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

  getUserById: async (userId, userType = 'users') => {
    const { data } = await apiClient.get(`/admin/dashboard/${userType}/${userId}`);
    return data;
  },

  getUserTransactions: async (userId, userType = 'users', params = {}) => {
    const { data } = await apiClient.get(`/admin/dashboard/${userType}/${userId}/transactions`, { params });
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

  inviteAggregator: async (payload) => {
    const { data } = await apiClient.post('/admin/aggregators/invite', payload);
    return data;
  },

  resolveAggregatorInvitee: async ({ email, inviteType }) => {
    const { data } = await apiClient.get('/admin/aggregators/invitee', {
      params: { email, inviteType },
    });
    return data;
  },

  getAggregatorReferralLink: async () => {
    const { data } = await apiClient.get('/admin/aggregators/referral-link');
    return data;
  },
};
