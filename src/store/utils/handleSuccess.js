import { toast } from "sonner";

/**
 * Handles successful operations and displays toast messages
 * @param {string} message - Success message to display
 * @param {Object} options - Optional toast options
 * @returns {string} - The success message that was displayed
 */
export const handleSuccess = (message, options = {}) => {
  const successMessage = message || 'Operation completed successfully';
  
  toast.success(successMessage, {
    duration: options.duration || 3000,
    ...options,
  });
  
  return successMessage;
};

/**
 * Pre-defined success messages for common operations
 */
export const successMessages = {
  // Auth
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  
  // Admin Users
  ADMIN_INVITED: 'Admin invitation sent successfully',
  ADMIN_STATUS_UPDATED: 'Admin status updated successfully',
  ADMIN_DELETED: 'Admin removed successfully',
  
  // Contracts
  CONTRACT_CREATED: 'Contract created successfully',
  CONTRACT_UPDATED: 'Contract updated successfully',
  CONTRACT_DELETED: 'Contract deleted successfully',
  CONTRACTS_UPDATED: 'All contracts updated successfully',
  
  // Generic
  SAVED: 'Changes saved successfully',
  CREATED: 'Created successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
};