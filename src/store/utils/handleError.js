import { toast } from "sonner";

/**
 * Handles API errors and displays appropriate toast messages
 * @param {Error} error - The error object from the API call
 * @param {string} customMessage - Optional custom error message
 * @returns {string} - The error message that was displayed
 */
export const handleError = (error, customMessage) => {
  let errorMessage = customMessage || 'An error occurred';

  if (error.response) {
    // Server responded with error status
    const { data, status } = error.response;

    // Handle specific error formats
    if (data?.message) {
      errorMessage = data.message;
    } else if (data?.error) {
      errorMessage = data.error;
    } else if (typeof data === 'string') {
      errorMessage = data;
    } else if (data?.errors && Array.isArray(data.errors)) {
      // Handle validation errors array
      errorMessage = data.errors.map(e => e.message || e).join(', ');
    }

    // Handle specific status codes
    switch (status) {
      case 400:
        errorMessage = data?.message || 'Invalid request. Please check your input.';
        break;
      case 401:
        errorMessage = 'Invalid credentials';
        break;
      case 403:
        errorMessage = 'You do not have permission to perform this action.';
        break;
      case 404:
        errorMessage = data?.message || 'Resource not found.';
        break;
      case 409:
        errorMessage = data?.message || 'A conflict occurred.';
        break;
      case 422:
        errorMessage = data?.message || 'Validation failed.';
        break;
      case 429:
        errorMessage = 'Too many requests. Please try again later.';
        break;
      case 500:
        errorMessage = 'Server error. Please try again later.';
        break;
      case 503:
        errorMessage = 'Service unavailable. Please try again later.';
        break;
      default:
        errorMessage = data?.message || errorMessage;
    }
  } else if (error.request) {
    // Request was made but no response
    errorMessage = 'No response from server. Please check your connection.';
  } else {
    // Error in request setup
    errorMessage = error.message || errorMessage;
  }

  toast.error(errorMessage);
  return errorMessage;
};

/**
 * Extracts error message without showing toast (for custom handling)
 * @param {Error} error - The error object
 * @returns {string} - The error message
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'An error occurred';
};