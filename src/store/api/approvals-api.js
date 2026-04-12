import { apiClient } from './client';

export const approvalsApi = {
  // ── Account Approvals ──────────────────────────────────────────────
  listAccountApprovals: async (params = {}) => {
    const { data } = await apiClient.get('/admin/approvals/accounts', { params });
    return data;
  },

  getAccountApprovalDetails: async (userId) => {
    const { data } = await apiClient.get(`/admin/approvals/accounts/${userId}`);
    return data;
  },

  approveAccount: async (userId) => {
    const { data } = await apiClient.post(`/admin/approvals/accounts/${userId}/approve`);
    return data;
  },

  declineAccount: async ({ userId, reason }) => {
    const { data } = await apiClient.post(`/admin/approvals/accounts/${userId}/decline`, { reason });
    return data;
  },

  // ── Disputed Transactions ──────────────────────────────────────────
  listDisputes: async (params = {}) => {
    const { data } = await apiClient.get('/admin/approvals/disputes', { params });
    return data;
  },

  getDisputeDetails: async (id) => {
    const { data } = await apiClient.get(`/admin/approvals/disputes/${id}`);
    return data;
  },

  refundDispute: async (id) => {
    const { data } = await apiClient.post(`/admin/approvals/disputes/${id}/refund`);
    return data;
  },

  declineDispute: async ({ id, reason }) => {
    const { data } = await apiClient.post(`/admin/approvals/disputes/${id}/decline`, { reason });
    return data;
  },
};
