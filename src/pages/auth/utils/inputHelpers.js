export const getInputBorderColor = (error, touched, value) => {
  if (error && touched) return 'border-red-500 focus:ring-red-500';
  if (!error && touched && value) return 'border-green-500 focus:ring-green-500';
  return 'border-gray-300 focus:ring-orange-500';
};

/**
 * Get floating label classes
 */
export const getFloatingLabelClasses = (value, baseClasses = '') => {
  const defaultClasses = `
    absolute left-4 transition-all duration-200 pointer-events-none
    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
    peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-600
  `;
  
  const stateClasses = value 
    ? 'top-2 text-xs text-gray-600' 
    : 'top-4 text-base text-gray-400';
  
  return `${defaultClasses} ${stateClasses} ${baseClasses}`.trim();
};

/**
 * Handle keyboard submit
 */
export const createKeyPressHandler = (callback, condition = true) => {
  return (e) => {
    if (e.key === 'Enter' && condition) {
      e.preventDefault();
      callback();
    }
  };
};

/**
 * Validate single field
 */
export const validateField = async (schema, fieldName, value) => {
  try {
    await schema.validateAt(fieldName, { [fieldName]: value });
    return null;
  } catch (error) {
    return error.message;
  }
};