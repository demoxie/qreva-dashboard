import { apiClient } from './client';

export const settingsApi = {
  // ── Agency Categories ──────────────────────────────────────────────
  listAgencyCategories: async (params = {}) => {
    const { data } = await apiClient.get('/admin/settings/agency-categories', { params });
    return data;
  },

  getAgencyCategory: async (agencyCategoryId) => {
    const { data } = await apiClient.get(`/admin/settings/agency-categories/${agencyCategoryId}`);
    return data;
  },

  createAgencyCategory: async (categoryData) => {
    const { data } = await apiClient.post('/admin/settings/agency-categories', categoryData);
    return data;
  },

  updateAgencyCategory: async ({ agencyCategoryId, ...categoryData }) => {
    const { data } = await apiClient.patch(`/admin/settings/agency-categories/${agencyCategoryId}`, categoryData);
    return data;
  },

  // ── KYC Tiers ──────────────────────────────────────────────────────
  listTiers: async (params = {}) => {
    const { data } = await apiClient.get('/admin/settings/tiers', { params });
    return data;
  },

  getTier: async (tierId) => {
    const { data } = await apiClient.get(`/admin/settings/tiers/${tierId}`);
    return data;
  },

  createTier: async (tierData) => {
    const { data } = await apiClient.post('/admin/settings/tiers', tierData);
    return data;
  },

  updateTier: async ({ tierId, ...tierData }) => {
    const { data } = await apiClient.patch(`/admin/settings/tiers/${tierId}`, tierData);
    return data;
  },

  deleteTier: async (tierId) => {
    const { data } = await apiClient.delete(`/admin/settings/tiers/${tierId}`);
    return data;
  },

  // ── RBAC Roles & Permissions ───────────────────────────────────────
  listRoles: async (params = {}) => {
    const { data } = await apiClient.get('/admin/settings/rbac/roles', { params });
    return data;
  },

  getRole: async (rolePermissionId) => {
    const { data } = await apiClient.get(`/admin/settings/rbac/roles/${rolePermissionId}`);
    return data;
  },

  createRole: async (roleData) => {
    const { data } = await apiClient.post('/admin/settings/rbac/roles', roleData);
    return data;
  },

  updateRole: async ({ rolePermissionId, ...roleData }) => {
    const { data } = await apiClient.patch(`/admin/settings/rbac/roles/${rolePermissionId}`, roleData);
    return data;
  },

  // ── Commission Rules ───────────────────────────────────────────────
  listCommissions: async (params = {}) => {
    const { data } = await apiClient.get('/admin/settings/commissions', { params });
    return data;
  },

  getCommission: async (commissionRuleId) => {
    const { data } = await apiClient.get(`/admin/settings/commissions/${commissionRuleId}`);
    return data;
  },

  createCommission: async (commissionData) => {
    const { data } = await apiClient.post('/admin/settings/commissions', commissionData);
    return data;
  },

  updateCommission: async ({ commissionRuleId, ...commissionData }) => {
    const { data } = await apiClient.patch(`/admin/settings/commissions/${commissionRuleId}`, commissionData);
    return data;
  },

  duplicateCommission: async (commissionRuleId) => {
    const { data } = await apiClient.post(`/admin/settings/commissions/${commissionRuleId}/duplicate`);
    return data;
  },

  // ── Activity Logs ──────────────────────────────────────────────────
  listActivityLogs: async (params = {}) => {
    const { data } = await apiClient.get('/admin/settings/access-controls', { params });
    return data;
  },
};
